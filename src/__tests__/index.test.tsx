import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, test, beforeAll, afterEach, afterAll } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "../pages/index";

// Good starting point: https://testing-library.com/docs/react-testing-library/example-intro

/*
❌
✅

Write a test that asserts that loading is displayed when the response is not correct ✅
Write a test that asserts that a single item is in the list when the component is loaded ✅
Write a test that adds a new item to the list ✅
Write a test that removes an item from the list ✅

*/


const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/api/getTodos', (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(ctx.status(200),ctx.json([{id:"something",title:"something1"}]))
    }),
    
  )
  
  // establish API mocking before all tests
  beforeAll(() => server.listen())
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  afterEach(() => server.resetHandlers())
  // clean up once the tests are done
  afterAll(() => server.close())
  

  test('display loading when response is not correct', async () => {
    server.use(
        rest.get('/api/getTodos', (req, res, ctx) => {
        
            return res(ctx.status(200), ctx.json(false))
          }),
    )
    render(<Home/>)

    await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      });
  })

  test('asserts that a single item is in the list when the component is loaded', async () => {
    server.use(
        rest.get('/api/getTodos', (req, res, ctx) => {
            return res(ctx.status(200), ctx.json([{id:'Test1',title:'Test1Title'}]))
        }),

    )
    render(<Home/>)
    await waitFor(() => {
        expect(screen.getByText('Test1Title')).toBeInTheDocument();
      });
  })

  test('adds a new item to the list', async () => {
    server.use(
        rest.post("/api/addTodo", async (req, res, ctx) => {
            const newTodo = { id: 3, title: req.body.title};
            return res(ctx.json(newTodo));
          }),
    )
    render(<Home/>)
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "new item test 1" } });
    fireEvent.submit(input);
    
    await waitFor(() => {
        expect(screen.getByText("new item test 1")).toBeInTheDocument();
      });
  })

  test('removes an item from the list',async () => {
    server.use(
        rest.delete("/api/removeTodo", (req, res, ctx) => {
            return res(ctx.status(200));
          })
    )
    render(<Home/>)
    const removeButton = await screen.findByText("something1");
    fireEvent.click(removeButton);
    await waitFor(() => {
        expect(screen.queryByText("something1")).not.toBeInTheDocument();
    })
    
  })