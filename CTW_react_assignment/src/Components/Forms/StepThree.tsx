import { type ReactElement, useState, useEffect, useContext } from "react";
import { type Orders, type MenuItem } from "../../types/global";
import AppContext from "../AppContext";

type data = {
  orders: Orders[];
};
type stepThreeProps = data & {
  filteredRestaurantMenu: MenuItem[];
};

const StepThree = (props: stepThreeProps): ReactElement => {
  const { orders, filteredRestaurantMenu } = props;
  const [orderItem, setOrderItem] = useState<Orders | null>(null);
  const [name, setName] = useState<string>("");
  const [numberOfServings, setNumberOfServings] = useState<string>("");
  const [newOrder, setNewOrder] = useState<boolean>(false);
  const value = useContext(AppContext);
  const { data, servingsCount, setServingsCount } = value;


  useEffect(() => {
    if (name && numberOfServings) {
      setOrderItem({ name: name, numberOfServings: numberOfServings });
      setNewOrder(false);
    }
  }, [name, numberOfServings, orders, newOrder]);

  return (
    <>
      <div className="popout">
        <p className="font-body2 text-sm text-center">
          {servingsCount < data.numberOfPeople
            ? `Please order at least the same amount of servings per number of people
          indicated in Part 1. That number is ${data.numberOfPeople}.`
            : ""}
        </p>
        <div className="grid grid-cols-4  grid-rows-4 gap-x-2 place-items-center">
          <label className="col-span-2 font-body1 mb-2" htmlFor="meal">
            Select a dish:
          </label>

          <label htmlFor="numberOfServings" className="font-body1 mb-2">
            Serving:
          </label>

          <select
            autoFocus
            className="col-span-2 text-center p-2 shadow-md w-[100px] sm:w-[150px]"
            name="dish"
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="dish"
            aria-roledescription="list of options"
            aria-label="list of dishes"
            required
          >
            <option role="option" aria-selected="false" value="" key="0">
              ---
            </option>
            {filteredRestaurantMenu!.map((menuItem, index) => {
              return (
                <option
                  role="option"
                  aria-selected="false"
                  value={menuItem.name}
                  key={index + 100}
                >
                  {menuItem.name}
                </option>
              );
            })}
          </select>

          <input
            className="font-body1 text-center p-2 shadow-md  sm:w-[70px]"
            name="numberOfServings"
            type="number"
            min="1"
            max="10"
            //defaultvalue also count of servings
            onChange={(e) => {
              setNumberOfServings(e.target.value);
            }}
            aria-roledescription="input"
            aria-label="number of servings input"
            required
          />

          <button
            type="button"
            onClick={() => {
              let findIndex = orders.findIndex((obj) => obj.name == name);
              if (findIndex === -1) {
                orders.push(orderItem!);
              } else {
                orders[findIndex].numberOfServings = numberOfServings;
              }
              setNewOrder(true);
              setServingsCount(parseInt(numberOfServings) + servingsCount);
            }}
            className="row-span-1 shadow-sm bg-mustard p-2 uppercase rounded-full h-[50px] w-[50px]  font-heading hover:font-title hover:shadow-lg"
          >
            <p>+</p>
          </button>

          {orderItem && (
            <table className="mt-5 col-span-4 row-span-2">
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
          )}
        </div>
      </div>
    </>
  );
};

export default StepThree;
