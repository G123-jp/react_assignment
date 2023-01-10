import { useState, useRef } from 'react'
import photo from './assets/food3.jpg'
import ContainerForm from './Components/FormElements/ContainerForm'
import Start from './Components/Forms/Start'
import StepOne from './Components/Forms/StepOne'
import StepTwo from './Components/Forms/StepTwo'
import StepThree from './Components/Forms/StepThree'
import Review from './Components/Forms/Review'

function App() {
  const [form, setForm] = useState<string>('start');
  const mealType = useRef<string>("");
  const numberOfPeople = useRef<number>(0);
  const restaurant = useRef<string>("");
  const dish = useRef<string>("");
  const NumberOfServings = useRef<number>(0);



  const renderForm = (form:string) =>{
    switch(form){
      case'start':
        return (
          <Start/>
        )
      case 'stepOne':
        return (
          <StepOne/>
        )
      case'stepTwo':
        return (
          <StepTwo/>
        )
      case'stepThree':
        return (
          <StepThree/>
        )
      case'review':
       return (
          <Review/>
        )
      default:
        return <Start/>
    }
  }

  return (
    <>
    <div className="absolute object-fit:cover">
      <img src={photo} alt="heroImage" className="h-screen w-screen object-cover" />
    </div>
    {renderForm(form)}
    </>
  )
}

export default App
