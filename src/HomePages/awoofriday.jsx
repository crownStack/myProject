import React from 'react'
import image from '../images/HAPPY FSCE 2 1.png'
import Footer from "../HomePages/Footer"

const Awoofriday = () => {
  return (
    <>
      <div className='awoofFriday'>
        <img src={image} alt="awoofFriday" />

        <div className="awoofText">
            <div className="black">
                <p>Awoof Friday</p>
            </div>
            <div className="yellow">
                <p>Price Slash</p>
            </div>
            <div className='every'>
                <p>Every Fridays</p>
            </div>    
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Awoofriday
