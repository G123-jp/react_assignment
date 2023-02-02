import { MealType, SelectedDishes } from '@/common/types';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../common/LoadingSpinner';

const Checkmark = () => {
  // From https://heroicons.com/
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-12 h-12"
      >
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clip-rule="evenodd"
        />
      </svg>

      <span className="mt-2 text-gray-700 font-bold">Submitted!</span>
    </>
  );
};

type SubmitOrderPropType = {
  selectedMealType: MealType | null;
  numOfPeople: number;
  selectedRestaurant: string;
  selectedDishes: SelectedDishes; // dish id mapping to Dish Serving
};

export default function SubmitOrder(props: SubmitOrderPropType) {
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // simulate submission to backend
    setTimeout(() => {
      setLoading(false);
      console.log(props);
    }, 3000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      role="status"
      className="w-full flex flex-col items-center justify-center grow"
    >
      {!isLoading && <Checkmark />}
      {isLoading && <LoadingSpinner loadingText="Sending your order..." />}
    </div>
  );
}
