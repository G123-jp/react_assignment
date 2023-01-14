import React, { type ReactElement, type MutableRefObject, Children, FormEvent } from "react";

interface props {
  children?: JSX.Element|JSX.Element[];
  onSubmit: (e:FormEvent) => void;
}

const ContainerForm = (props: props): ReactElement => {
    const { children, onSubmit } = props;

  return (
    <>
      <div className="relative items-center justify-center flex w-screen h-screen">
        <form onSubmit={onSubmit} className="p-10 bg-whiteish rounded-lg items-center justify-center flex flex-col"
        style={{ width: "600px", maxWidth: "80vw", maxHeight: "70vh"}}>
      
        {children}
    
        </form>

      </div>
    </>
  );
};

export default ContainerForm;
