import { useState, useRef } from "react";
import photo from "./assets/food3.jpg";
import AppContext from "./Components/AppContext";
import ProgressBar from "./Components/ProgressBar";
import Start from "./Components/Forms/Start";
import StepOne from "./Components/Forms/StepOne";
import StepTwo from "./Components/Forms/StepTwo";
import StepThree from "./Components/Forms/StepThree";
import Review from "./Components/Forms/Review";
import { Orders } from "./types/global";

function App() {
  const [form, setForm] = useState<string>("start");
  const [orders, setOrders] = useState<Orders[]>([]);
  const mealType = useRef<string>("");
  const numberOfPeople = useRef<number>(0);
  const restaurant = useRef<string>("");
  const dish = useRef<string>("");
  const numberOfServings = useRef<number>(0);

  const handleClickEvent = (nextForm: string) => {
    setForm(nextForm);
  };

  const renderForm = (form: string) => {
    switch (form) {
      case "start":
        return <Start nextForm={"stepOne"}  />;
      case "stepOne":
        return <StepOne/>;
      case "stepTwo":
        return <StepTwo />;
      case "stepThree":
        return <StepThree />;
      case "review":
        return <Review />;
      // default:
      //   return <Start/>
    }
  };

  console.log(form);

  return (
    <>
      <AppContext.Provider
        value={{
          handleClickEvent: handleClickEvent,
          setOrders: setOrders,
          orders: orders,
          form: form,
          mealType: mealType,
          numberOfPeople: numberOfPeople,
          restaurant: restaurant,
          dish: dish,
          numberOfServings: numberOfServings,
        }}
      >
        
        <div className="absolute object-fit:cover">
          <img
            src={photo}
            alt="heroImage"
            className="h-screen w-screen object-cover"
          />
        </div>
        {renderForm(form)}
      </AppContext.Provider>
    </>
  );
}

export default App;
