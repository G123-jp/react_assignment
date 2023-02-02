import { ReactNode, useReducer } from "react";
import OrderSummary from "./steps/OrderSummary";
import Step1Form from "./steps/Step1Form";
import Step2Form from "./steps/Step2Form";
import Step3Form from "./steps/Step3Form";
import SubmitOrder from "./steps/SubmitOrder";
import { useRestaurants } from "./hooks/useRestaurants";
import { useDishes } from "./hooks/useDishes";
import { NavigationButtons } from "./common/NavigationButtons";
import { initialState, reducer, STEPS } from "./utils";
import { LoadingSpinner } from "./common/LoadingSpinner";

const FormProgressItem = ({
  isHighlighted,
  children,
}: {
  isHighlighted: boolean;
  children: ReactNode;
}) => {
  if (isHighlighted) {
    return (
      <span className="flex items-center justify-center text-white rounded-full h-12 w-12 bg-black text-lg font-bold">
        {children}
      </span>
    );
  } else {
    return (
      <span className="flex items-center justify-center text-black  rounded-full h-12 w-12 bg-white text-lg font-bold">
        {children}
      </span>
    );
  }
};

const FormProgress = ({ currentStep }: { currentStep: STEPS }) => {
  return (
    <div className="flex items-start mb-6 space-x-4 justify-center">
      <FormProgressItem isHighlighted={currentStep === STEPS.Step1}>
        1
      </FormProgressItem>
      <FormProgressItem isHighlighted={currentStep === STEPS.Step2}>
        2
      </FormProgressItem>
      <FormProgressItem isHighlighted={currentStep === STEPS.Step3}>
        3
      </FormProgressItem>
      <FormProgressItem isHighlighted={currentStep === STEPS.Review}>
        4
      </FormProgressItem>
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <div
      role="status"
      className="w-full flex flex-col items-center justify-center grow"
    >
      <LoadingSpinner />
    </div>
  );
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
  const { restaurants, isLoading: isRestaurantsLoading } =
    useRestaurants(selectedMealType);
  const { dishes, isLoading: isDishesLoading } = useDishes(
    selectedMealType,
    selectedRestaurant
  );

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
        return isRestaurantsLoading ? (
          <LoadingScreen />
        ) : (
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
        return isDishesLoading ? (
          <LoadingScreen />
        ) : (
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
        return (
          <OrderSummary
            selectedMealType={selectedMealType}
            numOfPeople={numOfPeople}
            selectedRestaurant={selectedRestaurant}
            selectedDishes={selectedDishes}
          />
        );
      case STEPS.SubmitOrder:
      default:
        return (
          <SubmitOrder
            selectedMealType={selectedMealType}
            numOfPeople={numOfPeople}
            selectedRestaurant={selectedRestaurant}
            selectedDishes={selectedDishes}
          />
        );
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
      {!isSubmitted && <FormProgress currentStep={currentStep} />}
      <div className="flex flex-col drop-shadow-xl rounded-xl bg-white min-h-[525px] p-4 pb-8 mt-4 w-full">
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
      </div>
    </>
  );
}
