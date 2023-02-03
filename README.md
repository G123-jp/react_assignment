# G123 React Assignment

| This assignment is aimed to help us know more about your `React` skills.

<!-- toc -->

- [G123 React Assignment](#g123-react-assignment)
  - [Requirements](#requirements)
    - [Must](#must)
    - [Optional](#optional)
  - [Setup](#setup)
  - [Description](#description)
    - [Step 1](#step-1)
    - [Step 2](#step-2)
    - [Step 3](#step-3)
    - [Step 4](#step-4)
    - [Notes](#notes)
  - [More Work](#more-work)

<!-- tocstop -->

## Requirements

### Must

- Use `React` ✅
- Use ES6 + TypeScript ✅

### Optional

- If needed use a CSS framework, preferred `tailwindcss` ⛔️
- Write Integration/Unit Tests ✅

## Setup

As this test is to evaluate basic `React` skills, we won't focusing on tooling setup (webpack, create-react-app, Vite, etc...).

So FEEL FREE to use any tools or custom setup to jump start your development.

Also FEEL FREE to use any 3rd-party libraries you prefer (we maybe ask for the reasons).

## Description

We want a multi-steps form that is aimed to help users pre-order food from restaurants, the restaurants and food item data is provided in the [data](./data) folder.

Wire frames are provided in the [wire frames](./wireframes) folder (just guide lines, feel free to alter the UI).

### Step 1

- Select Meal Category (breakfast/lunch/dinner) (required) ✅
- Need to input number of people (maximum 10) (required) ✅

### Step 2

- Select restaurants that provides meals based on selection in Step 1. (required) ✅

### Step 3

- Select dishes based on the meal and restaurant selected in Step 1 & Step 2. ✅

- First choose a dish ✅
- Then user can add number of servings of the dish (defaulted to 1) ✅
- Also user CAN'T select the same dish twice, rather add more servings. ✅

The total number of dishes (i.e Number of dishes \* respective serving) should be greater or equal to the number of people selected in Step 1 and a maximum of 10 is allowed.

### Step 4

User can review all his/her previous choices before final submit. ✅

### Notes

- User can't proceed to next step unless have valid inputs on the current step.
- if inputs are invalid, show validation errors.
- At any step user can go back and change their preference on any previous step.
- For the final submit, just print the results in console, as we don't have any backend at this moment.
- Feel free to alter/optimize with the UI/UX.

---

## More Work

- [x] Nice ui framework
- [x] A welcome modal and start tour
- [x] Good compatibility in support pc and mobile
- [x] Good project and code structure
- [x] Humanized user experience, system design
