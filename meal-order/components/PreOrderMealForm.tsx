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

const FormProgress = ({ currentStep }: { currentStep: STEPS }) => {
  return (
    <div className="flex flex-row justify-center mt-4">
      <FormProgressItem isHighlighted={currentStep === STEPS.Step1}>
        Step 1
      </FormProgressItem>
      <span className="py-2 px-1">{">"}</span>
      <FormProgressItem isHighlighted={currentStep === STEPS.Step2}>
        Step 2
      </FormProgressItem>
      <span className="py-2 px-1">{">"}</span>
      <FormProgressItem isHighlighted={currentStep === STEPS.Step3}>
        Step 3
      </FormProgressItem>
      <span className="py-2 px-1">{">"}</span>
      <FormProgressItem isHighlighted={currentStep === STEPS.Review}>
        Review
      </FormProgressItem>
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
