import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import images from "../images/Apple Pro 1.png"
import image2 from "../images/Man with Phone 1.png"
import image3 from "../images/Explore Picture 1.png"
import image4 from "../images/Repair Picture 1.png"
import image5 from "../images/Insure Picture 1.png"
import Footer from "../HomePages/Footer"

const LogOut = () => {
  const [ message, setMessage ] = useState('');

  useEffect(() =>{
    fetch("http://localhost:5000/Home")
    .then((res) => res.json())
    .then((data) => {
      setMessage(data.message);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    })
  }, []);

  return (
    <>
      <section className='hero'>
          <div className="heroText">
            <span>Newly Released</span>
            <h2>Apple Pro Vision</h2>
            <p>Apple Vision Pro seamlessly blends<br /> digital content with your physical space.</p>
            <button>Order Now</button>
          </div>

          <div className='heroImg'>
            <img src={images} />
          </div>
      </section>

      <section className="priceSlash">
        <div className="priceSlashText">
          <span>Awoof Friday</span>
          <h2>Price Slash</h2>
          <p>Visit us @ 21, Kodesho Street, beside Juli<br/> Pharmacy, Ikeja, Lagos to enjoy our Awoof<br /> Friday deals.</p>
          <button type="button"><Link to="awoofriday">Order now</Link></button>
        </div>

        <div className="priceSlashImg">
          <img src={image2} alt="" />
        </div>
      </section>

      <section className="explore">
        <div className="exploreText">
          <h2>Explore Our Gadget Collection</h2>
          <p>
            Ready to discover your next favourite gadget?<br/>
            Start browsing our collection and elevate your tech<br /> experience today! <br /><br />
            We’re passionate about bringing you the tech coolest<br /> gadgets and tech accessories that enhance your<br /> lifestyle and keep and ahead of the curve.
          </p>
          <button type='button'>Explore Now</button>
        </div>

        <div className="exploreImg">
          <img src={image3} />
        </div>
      </section>

      <section className="repair">
        <div className="repairImg">
          <img src={image4} alt="" />
        </div>

        <div className="repairText">
          <h2>Expert Gadget Repair</h2>
          <p>
            Experience a seamless solution to your gadget woes<br /> with our professional repair services.<br /><br/>
            We understand the frustration of dealing with a<br /> broken device, which is why we’re here to provide you<br /> with fast, reliable, affordable repairs and delivery to<br /> get you back up and running in no time.
          </p>
          <button type="button"><Link to="/serviceCenter">Fix Here</Link></button>
        </div>
      </section>

      <section className="insure">
        <div className="insureText">
          <h2>Use with peace of mind</h2>
          <p>
            We understand that accident happens, which is why we offer<br /> comprehensive gadget insurance to safeguard your valuable<br /> devices. Our insurance plans provide peace of mind and<br /> financial protection against unexpected damages.<br /><br />
            Explore our insurance plans today and give your gadgets the<br /> protection they deserve.
          </p>
          <button type="button">Apply Here</button>
        </div>

        <div className="insureImg">
          <img src={image5} alt="" />
        </div>
      </section>

      <section className="team">
        <div className="teamText">
          <h2>Join our team as a distributor</h2>
          <p>
            Are you passionate about gadgets and looking for an existing<br /> opportunity to become part of a thriving industry? Look no further!<br /> We are always on the look out for individuals who share our passion<br /> for technology to join us as a distributor.
          </p>
          <button type="button">Continue</button>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default LogOut
