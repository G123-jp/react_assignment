import { useState } from "react";
import Step_1 from "./step_1";
import Step_2 from "./step_2";
import Step_3 from "./step_3";
import Step_4 from "./step_4";
import Step_5 from "./step_5";

const MainFormPage: React.FC = () => {
    const [step, setStep] = useState<number>(0);

    const nextButtonHandler = () => {
        if(step === 0){
            setStep(step + 1)
        }else if(step === 1){
            setStep(step + 1)
        }else if(step === 2){
            setStep(step + 1)
        }else if(step === 3){
            setStep(step + 1)
        }else if(step === 4){
            setStep(step + 1)
        }else if(step=== 5){
            setStep(0)
        }
        console.log(step)
    };

    const backButtonHandler = () => {
        setStep(step - 1)
        console.log(step)
    };

    const conditionalButtonStepper = (step:number) => {
        if(step === 1){
            return <Step_1/>
        }else if(step ===2){
            return <Step_2/>
        }else if(step ===3){
            return <Step_3/>
        }else if(step === 4){
            return <Step_4/>
        }else if(step === 5){
            return <Step_5/>
        }else return
    }

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
                    step > 0 && step<5 && <button onClick={() => setStep(step - 1)}>Back</button>
                }
                </div>
                <div className="next-button">
                    <button onClick={()=>{nextButtonHandler()}} className="justify-content align-items">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
};

export default MainFormPage