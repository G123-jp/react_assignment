import React, {
  type ReactElement,
  type MutableRefObject,
  useContext,
} from "react";
import AppContext from "../AppContext";


interface props {
  children?: JSX.Element | JSX.Element[];
  nextForm: string;
}

const Button = (props: props): ReactElement => {
  const { children } = props;
  const value = useContext(AppContext);
  const { handleClickEvent } = value;

  return (
    <button
      onClick={() => {
        handleClickEvent(nextForm);
      }}
      className="bg-mustard font-heading p-2 uppercase rounded-lg shadow-sm mt-5 hover:font-title"
    >
      {children}
    </button>
  );
};

export default Button;
