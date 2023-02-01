import { DishList } from "@/pages/api/dishes";
import { RestaurantList } from "@/pages/api/restaurants";
import {
  Dish,
  MealType,
  SelectedDishes,
  StateType,
} from "@/components/shared/types";
import { ReactNode, useEffect, useReducer, useState } from "react";
import OrderSummary from "./steps/OrderSummary";
import Step1Form from "./steps/Step1Form";
import Step2Form from "./steps/Step2Form";
import Step3Form from "./steps/Step3Form";
import SubmitOrder from "./steps/SubmitOrder";

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
  nextEnabled = false,
}: {
  onNext: () => void;
  onPrev: () => void;
  hidePrev?: boolean;
  showSubmit?: boolean;
  prevText?: string;
  nextText?: string;
  nextEnabled?: boolean;
}) => {
  return (
    <div className="flex flex-row justify-between mt-auto">
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
        type={showSubmit ? "submit" : "button"}
        disabled={!nextEnabled}
        className={`${
          nextEnabled ? "bg-blue-400 text-white" : "bg-slate-400 text-gray-800"
        } p-2 rounded-xl font-bold`}
      >
        {showSubmit ? "Submit" : nextText}
      </button>
    </div>
  );
};

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

enum STEPS {
  Step1,
  Step2,
  Step3,
  Review,
  SubmitOrder,
}

type Validity = {
  isFormValid: boolean;
  errorMessage?: string;
};

const checkValidity = (state: StateType, currentStep: STEPS): Validity => {
  const { selectedMealType, numOfPeople, selectedRestaurant } = state;
  if (currentStep === STEPS.Step1) {
    if (!selectedMealType) {
      return {
        isFormValid: false,
        errorMessage: "A meal type has to be selected",
      };
    }
    if (numOfPeople < 1 || numOfPeople > 10) {
      return {
        isFormValid: false,
        errorMessage: "Number of people has to be between 1 to 10",
      };
    }
  } else if (currentStep === STEPS.Step2) {
    if (!selectedRestaurant) {
      return {
        isFormValid: false,
        errorMessage: "You have to select a restaurant",
      };
    }
  }

  return { isFormValid: true };
};

export default function PreOrderMealForm() {
  const [currentStep, setCurrentStep] = useState<STEPS>(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedMealType, numOfPeople, selectedRestaurant, selectedDishes } =
    state;
  const { restaurants } = useRestaurants(selectedMealType);
  const { dishes } = useDishes(selectedMealType, selectedRestaurant);
  const { isFormValid, errorMessage } = checkValidity(state, currentStep);

  const CurrentForm = () => {
    switch (currentStep) {
      case STEPS.Step1:
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
            errorMessage={errorMessage}
          />
        );
      case STEPS.Step2:
        return (
          <Step2Form
            onRestaurantSelected={(restaurant) => {
              dispatch({ type: "select_restaurant", payload: { restaurant } });
            }}
            selectedRestaurant={selectedRestaurant}
            restaurants={restaurants}
            errorMessage={errorMessage}
          />
        );
      case STEPS.Step3:
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
      case STEPS.Review:
        return <OrderSummary {...state} />;
      case STEPS.SubmitOrder:
        return <SubmitOrder {...state} />;
      default:
        return <OrderSummary {...state} />;
    }
  };

  const goToNextStep = () => {
    if (currentStep < STEPS.SubmitOrder) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > STEPS.Step1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isSubmitted = currentStep === STEPS.SubmitOrder;

  return (
    <>
      <h1 className="text-2xl">Pre-order Your Meal</h1>
      {!isSubmitted && <FormProgress currentStep={currentStep} />}
      <CurrentForm />
      {!isSubmitted && (
        <NavigationButtons
          onNext={goToNextStep}
          onPrev={goToPrevStep}
          hidePrev={currentStep === 0}
          nextText={currentStep === STEPS.Review ? "Submit" : undefined}
          nextEnabled={isFormValid}
        />
      )}
    </>
  );
}
