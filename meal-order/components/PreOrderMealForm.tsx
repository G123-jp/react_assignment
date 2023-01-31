import { DishList } from "@/pages/api/dishes";
import { RestaurantList } from "@/pages/api/restaurants";
import { Dish, MealType, SelectedDishes } from "@/shared/types";
import { ReactNode, useEffect, useReducer, useState } from "react";
import OrderSummary from "./steps/OrderSummary";
import Step1Form from "./steps/Step1Form";
import Step2Form from "./steps/Step2Form";
import Step3Form from "./steps/Step3Form";

const FormProgressItem = ({
  isHighlighted,
  children,
}: {
  isHighlighted: boolean;
  children: ReactNode;
}) => {
  if (isHighlighted) {
    return (
      <span className="mx-1 bg-slate-500 text-white font-bold p-2">
        {children}
      </span>
    );
  } else {
    return (
      <span className="mx-1 bg-slate-200 text-slate-500 p-2">{children}</span>
    );
  }
};

const FormProgress = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex flex-row justify-center mt-4">
      <FormProgressItem isHighlighted={currentStep === 0}>
        Step 1
      </FormProgressItem>
      <span className="py-2 px-1">{">"}</span>
      <FormProgressItem isHighlighted={currentStep === 1}>
        Step 2
      </FormProgressItem>
      <span className="py-2 px-1">{">"}</span>
      <FormProgressItem isHighlighted={currentStep === 2}>
        Step 3
      </FormProgressItem>
      <span className="py-2 px-1">{">"}</span>
      <FormProgressItem isHighlighted={currentStep === 3}>
        Review
      </FormProgressItem>
    </div>
  );
};

const NavigationButtons = ({
  onNext,
  onPrev,
  hidePrev = false,
  showSubmit = false,
  prevText = "Previous",
  nextText = "Next",
}: {
  onNext: () => void;
  onPrev: () => void;
  hidePrev?: boolean;
  showSubmit?: boolean;
  prevText?: string;
  nextText?: string;
}) => {
  return (
    <div className="flex flex-row justify-between mt-4">
      <button
        onClick={onPrev}
        className={`bg-blue-400 text-white p-2 rounded-xl font-bold ${
          hidePrev ? "invisible" : ""
        }`}
      >
        {prevText}
      </button>
      <button
        onClick={onNext}
        className={"bg-blue-400 text-white p-2 rounded-xl font-bold"}
      >
        {nextText}
      </button>
    </div>
  );
};

const NUMBER_OF_STEPS = 4;

interface StateType {
  selectedMealType: MealType;
  numOfPeople: number;
  selectedRestaurant: string;
  selectedDishes: SelectedDishes; // dish id mapping to Dish Serving
}

const initialState: StateType = {
  selectedMealType: "breakfast",
  numOfPeople: 1,
  selectedRestaurant: "",
  selectedDishes: {},
};

type ActionType =
  | { type: "select_meal_type"; payload: { mealType: MealType } }
  | { type: "select_num_people"; payload: { numOfPeople: number } }
  | { type: "select_restaurant"; payload: { restaurant: string } }
  | {
      type: "update_dish_order";
      payload: { dish: Dish; numberOfServing: number };
    };

const reducer = (state: StateType, action: ActionType): StateType => {
  if (action.type === "select_meal_type") {
    return {
      ...state,
      selectedMealType: action.payload.mealType,
      selectedRestaurant: "", // reset restaurant selection
      selectedDishes: {}, // reset dish selection
    };
  } else if (action.type === "select_num_people") {
    return {
      ...state,
      numOfPeople: action.payload.numOfPeople,
    };
  } else if (action.type === "select_restaurant") {
    return {
      ...state,
      selectedRestaurant: action.payload.restaurant,
      selectedDishes: {}, // reset dish selection
    };
  } else if (action.type === "update_dish_order") {
    const {
      payload: { dish, numberOfServing },
    } = action;

    const newSelectedDishes = { ...state.selectedDishes };
    if (numberOfServing <= 0) {
      delete newSelectedDishes[`${action.payload.dish.id}`];
    } else {
      newSelectedDishes[`${action.payload.dish.id}`] = {
        dish,
        numberOfServing,
      };
    }
    return {
      ...state,
      selectedDishes: newSelectedDishes,
    };
  }
  throw Error("unknown action");
};

const useRestaurants = (mealType: MealType) => {
  const [data, setData] = useState<RestaurantList | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/restaurants?mealType=${mealType}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [mealType]);

  return {
    restaurants: data ? data.restaurants : [],
    isLoading,
  };
};

const useDishes = (mealType: MealType, restaurant: string) => {
  const [data, setData] = useState<DishList | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/dishes?mealType=${mealType}&restaurant=${restaurant}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [mealType, restaurant]);

  return {
    dishes: data ? data.dishes : [],
    isLoading,
  };
};

export default function PreOrderMealForm() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedMealType, numOfPeople, selectedRestaurant, selectedDishes } =
    state;
  const { restaurants } = useRestaurants(selectedMealType);
  const { dishes } = useDishes(selectedMealType, selectedRestaurant);

  const CurrentForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1Form
            selectedMealType={selectedMealType}
            onMealTypeSelected={(mealType) =>
              dispatch({ type: "select_meal_type", payload: { mealType } })
            }
            numOfPeople={numOfPeople}
            onNumOfPeopleChanged={(numOfPeople) => {
              dispatch({ type: "select_num_people", payload: { numOfPeople } });
            }}
          />
        );
      case 1:
        return (
          <Step2Form
            onRestaurantSelected={(restaurant) => {
              dispatch({ type: "select_restaurant", payload: { restaurant } });
            }}
            selectedRestaurant={selectedRestaurant}
            restaurants={restaurants}
          />
        );
      case 2:
        return (
          <Step3Form
            availableDishes={dishes}
            selectedDishes={selectedDishes}
            onUpdateDish={(dish, numberOfServing) => {
              dispatch({
                type: "update_dish_order",
                payload: { dish, numberOfServing },
              });
            }}
          />
        );
      case 3:
      default:
        return <OrderSummary />;
    }
  };

  const goToNextStep = () => {
    if (currentStep < NUMBER_OF_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <h1 className="text-2xl">Pre-order Your Meal</h1>
      <FormProgress currentStep={currentStep} />
      <CurrentForm />
      <NavigationButtons
        onNext={goToNextStep}
        onPrev={goToPrevStep}
        hidePrev={currentStep === 0}
        nextText={currentStep === NUMBER_OF_STEPS - 1 ? "Submit" : undefined}
      />
    </>
  );
}
