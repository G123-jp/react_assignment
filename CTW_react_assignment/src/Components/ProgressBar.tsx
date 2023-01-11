import React, {
  type ReactElement,
  type MutableRefObject,
  useContext,
  useEffect,
} from "react";
import AppContext from "./AppContext";
// import "./../styles/ProgressBar.module.css"
import TimeLineIndicator from "./FormElements/TimeLineIndicator";

const ProgressBar = (): ReactElement => {
  const value = useContext(AppContext);
  const { form, active, complete } = value;
  let activeColor = "pomelo";
  let completedColor = "lightorange";
  let uncompletedColor = "charcoal";
  let color = "charcoal";

  useEffect (() =>{


  },[])
 


  return (
    <div className="max-w-xl mx-auto my-4 pb-10 font-heading uppercase grid grid-flow-cols grid-cols-5 grid-row-1 gap-5">
      <TimeLineIndicator color={color}>
        <span>start</span>
      </TimeLineIndicator>
      <TimeLineIndicator color="charcoal">
        <span>step 1</span>
      </TimeLineIndicator>
      <TimeLineIndicator color="charcoal">
        <span>step 2</span>
      </TimeLineIndicator>
      <TimeLineIndicator color="charcoal">
        <span>step 3</span>
      </TimeLineIndicator>
      <TimeLineIndicator color="charcoal">
        <span>review</span>
      </TimeLineIndicator>
    </div>
  );
};

export default ProgressBar;
