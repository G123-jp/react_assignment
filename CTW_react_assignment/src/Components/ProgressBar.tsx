import React, {
  type ReactElement,
  // type MutableRefObject,
  useContext,
  // useEffect,
} from "react";
import AppContext from "./AppContext";
// import "./../styles/ProgressBar.module.css"
import ProgressBarIndicator from "./FormElements/ProgressBarIndicator";

interface props {
  progressBar: {title:string}[]
}

const ProgressBar = (props: props): ReactElement => {

  const { progressBar } = props;
  // const value = useContext(AppContext);
  // const { page } = value;





  return (
    <div className="max-w-xl mx-auto my-4 pb-10 font-heading uppercase grid grid-flow-cols grid-cols-5 grid-row-1 gap-5">
      {progressBar.map((step) => {
        return <ProgressBarIndicator progress="lightorange">{step.title}</ProgressBarIndicator> 
      })}
    </div>
  );
};

export default ProgressBar;
