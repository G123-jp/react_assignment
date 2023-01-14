import { useState, useEffect, FormEvent } from "react";
import photo from "./assets/food3.jpg";
import { v4 as uuidv4 } from "uuid";
// import AppContext from "./Components/AppContext";
import Start from "./Components/Forms/Start";
import StepOne from "./Components/Forms/StepOne";
import StepTwo from "./Components/Forms/StepTwo";
import StepThree from "./Components/Forms/StepThree";
import Review from "./Components/Forms/Review";
import { type Orders, type ReviewObject, type MenuItem } from "./types/global";
import { useNavigateForm } from "./Components/HelperFunctions/useNavigateForm";
import ContainerForm from "./Components/FormElements/ContainerForm";
import ProgressBar from "./Components/ProgressBar";
import axios from 'axios'

const INITIAL_DATA: ReviewObject = {
orderId: uuidv4(),
mealType: "",
numberOfPeople: "",
restaurant: "",
orders: [],
}

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);

  const getDishes = async () => {
    await axios
        .get(
          `data/dishes.json`
        )
        .then((response) => {
            setMenuData(response.data)
        });
};

useEffect (()=> {
  getDishes()
},[]);

console.log(menuData);

  const progressBar = [
    { title: "start" },
    { title: "part 1" },
    { title: "part 2" },
    { title: "part 3" },
    { title: "review" },
  ];

  console.log(data)
  const progress = [
    <Start/>,
    <StepOne {...data} updateData={updateData}/>,
    <StepTwo {...data} updateData={updateData} />,
    <StepThree  {...data} updateData={updateData} />,
    <Review />,
  ];

  const { currentStepIndex, step, back, next, isFirstStep, isLastStep } =
    useNavigateForm(progress);

  console.log(currentStepIndex);
  console.log(step);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert ("Sucessfully ordered your meal!")
  }

  function updateData(data: Partial<ReviewObject>) {
    setData((prevData) => {
      return { ...prevData, ...data };
    });
  }
  return (
    <>
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
    </>
  );
}

export default App;
