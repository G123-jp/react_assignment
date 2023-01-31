export default function Step3Form() {
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
}
