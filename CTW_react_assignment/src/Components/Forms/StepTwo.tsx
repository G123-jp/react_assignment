import React, { type ReactElement, type MutableRefObject } from "react";
import ContainerForm from "../FormElements/ContainerForm";
import ProgressBar from "../ProgressBar";
import Button from "../FormElements/Button";

const StepTwo = (): ReactElement => {

    return (
      <ContainerForm>
      <ProgressBar />


      <div className="grid grid-cols-2 gap-36">
        <Button nextForm={"stepOne"}>
          <p className="">Previous</p>
        </Button>
        <Button nextForm={"stepThree"}>
          <p className="">Next</p>
        </Button>
      </div>
    </ContainerForm>
    );
  };
  
  export default StepTwo;