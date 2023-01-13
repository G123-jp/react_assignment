import { useState, useRef, startTransition } from "react";
import photo from "./assets/food3.jpg";
// import AppContext from "./Components/AppContext";
// import Start from "./Components/Forms/Start";
// import StepOne from "./Components/Forms/StepOne";
// import StepTwo from "./Components/Forms/StepTwo";
// import StepThree from "./Components/Forms/StepThree";
// import Review from "./Components/Forms/Review";
import { type Orders, type ReviewObject } from "./types/global";
import { useNavigateForm } from "./Components/useNavigateForm";
import ContainerForm from "./Components/FormElements/ContainerForm";
import ProgressBar from "./Components/ProgressBar";

function App() {
  const [form, setForm] = useState<string>("start");
  // const [active, setActive] = useState<boolean|null>(null);
  // const [complete, setComplete] = useState<boolean|null>(null);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [page, setPage] = useState<number>(1);
  const mealType = useRef<string>("");
  const numberOfPeople = useRef<number>(0);
  const restaurant = useRef<string>("");
  const dish = useRef<string>("");
  const numberOfServings = useRef<number>(0);
  const [data, setData] = useState<ReviewObject[]>([]);

const progress = [{
  title: "start"
},
{
  title: "step 1"
},
{
  title: "step 2"
},
{
  title: "step 3"
},
{
  title: "review"
},]


  const { steps, currentStepIndex, step } = useNavigateForm(progress);

  // const handleClickEvent = (nextForm: string) => {
  //   setForm(nextForm);
  // };

  // let formOrder: Object[] = [
  //   {
  //     0: "start"
  //   },
  //   {
  //     1: "stepOne"
  //   },
  //   {
  //     2: "stepTwo"
  //   },
  //   {
  //     3: "stepThree"
  //   },
  //   {
  //     4: "review"
  //   }]

  // const renderForm = (form: string) => {
  //   switch (form) {
  //     case "start":
  //       return <Start />;
  //     case "stepOne":
  //       return <StepOne/>;
  //     case "stepTwo":
  //       return <StepTwo />;
  //     case "stepThree":
  //       return <StepThree />;
  //     case "review":
  //       return <Review />;
  //     default:
  //       return <Start/>
  //   }
  // };

  console.log(form);

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
      <ProgressBar progressBar={progress}/>

      </ContainerForm>


      {/* {renderForm(form)} */}
      {/* </AppContext.Provider> */}
    </>
  );
}

export default App;
