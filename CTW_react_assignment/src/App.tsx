import { useState, useRef, startTransition } from "react";
import photo from "./assets/food3.jpg";
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

function App() {
  const [form, setForm] = useState<string>("0");
  const [orders, setOrders] = useState<Orders[]>([]);
  const [page, setPage] = useState<number>(1);
  const mealType = useRef<string>("");
  const numberOfPeople = useRef<number>(0);
  const restaurant = useRef<string>("");
  const dish = useRef<string>("");
  const numberOfServings = useRef<number>(0);
  const [data, setData] = useState<ReviewObject[]>([]);

  const progress = [
    {
      title: "start",
    },
    {
      title: "step 1",
    },
    {
      title: "step 2",
    },
    {
      title: "step 3",
    },
    {
      title: "review",
    },
  ];

  const { steps, currentStepIndex, step, back, next, isFirstStep, isLastStep } =
    useNavigateForm(progress);

    console.log(step)
    console.log(currentStepIndex)

  const renderForm = (form: string|number) => {
    switch (form) {
      case "0":
        return <Start />;
      case "1":
        return <StepOne/>;
      case "2":
        return <StepTwo />;
      case "3":
        return <StepThree />;
      case "4":
        return <Review />;
      default:
        return <Start/>
    }
  };

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

      <ContainerForm>
        <ProgressBar progressBar={progress} />

        {renderForm(form)}

        <div className="grid grid-cols-2 gap-36 mt-10">
          {!isFirstStep ? (
            <button
              type = "button"
              onClick={()=>{back
                setForm(`${parseInt(form) - 1}`)}}
              className="bg-mustard font-heading p-2 uppercase rounded-lg shadow-sm mt-5 hover:font-title"
            >
              <p>back</p>
            </button>
          ) : (
            <div></div>
          )}
          <button
            type = "button"
            onClick={()=>{next
            {isLastStep? setForm('0'): setForm(`${parseInt(form) + 1}`)}
          }}
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
