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
    <>
      {color === "pomelo" &&
        <span className="flex bg-pomelo w-16 h-16 rounded-full items-center justify-center shadow-lg text-whiteish">
          {children}
        </span>
    }

      {color === "lightorange" &&
        <span className="flex bg-lightorange w-16 h-16 rounded-full items-center justify-center shadow-lg">
          {children}
        </span>
      }

      {color === "mustard" && (
        <span className="flex bg-mustard w-16 h-16 rounded-full items-center justify-center shadow-lg">
          {children}
        </span>
      )}

      {color === "whitish" && (
        <span className="flex bg-whitish w-16 h-16 rounded-full items-center justify-center shadow-lg">
          {children}
        </span>
      )}

       {color === "charcoal" && (
        <span className="flex bg-charcoal w-16 h-16 rounded-full items-center justify-center shadow-lg  text-whiteish">
          {children}
        </span>
      )}
    </>
  );
};

export default TimeLineIndicator;
