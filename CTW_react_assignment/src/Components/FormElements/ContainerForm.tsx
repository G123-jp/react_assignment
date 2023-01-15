import { type ReactElement, FormEvent } from "react";

interface props {
  children?: JSX.Element | JSX.Element[];
  onSubmit: (e: FormEvent) => void;
}

const ContainerForm = (props: props): ReactElement => {
  const { children, onSubmit } = props;

  return (
    <>
      <div className="relative items-center justify-center flex w-screen h-screen shadow-lg">
        <form
          onSubmit={onSubmit}
          className="p-10 bg-whiteish rounded-lg items-center overflow-scroll flex flex-col"
          style={{ maxWidth: "90vw", maxHeight: "75vh", minHeight: "30vh" }}
        >
          {children}
        </form>
      </div>
    </>
  );
};

export default ContainerForm;
