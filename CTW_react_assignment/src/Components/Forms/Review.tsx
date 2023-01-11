import React, { type ReactElement, type MutableRefObject } from "react";
import ContainerForm from "../FormElements/ContainerForm";
import ProgressBar from "../ProgressBar";
import Button from "../FormElements/Button";

const Review = (): ReactElement => {

    return (
      <ContainerForm>
      <ProgressBar />
<h1>review</h1>
      <div className="grid grid-cols-2 gap-36">
        <Button nextForm={"stepThree"}>
          <p>Previous</p>
        </Button>
        <Button nextForm={"start"}>
          <p>Order</p>
        </Button>
      </div>
    </ContainerForm>
    );
  };
  
  export default Review;