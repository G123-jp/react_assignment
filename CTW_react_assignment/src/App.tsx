import { useState, useEffect, FormEvent } from "react";
import photo from "./assets/food3.jpg";
import { v4 as uuidv4 } from "uuid";
import AppContext from "./Components/AppContext";
import ProgressBar from "./Components/ProgressBar";
import Start from "./Components/Forms/Start";
import StepOne from "./Components/Forms/StepOne";
import StepTwo from "./Components/Forms/StepTwo";
import StepThree from "./Components/Forms/StepThree";
import Review from "./Components/Forms/Review";
import { type ReviewObject, type MenuItem } from "./types/global";
import { useNavigateForm } from "./Components/HelperFunctions/useNavigateForm";
import ContainerForm from "./Components/FormElements/ContainerForm";
import axios from "axios";

//inital data witin the component
const INITIAL_DATA: ReviewObject = {
  orderId: uuidv4(),
  mealType: "",
  numberOfPeople: "",
  restaurant: "",
  orders: [],
};


function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [filteredMealMenu, setFilteredMealMenu] = useState<MenuItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");
  const [filteredRestaurantMenu, setFilteredRestaurantMenu] = useState<
    MenuItem[]
  >([]);

  const progress = [
    <Start />,
    <StepOne
      {...data}
      updateData={updateData}
      setSelectedMeal={setSelectedMeal}
    />,
    <StepTwo
      {...data}
      updateData={updateData}
      filteredMealMenu={filteredMealMenu}
      setSelectedRestaurant={setSelectedRestaurant}
    />,
    <StepThree
      {...data}
      updateData={updateData}
      filteredRestaurantMenu={filteredRestaurantMenu}
    />,
    <Review {...data} />,
  ];
  //use a hook to navigate through the multiple pages
  const { currentStepIndex, step, back, next, isFirstStep, isLastStep } =
    useNavigateForm(progress);

  //async function to dataSet
  const getDishes = async () => {
    await axios.get(`data/dishes.json`).then((response) => {
      setMenuData(response.data.dishes);
    });
  };

  //run getDishes
  useEffect(() => {
    getDishes();
  }, []);

  //listen to changes on selectedMeal, then filter data by selectedMeal value
  useEffect(() => {
    let filteredMealData = menuData.filter((menuItem) =>
      menuItem.availableMeals.some((availableMeal) => {
        return availableMeal === selectedMeal;
      })
    );
    setFilteredMealMenu(filteredMealData);
  }, [selectedMeal]);

  //listen to changes on restaurant selection, then filter data by selectedRestaurant value
  useEffect(() => {
    let filteredRestaurantData = filteredMealMenu.filter((menuItem) => {
      return menuItem.restaurant === selectedRestaurant;
    });
    setFilteredRestaurantMenu(filteredRestaurantData);
  }, [selectedRestaurant]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Sucessfully ordered your meal!");
    console.log(data);
  }

  function updateData(data: Partial<ReviewObject>) {
    setData((prevData) => {
      return { ...prevData, ...data };
    });
  }
  return (
    <AppContext.Provider
      value= {{
        currentStepIndex: currentStepIndex,

      }}>
      <>
        <div className="absolute object-fit:cover">
          <img
            src={photo}
            alt="heroImage"
            className="h-screen w-screen object-cover"
          />
        </div>
        <ContainerForm onSubmit={onSubmit}>
          <ProgressBar/>
          {/* <ProgressBar progressBar={progressBar} /> */}

          {step}

          <div className="relative grid grid-cols-2 gap-x-80 mt-20">
            {!isFirstStep ? (
              <button
                type="button"
                onClick={back}
                className="bg-mustard font-heading p-2 absolute bottom-0 left-0 uppercase rounded-lg shadow-sm mt-5 hover:font-title"
              >
                <p>back</p>
              </button>
            ) : (
              <div></div>
            )}
            <button
              type="submit"
              className="bg-mustard absolute bottom-0 right-0  font-heading p-2 uppercase rounded-lg shadow-sm mt-5 hover:font-title"
            >
              {isLastStep ? <p>order</p> : <p>next</p>}
            </button>
          </div>
        </ContainerForm>
      </>
    </AppContext.Provider>
  );
}

export default App;
