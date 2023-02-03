# Meal Pre-order Web App

## App Demo

Feel free to visit this [link](https://meal-order-enreina.vercel.app) to see the app running on production.

## Running the app locally

Clone the repository, and move to this subdirectory

```
git clone git@github.com:enreina/react_assignment.git
cd react_assignment/meal-order
```

Install necessary packages:

```
npm install
```

And run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Why Next.js?

The requirement is to build an SPA (single-page app), so scaffolding with `create-react-app` or `vite` might be more straightforward. The reason Next.js is used here is to utilize Next.js' [API Routes](https://nextjs.org/docs/api-routes/introduction), and simulate communication with "backend" to fetch restaurants and dishes. Please check the [./pages/api](./pages/api) directory for the implementation.

## UI/UX

The following UI/UX changes are applied that differs from the requirement shown in the [wireframes](../wireframes/):

- Instead of a dropdown, the meal selection is presented as a horizontal group of buttons instead. This reduces the number of clicks that a user has to do to select a meal from 2 clicks to 1 clicks.
- Restaurant selection is also replaced with a group of buttons instead of a dropdown menu. In this case, they are stacked vertically.
- Dish selection is also adjusted a bit to immediately show all list of available dishes. User can then choose to add a dish to their order by using the '+' button on the left.
- To accomodate users on mobile devices, the number input for both number of people and number of servings are presented with '-' and '+' button. Additionally, when the number is 0 (i.e. when Step 3 is presented for the first time), the '-' button and the number itsef are not shown until '+' is clicked.

## Run Jest Tests

To run test, run the following command in this subdirectory (`meal-order` directory):

```
npm test
```

Tests have been written for the `reducer` function (unit test) and the `PreOrderMealForm` component (integration test). Please check in the [./components/\_\_tests\_\_/](./components/__tests__/) folder.
