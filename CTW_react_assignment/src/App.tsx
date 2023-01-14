import { useState, useRef, FormEvent } from "react";
import photo from "./assets/food3.jpg";
import { v4 as uuidv4 } from "uuid";
// import AppContext from "./Components/AppContext";
import Start from "./Components/Forms/Start";
import StepOne from "./Components/Forms/StepOne";
import StepTwo from "./Components/Forms/StepTwo";
import StepThree from "./Components/Forms/StepThree";
import Review from "./Components/Forms/Review";
import { type Orders, type ReviewObject } from "./types/global";
import { useNavigateForm } from "./Components/useNavigateForm";
import ContainerForm from "./Components/FormElements/ContainerForm";
import ProgressBar from "./Components/ProgressBar";


// const INITIAL_DATA: ReviewObject = [
// orderId: ""

// ]
function App() {
  const [data, setData] = useState<ReviewObject[]>();


  const [orders, setOrders] = useState<Orders[]>([]);
  const mealType = useRef<string>("");
  const numberOfPeople = useRef<string>("");
  const restaurant = useRef<string>("");
  const dish = useRef<string>("");
  const numberOfServings = useRef<string>("");

  const progressBar = [
    { title: "start" },
    { title: "part 1" },
    { title: "part 2" },
    { title: "part 3" },
    { title: "review" },
  ];

  const progress = [
    <Start />,
    <StepOne   />,
    <StepTwo />,
    <StepThree  />,
    <Review />,
  ];

  const { steps, currentStepIndex, step, back, next, isFirstStep, isLastStep } =
    useNavigateForm(progress);

  console.log(currentStepIndex);
  console.log(step);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert ("Sucessfully ordered your meal!")
  }

  // function updateData(data: Partial<ReviewObject>) {
  //   setData((prevData) => {
  //     return { ...prevData, ...data };
  //   });
  // }
  return (
    <>
      {/* <AppContext.Provider
        value={{
          handleClickEvent: handleClickEvent,
          setOrders: setOrders,
          setPage: setPage,
          active: active,
          complete: complete,
          page: page,
          orders: orders,
          form: form,
          mealType: mealType,
          numberOfPeople: numberOfPeople,
          restaurant: restaurant,
          dish: dish,
          numberOfServings: numberOfServings,
        }}
      > */}

      <div className="absolute object-fit:cover">
        <img
          src={photo}
          alt="heroImage"
          className="h-screen w-screen object-cover"
        />
      </div>

      <ContainerForm onSubmit={onSubmit}>
        <ProgressBar progressBar={progressBar} />

        {step}

        <div className="grid grid-cols-2 gap-36 mt-10">
          {!isFirstStep ? (
            <button
              type="button"
              onClick={back}
              className="bg-mustard font-heading p-2 uppercase rounded-lg shadow-sm mt-5 hover:font-title"
            >
              <p>back</p>
            </button>
          ) : (
            <div></div>
          )}
          <button
            type="submit"
            className="bg-mustard font-heading p-2 uppercase rounded-lg shadow-sm mt-5 hover:font-title"
          >
            {isLastStep ? <p>order</p> : <p>next</p>}
          </button>
        </div>
      </ContainerForm>
      {/* </AppContext.Provider> */}
    </>
  );
}

export default App;
