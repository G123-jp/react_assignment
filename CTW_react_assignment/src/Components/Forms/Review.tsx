import React, { type ReactElement, type MutableRefObject } from "react";
import ContainerForm from "../FormElements/ContainerForm";
import ProgressBar from "../ProgressBar";
import Button from "../FormElements/Button";

const Review = (): ReactElement => {

    return (
      <ContainerForm>
      <ProgressBar />

      <div className="grid grid-cols-2 grid-rows-3 gap-5">

        <p className="font-heading uppercase">Meal</p>
        <p className="font-body1">meal details</p>
        <p className="font-heading uppercase">Number of People</p>
        <p className="font-body1">number of people</p>
        <p className="font-heading uppercase">Restaurant</p>
        <p className="font-body1">restaurant name</p>

      </div>
        <p className="font-heading uppercase my-5">Dishes</p>
      <table>
        <thead>
        <tr>
              <th scope="col" className="uppercase font-heading text-md px-6  text-left">
                Dish
              </th>
              <th scope="col" className="uppercase font-heading px-6 text-left">
                Serving
              </th>
            </tr>
        </thead>
        <tbody></tbody>
      </table>
      {/* <div className="grid grid-cols-2 gap-36">
        <Button nextForm={"stepThree"}>
          <p>⬅</p>
        </Button>
        <Button nextForm={"start"}>
          <p>Order</p>
        </Button>
      </div> */}
    </ContainerForm>
    );
  };
  
  export default Review;