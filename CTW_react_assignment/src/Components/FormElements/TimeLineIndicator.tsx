import React, {
  type ReactElement,
  type MutableRefObject,
  Children,
} from "react";

interface props {
  children?: JSX.Element | JSX.Element[];
  color: string;
}

const TimeLineIndicator = (props: props): ReactElement => {
  const { children, color } = props;
  return (
    <span
      className={`flex bg-${color} w-16 h-16 rounded-full items-center justify-center shadow-lg text-whiteish`}
    >
      {children}
    </span>
  );
};

export default TimeLineIndicator;
