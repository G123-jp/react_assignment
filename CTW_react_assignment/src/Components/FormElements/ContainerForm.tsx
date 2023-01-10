import React, { type ReactElement, type MutableRefObject, Children } from "react";

interface props {
  children?: ReactElement;
}
const ContainerForm = (props: props): ReactElement => {
    const { children } = props;
  return (
    <>
      <div className="relative items-center justify-center flex w-screen h-screen">
        <section className="p-10 bg-charcoal rounded-lg"
        style={{ maxWidth: "80vw", maxHeight: "50vh"}}>
        <form action="" method="get">
        {children}
        </form>
        </section>
      </div>
    </>
  );
};

export default ContainerForm;
