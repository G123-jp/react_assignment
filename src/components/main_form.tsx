import { useEffect, useState } from "react";
import dishes from "../data/dishes.json";
import { orderInfoType, SingleDish } from "../globals";
import Step_1 from "./step_1";
import Step_2 from "./step_2";
import Step_3 from "./step_3";
import Step_4 from "./step_4";
import Step_5 from "./step_5";



const MainFormPage: React.FC = () => {

    const [step, setStep] = useState<number>(0);
    const [dishesData,setDishesData] = useState<SingleDish[] | []>([])
    const [orderInfo, setOrderInfo] = useState<orderInfoType>({
        category:"",
        numOfPeople:1,
        restaurant:"",
        meals:[],
    })

    useEffect(() => {
        setDishesData(dishes.dishes)
    },[]);

    const nextButtonHandler = () => {
        if(step === 0){
            setStep(step + 1)
        }else if(step === 1){
            if(orderInfo.category !== ""){
                setStep(step + 1);
            }else{
                setStep(1)
            };
        }else if(step === 2){
            setStep(step + 1)
        }else if(step === 3){
            setStep(step + 1)
        }else if(step === 4){
            setStep(step + 1)
        }else if(step=== 5){
            setStep(0)
        }
    };

    const backButtonHandler = () => {
        setStep(step - 1)
        console.log(dishesData)
    };

    const conditionalButtonStepper = (step:number) => {
        console.log(orderInfo)
        if(step === 1){
            return <Step_1 dishesData={dishesData} setDishesData={setDishesData} orderInfo={orderInfo} setOrderInfo={setOrderInfo}/>
        }else if(step ===2){
            return <Step_2 dishesData={dishesData} setDishesData={setDishesData} orderInfo={orderInfo} setOrderInfo={setOrderInfo}/>
        }else if(step ===3){
            return <Step_3 dishesData={dishesData} setDishesData={setDishesData} orderInfo={orderInfo} setOrderInfo={setOrderInfo}/>
        }else if(step === 4){
            return <Step_4 dishesData={dishesData} setDishesData={setDishesData} orderInfo={orderInfo} setOrderInfo={setOrderInfo}/>
        }else if(step === 5){
            return <Step_5/>
        }else return
    };

    const ButtonDisplay = () => {
        if(step === 0){
            return "Start"
        }else if(step === 4){
            return "Submit"
        }else if(step === 5){
            return "Home"
        }else{
            return "Next"
        }
    };

    return(
        <div>
            <div>
                <h3 className="text-3xl font-bold underline">THIS IS A HEADER PLACEHOLDER</h3>
            </div>
            <div>
                {conditionalButtonStepper(step)}
            </div>
            <div className="button-row">
                <div className="back-button">
                {
                    step > 0 && step<5 && <button onClick={()=>{backButtonHandler()}}>Back</button>
                }
                </div>
                <div className="next-button">
                    <button onClick={()=>{nextButtonHandler()}}>
                        {ButtonDisplay()}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default MainFormPage