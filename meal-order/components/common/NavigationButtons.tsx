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
