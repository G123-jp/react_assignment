import { ReactNode, useState } from "react";

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
      <FormProgressItem isHighlighted={currentStep === 1}>
        Step 2
      </FormProgressItem>
      <FormProgressItem isHighlighted={currentStep === 2}>
        Step 3
      </FormProgressItem>
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

const Step1Form = () => {
  return (
    <>
      <h2 className="text-lg mt-4">Select a meal:</h2>
      <div className="flex flex-row justify-center">
        <button className="bg-blue-400 text-white mx-1 p-2 text-lg font-bold rounded-xl">
          Breakfast
        </button>
        <button className="mx-1 p-2 text-lg font-bold">Lunch</button>
        <button className="mx-1 p-2 text-lg font-bold">Dinner</button>
      </div>
      <h2 className="text-lg mt-4">Number of people:</h2>
      <div>
        <input
          className="border border-solid border-blue-400 rounded text-center  "
          type="number"
          min="1"
          max="10"
          placeholder="1"
        />
      </div>
    </>
  );
};

const Step2Form = () => {
  return (
    <div className="flex flex-row justify-center mt-4">
      <select>
        <option value="">Pick a restaurant</option>
      </select>
    </div>
  );
};

const Step3Form = () => {
  return (
    <ul className="flex flex-col justify-center mt-4">
      <li className="flex flex-row justify-between">
        <span>Menu 1</span>
        <input
          className="border border-solid border-blue-400 rounded text-center  "
          type="number"
          min="0"
          max="10"
          placeholder="0"
        />
      </li>
      <li className="flex flex-row justify-between">
        <span>Menu 2</span>
        <input
          className="border border-solid border-blue-400 rounded text-center  "
          type="number"
          min="0"
          max="10"
          placeholder="0"
        />
      </li>
    </ul>
  );
};

const OrderSummary = () => {
  return (
    <ul className="flex flex-col justify-center mt-4">
      <li className="flex flex-row justify-between">
        <span>Meal</span>
        <span>Breakfast</span>
      </li>
      <li className="flex flex-row justify-between">
        <span>Number of people</span>
        <span>3</span>
      </li>
      <li className="flex flex-row justify-between">
        <span>Restaurant</span>
        <span>McDonalds</span>
      </li>
      <li className="flex flex-row justify-between">
        <span>Dishes</span>
        <ul className="border border-solid border-blue-400 p-2 flex flex-col text-left">
          <li>Dish A - 1</li>
          <li>Dish B - 3</li>
          <li>Dish C - 2</li>
        </ul>
      </li>
    </ul>
  );
};

const getCurrentForm = (currentStep: number) => {
  switch (currentStep) {
    case 0:
      return Step1Form;
    case 1:
      return Step2Form;
    case 2:
      return Step3Form;
    case 3:
      return OrderSummary;
    default:
      return Step1Form;
  }
};

const NUMBER_OF_STEPS = 4;

export default function PreOrderMealForm() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const CurrentForm = getCurrentForm(currentStep);

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
