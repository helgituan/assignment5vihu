import { test, expect } from "@playwright/test";

// Add your e2e tests here

test.beforeEach(async ({page}) => {
  await page.goto('/');
});


/*
❌
✅
Write a Playwright test that validates the TODO list is empty ✅
Write a Playwright test that adds a new item to the list ✅
Write a Playwright test that adds a second item to the list ✅
Write a Playwright test that removes one item from the list ✅
*/

test("validates the TODO list is empty", async ({
  page,
}) => {

    await expect(page.getByTestId('todo-item')).toHaveCount(0);
});

const TODO_ITEMS = [
  'Test1',
  'Test2',
  'Test3'
];

test('Add a new item to the list', async ({ page }) => {

  // create a new todo locator
  const newTodo = page.getByPlaceholder('What are you going to TODO?');
  // Create 1st todo.
  await newTodo.fill(TODO_ITEMS[0]);
  await newTodo.press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.getByTestId('todo-item')).toHaveText([
    TODO_ITEMS[0]
  ]);

});

test('should allow me to add todo items', async ({ page }) => {

  // create a new todo locator
  const newTodo = page.getByPlaceholder('What are you going to TODO?');
  // Create 1st todo.
  await newTodo.fill(TODO_ITEMS[1]);
  await newTodo.press('Enter');

  // Make sure the list only has one todo item.
  await expect(page.getByTestId('todo-item')).toHaveText([
    TODO_ITEMS[0],
    TODO_ITEMS[1]
  ]);
});

test("removes one from the list", async ({
  page,
}) => {
  const todoItems = page.getByTestId('todo-item');
  await todoItems.nth(0).click();

  await expect(page.getByTestId('todo-item')).toHaveText([
    TODO_ITEMS[1]
  ])
  
});



test("should navigate to index page and have correct title", async ({
  page,
}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/"); // Byrjum á localhost:3000/ 
  // The page should contain an title element with the text "TODO 📃 App with Next.js!"
  await expect(page.getByTestId("title")).toHaveText(
    "TODO 📃 App with Next.js!"
  );
});
