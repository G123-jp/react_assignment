import { useState } from 'react'
import photo from './assets/food3.jpg'

function App() {

  return (
    <>
    <div className="absolute object-fit:cover">
      <img src={photo} alt="heroImage" className="h-screen w-screen object-cover" />
    </div>
    <div className="relative h-screen w-scrren flex align-center self-center">
      <h1 className='text-5xl text-whiteish self-center'>hello</h1>
    </div>
    </>
  )
}

export default App
