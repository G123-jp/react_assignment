import { Dish } from '@/common/types';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import PreOrderMealForm from '../PreOrderMealForm';

const mockDish: Dish = {
  id: 1,
  name: 'Chicken Burger',
  restaurant: 'Mc Donalds',
  availableMeals: ['lunch', 'dinner'],
};

const anotherMockDish: Dish = {
  id: 2,
  name: 'Ham Burger',
  restaurant: 'Mc Donalds',
  availableMeals: ['lunch', 'dinner'],
};

const mockFetch = jest.fn((url: string) => {
  let result = {};
  if (url.match(/\/api\/dishes/)) {
    result = { dishes: [mockDish, anotherMockDish] };
  } else if (url.match(/\/api\/restaurants/)) {
    result = { restaurants: ['Mc Donalds', 'Olive Garden'] };
  }
  return Promise.resolve({
    json: () => Promise.resolve(result),
  });
}) as jest.Mock;

global.fetch = mockFetch;

describe('PreOrderMealForm', () => {
  describe('Step 1', () => {
    it('renders PreOrderMealForm component and next button should be disabled', () => {
      render(<PreOrderMealForm />);
      expect(
        screen.getByText(/Select Meal Type & Number of People/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Next/)).toBeDisabled();
      cleanup();
    });

    it('selecting a meal type should enable next button', async () => {
      render(<PreOrderMealForm />);
      expect(screen.getByText(/Next/)).toBeDisabled();
      fireEvent.click(screen.getByText(/Lunch/));
      await waitFor(() => expect(screen.getByText(/Next/)).toBeEnabled());
      cleanup();
    });
  });

  const goToStep2 = async () => {
    fireEvent.click(screen.getByText(/Lunch/));
    const nextButton = screen.getByText(/Next/);
    await waitFor(() => expect(nextButton).toBeEnabled());
    fireEvent.click(nextButton);
  };

  describe('Step 2', () => {
    it('clicking the next button should render Step 2 form', async () => {
      render(<PreOrderMealForm />);
      await goToStep2();
      expect(
        await screen.findByText(/Select a Restaurant/)
      ).toBeInTheDocument();
      cleanup();
    });

    it('selecting a restaurant should enable the next button', async () => {
      render(<PreOrderMealForm />);
      await goToStep2();
      await screen.findByText(/Select a Restaurant/); // wait for loading
      fireEvent.click(screen.getByText(/Mc Donalds/));
      await waitFor(() => expect(screen.getByText(/Next/)).toBeEnabled());
      cleanup();
    });
  });

  const goToStep3 = async () => {
    await goToStep2();
    await screen.findByText(/Select a Restaurant/); // wait for loading
    fireEvent.click(screen.getByText(/Mc Donalds/));
    const nextButton = screen.getByText(/Next/);
    await waitFor(() => expect(nextButton).toBeEnabled());
    fireEvent.click(nextButton);
  };

  describe('Step 3', () => {
    it('clicking the next button from Step 2 should render Step 3 form', async () => {
      render(<PreOrderMealForm />);
      await goToStep3();
      expect(await screen.findByText(/Select Dishes/)).toBeInTheDocument();
      cleanup();
    });

    it('adding a dish should enable the next button', async () => {
      render(<PreOrderMealForm />);
      await goToStep3();
      await screen.findByText(/Select Dishes/); // wait for loading
      expect(screen.getByText(/Next/)).toBeDisabled(); // next button should be disabled at first
      const incrementButton = screen.getAllByText('+')[0]; // get first increment button
      fireEvent.click(incrementButton);
      await waitFor(() => expect(screen.getByText(/Next/)).toBeEnabled());
      cleanup();
    });
  });

  const goToStep4 = async () => {
    await goToStep3();
    await screen.findByText(/Select Dishes/); // wait for loading
    const incrementButton = screen.getAllByText('+')[0]; // get first increment button
    fireEvent.click(incrementButton);
    const nextButton = screen.getByText(/Next/);
    await waitFor(() => expect(nextButton).toBeEnabled());
    fireEvent.click(nextButton);
  };

  describe('Step 4', () => {
    it('clicking the next button from Step 3 should render step 4 form', async () => {
      render(<PreOrderMealForm />);
      await goToStep4();
      expect(await screen.findByText(/Review Your Order/)).toBeInTheDocument();
      cleanup();
    });
    it('clicking submit should render Submitting screen', async () => {
      render(<PreOrderMealForm />);
      await goToStep4();
      const submitButton = await screen.findByText(/Submit/);
      fireEvent.click(submitButton);
      expect(await screen.findByText(/Sending your order/)).toBeInTheDocument();
      cleanup();
    });
  });
});
