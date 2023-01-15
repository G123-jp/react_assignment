import { type ReactElement } from "react";
import { type Orders } from "../../types/global";

type reviewProps = {
  orderId: string;
  mealType: string;
  numberOfPeople: string;
  restaurant: string;
  orders: Orders[];
};

const Review = (props: reviewProps): ReactElement => {
  const { mealType, numberOfPeople, restaurant, orders } = props;

  return (
    <>
      <div className="popout">
        <div className="grid grid-cols-2 grid-rows-3 gap-5">
          <p className="font-heading uppercase">Meal</p>
          <p className="font-body1 capitalize">{mealType}</p>
          <p className="font-heading uppercase">Number of People</p>
          <p className="font-body1">{numberOfPeople}</p>
          <p className="font-heading uppercase">Restaurant</p>
          <p className="font-body1">{restaurant}</p>
        </div>
        <p className="font-title uppercase my-5">Ordered Items</p>
        <table>
          <thead>
            <tr>
              <th
                scope="col"
                className="uppercase font-heading text-md px-6  text-center"
              >
                Dish
              </th>
              <th
                scope="col"
                className="uppercase font-heading px-6 text-center"
              >
                Serving
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              return (
                <tr key={index + 100}>
                  <th
                    scope="col"
                    className="capitalize font-body1 text-md px-6  text-center"
                  >
                    {order.name}
                  </th>
                  <th
                    scope="col"
                    className="capitalize font-body1 px-6 text-center"
                  >
                    {order.numberOfServings}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Review;
