import React from 'react'
import AboutImg from "../images/image 11.png"

const About = () => {
  return (
    <>
      <div className='About'>
        <img src={AboutImg} alt="AboutImg" />
        <div className="Abouttext">
          <div className='aboutText1'>
            <h2>Our Mission</h2>
            <p>
              At Abrahamolas Gadgets, we deliver innovative gadgets and<br /> services with financial flexibility,prioritizing customer<br /> satisfaction, employee well-being, and excellence across<br /> Africa, whilefostering a culture of inclusivity and trust.
            </p>
          </div>

          <div className="aboutText2">
            <h2>
              Our Vision
            </h2>
            <p>
              Empowering Africans with accessible and insured technology<br /> solutions, from gadgets to services.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
