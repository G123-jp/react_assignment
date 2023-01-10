import React, { type ReactElement, type MutableRefObject } from "react";

interface props {
    children: ReactElement;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    ref?: MutableRefObject<HTMLDivElement | null>;
}
const Card = (props:props): ReactElement => {
  
    return (
        <>
        <div className=""></div>
        </>
    );
  };
  
  export default Card;