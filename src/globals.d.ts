export interface SingleMeal {
    "dish": string,
    "amount": number
}

export interface SingleDish {
    "id": number,
    "name": string,
    "restaurant": string,
    "availableMeals": string[]
  }

  export interface orderInfoType {
    category: string,
    numOfPeople: number,
    restaurant: string,
    meals: SingleMeal[] | []
  }