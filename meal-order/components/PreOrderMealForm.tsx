import { DishList } from "@/pages/api/dishes";
import { RestaurantList } from "@/pages/api/restaurants";
import { Dish, MealType, SelectedDishes } from "@/components/shared/types";
import { ReactNode, useEffect, useReducer, useState } from "react";
import OrderSummary from "./steps/OrderSummary";
import Step1Form from "./steps/Step1Form";
import Step2Form from "./steps/Step2Form";
import Step3Form from "./steps/Step3Form";
import SubmitOrder from "./steps/SubmitOrder";
import { countTotalNumberOfServings } from "./shared/utils";

enum STEPS {
  Step1,
  Step2,
  Step3,
  Review,
  SubmitOrder,
}

type FormValidity = {
  isFormValid: boolean;
  errorMessage?: string;
};

export interface StateType {
  selectedMealType: MealType | null;
  numOfPeople: number;
  selectedRestaurant: string;
  selectedDishes: SelectedDishes; // dish id mapping to Dish Serving
  currentStep: STEPS;
  formValidity: FormValidity;
}

const initialState: StateType = {
  selectedMealType: null,
  numOfPeople: 1,
  selectedRestaurant: "",
  selectedDishes: {},
  currentStep: STEPS.Step1,
  formValidity: {
    isFormValid: false,
  },
};

type ActionType =
  | { type: "go_to_next_step" }
  | { type: "go_to_prev_step" }
  | { type: "select_meal_type"; payload: { mealType: MealType } }
  | { type: "select_num_people"; payload: { numOfPeople: number } }
  | { type: "select_restaurant"; payload: { restaurant: string } }
  | {
      type: "update_dish_order";
      payload: { dish: Dish; numberOfServing: number };
    };

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

const getValidityState = (
  state: StateType,
  withErrorMessage: boolean = true // when we want to show/hide error message for UX purpose (e.g. when changing step, we should hide the error message)
): FormValidity => {
  const {
    selectedMealType,
    numOfPeople,
    selectedRestaurant,
    selectedDishes,
    currentStep,
  } = state;
  let isFormValid = true;
  let errorMessage: string | undefined;
  if (currentStep === STEPS.Step1) {
    if (!selectedMealType) {
      isFormValid = false;
      if (withErrorMessage) {
        errorMessage = "A meal type has to be selected";
      }
    }
    if (numOfPeople < 1 || numOfPeople > 10) {
      isFormValid = false;
      if (withErrorMessage) {
        errorMessage = "Number of people has to be between 1 to 10";
      }
    }
  } else if (currentStep === STEPS.Step2) {
    if (!selectedRestaurant) {
      isFormValid = false;
      if (withErrorMessage) {
        errorMessage = "You have to select a restaurant";
      }
    }
  } else if (currentStep === STEPS.Step3) {
    if (countTotalNumberOfServings(selectedDishes) < numOfPeople) {
      isFormValid = false;
      if (withErrorMessage) {
        if (numOfPeople === 1) {
          errorMessage = "You need to order at least 1 serving";
        } else {
          errorMessage = `You need to order at least ${numOfPeople} of servings for ${numOfPeople} people.`;
        }
      }
    }
  }

  return { isFormValid, errorMessage };
};

const reducer = (state: StateType, action: ActionType): StateType => {
  const newState = { ...state };
  if (action.type === "go_to_prev_step") {
    if (state.currentStep > STEPS.Step1) {
      newState.currentStep = state.currentStep - 1;
    }
  } else if (action.type === "go_to_next_step") {
    if (state.currentStep <= STEPS.Step3) {
      newState.currentStep = state.currentStep + 1;
    }
  } else if (action.type === "select_meal_type") {
    newState.selectedMealType = action.payload.mealType;
    newState.selectedRestaurant = ""; // reset restaurant selection
    newState.selectedDishes = {}; // reset dish selection
  } else if (action.type === "select_num_people") {
    newState.numOfPeople = action.payload.numOfPeople;
  } else if (action.type === "select_restaurant") {
    newState.selectedRestaurant = action.payload.restaurant;
    newState.selectedDishes = {}; // reset dish selection
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

    newState.selectedDishes = newSelectedDishes;
  } else {
    throw Error("unknown action");
  }
  const withErrorMessage =
    action.type !== "go_to_next_step" && action.type !== "go_to_prev_step"; // hide error message when step has just changed
  newState.formValidity = getValidityState(newState, withErrorMessage);
  return newState;
};

const useRestaurants = (mealType: MealType | null) => {
  const [data, setData] = useState<RestaurantList | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/restaurants?mealType=${mealType || ""}`)
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

const useDishes = (mealType: MealType | null, restaurant: string) => {
  const [data, setData] = useState<DishList | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/dishes?mealType=${mealType || ""}&restaurant=${restaurant}`)
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    currentStep,
    selectedMealType,
    numOfPeople,
    selectedRestaurant,
    selectedDishes,
    formValidity: { isFormValid, errorMessage },
  } = state;
  const { restaurants } = useRestaurants(selectedMealType);
  const { dishes } = useDishes(selectedMealType, selectedRestaurant);

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
            errorMessage={errorMessage}
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
    dispatch({ type: "go_to_next_step" });
  };

  const goToPrevStep = () => {
    dispatch({ type: "go_to_prev_step" });
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
