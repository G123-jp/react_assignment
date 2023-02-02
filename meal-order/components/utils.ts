import { Dish, MealType, SelectedDishes } from "@/common/types";
import { countTotalNumberOfServings } from "@/common/utils";

export enum STEPS {
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

export const initialState: StateType = {
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
    
export const reducer = (state: StateType, action: ActionType): StateType => {
    const newState = { ...state };
    if (action.type === "go_to_prev_step") {
        if (state.currentStep > STEPS.Step1) {
        newState.currentStep = state.currentStep - 1;
        }
    } else if (action.type === "go_to_next_step") {
        if (state.currentStep <= STEPS.Review) {
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
