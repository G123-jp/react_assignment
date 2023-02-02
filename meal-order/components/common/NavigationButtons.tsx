import { Button } from "./Button";

export const NavigationButtons = ({
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
  const buttonEnabledStyles =
    "inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out";
  const buttonDisabledStyles =
    "inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out pointer-events-none opacity-60";
  return (
    <div className="flex flex-row justify-between mt-auto">
      <button
        onClick={onPrev}
        className={`${buttonEnabledStyles} ${hidePrev ? "invisible" : ""}`}
      >
        {prevText}
      </button>
      <button
        onClick={onNext}
        type={showSubmit ? "submit" : "button"}
        disabled={!nextEnabled}
        className={nextEnabled ? buttonEnabledStyles : buttonDisabledStyles}
      >
        {showSubmit ? "Submit" : nextText}
      </button>
    </div>
  );
};
