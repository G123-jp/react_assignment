import React, { type ReactElement, type MutableRefObject, Children } from "react";
import { useNavigateForm } from "../useNavigateForm";

interface props {
  children?: JSX.Element|JSX.Element[];
}

const ContainerForm = (props: props): ReactElement => {
    const { children } = props;

  return (
    <>
      <div className="relative items-center justify-center flex w-screen h-screen">
        <form className="p-10 bg-whiteish rounded-lg items-center justify-center flex flex-col"
        style={{ width: "600px", maxWidth: "80vw", maxHeight: "70vh"}}>
      
        {children}
    
        </form>

      </div>
    </>
  );
};

export default ContainerForm;
