export default function Step1Form() {
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
}
