import { ReactNode, useState } from "react";
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

const NUMBER_OF_STEPS = 4;

export default function PreOrderMealForm() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const CurrentForm = () => {
    switch (currentStep) {
      case 0:
        return <Step1Form />;
      case 1:
        return <Step2Form />;
      case 2:
        return <Step3Form />;
      case 3:
        return <OrderSummary />;
      default:
        return <Step1Form />;
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
