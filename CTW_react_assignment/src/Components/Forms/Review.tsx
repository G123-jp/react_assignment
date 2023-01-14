import React, { type ReactElement, type MutableRefObject } from "react";
import { type Orders } from "../../types/global";

type reviewProps = {
  orderId: string;
  mealType: string;
  numberOfPeople: string;
  restaurant: string;
  orders: Orders[];
};

const Review = (props: reviewProps): ReactElement => {
  const { orderId, mealType, numberOfPeople, restaurant, orders } = props;

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-3 gap-5">
        <p className="font-heading uppercase">Meal</p>
        <p className="font-body1">{mealType}</p>
        <p className="font-heading uppercase">Number of People</p>
        <p className="font-body1">{numberOfPeople}</p>
        <p className="font-heading uppercase">Restaurant</p>
        <p className="font-body1">{restaurant}</p>
      </div>
      <p className="font-heading uppercase my-5">Dishes</p>
      <table>
        <thead>
          <tr>
            <th
              scope="col"
              className="uppercase font-heading text-md px-6  text-left"
            >
              Dish
            </th>
            <th scope="col" className="uppercase font-heading px-6 text-left">
              Serving
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr>
                <th
                  scope="col"
                  className="uppercase font-heading text-md px-6  text-left"
                >
                  {order.name}
                </th>
                <th
                  scope="col"
                  className="uppercase font-heading px-6 text-left"
                >
                  {order.numberOfServings}
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Review;
