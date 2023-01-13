import React, {
  type ReactElement,
  //   type MutableRefObject,
} from "react";
import ContainerForm from "../FormElements/ContainerForm";
import Button from "../FormElements/Button";
import ProgressBar from "../ProgressBar";



const Start = (): ReactElement => {

  return (
    <ContainerForm>
      <h1 className="text-2xl text-charcoal self-center font-heading mb-10">
        Are you ready to eat?
      </h1>
    </ContainerForm>
  );
};

export default Start;
