import React, {
  type ReactElement,
  type MutableRefObject,
  Children,
} from "react";


interface props {
  children?: JSX.Element | JSX.Element[]|string;
  progress: string;
}

const ProgressBarIndicator = (props: props): ReactElement => {
  const {children, progress} = props;

  const renderProgressBar = (progress: string) => {
    switch (progress) {
      case "complete":
        return <span
        className="flex bg-lightorange w-16 h-16 rounded-full items-center justify-center shadow-lg text-whiteish"
      >
        {children}
      </span>;
      case "active":
        <span
      className="flex bg-pomelo w-16 h-16 rounded-full items-center justify-center shadow-lg text-whiteish"
    >
      {children}
    </span>
      case "uncomplete":
        return <span
        className="flex bg-charcoal w-16 h-16 rounded-full items-center justify-center shadow-lg text-whiteish"
      >
        {children}
      </span>;
      default:
        return <span
        className="flex bg-charcoal w-16 h-16 rounded-full items-center justify-center shadow-lg text-whiteish"
      >
        {children}
      </span>
    }
  };

  return (
    renderProgressBar(progress)
  );
};

export default ProgressBarIndicator;
