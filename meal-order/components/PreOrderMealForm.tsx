const FormProgress = () => {
  return (
    <div className="flex flex-row justify-center mt-4">
      <span className="mx-1 bg-slate-500 text-white font-bold p-2">Step 1</span>
      <span className="mx-1 bg-slate-200 text-slate-500 p-2">Step 2</span>
      <span className="mx-1 bg-slate-200 text-slate-500 p-2">Step 3</span>
      <span className="mx-1 bg-slate-200 text-slate-500 p-2">Review</span>
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
      <div className="flex flex-row justify-between">
        <button className="bg-blue-400 text-white p-2 rounded-xl font-bold">
          Previous
        </button>
        <button className="bg-blue-400 text-white p-2 rounded-xl font-bold">
          Next
        </button>
      </div>
    </>
  );
};

export default function PreOrderMealForm() {
  return (
    <>
      <h1 className="text-2xl">Pre-order Your Meal</h1>
      <FormProgress />
      <Step1Form />
    </>
  );
}
