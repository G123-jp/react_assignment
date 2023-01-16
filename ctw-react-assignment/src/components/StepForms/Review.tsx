import { useAppContext } from '@/context'
import { DishItem } from '@/types'

const Review = (): JSX.Element => {
  const { getValues } = useAppContext()

  const { meal, peopleCount, restaurant, dishes } = getValues()
  return (
    <section>
      <h3>this is review</h3>
      <p>Meal:{meal}</p>
      <p>No. of People:{peopleCount}</p>
      <p>Restaurant:{restaurant}</p>
      <div>
        <p>Dishes:</p>
        {dishes.map((d: DishItem, index: number) => (
          <div key={index}>
            {d.item}-{d.count}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Review
