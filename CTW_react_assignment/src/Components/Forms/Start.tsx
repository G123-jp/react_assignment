import React, {
  type ReactElement,
  //   type MutableRefObject,
} from "react";
import ContainerForm from "../FormElements/ContainerForm";
import Button from "../FormElements/Button";
import ProgressBar from "../ProgressBar";

interface props {
  nextForm: string;
}

const Start = (props: props): ReactElement => {
  const { nextForm } = props;

  return (
    <ContainerForm>
      <ProgressBar />
      <h1 className="text-2xl text-charcoal self-center font-heading mb-10">
        Are you ready to eat?
      </h1>
      <Button nextForm={nextForm}>
        <p>Yes 🍟</p>
      </Button>
    </ContainerForm>
  );
};

export default Start;
