import React from 'react'
import image from "../images/robot-with-pliers 1.png"
import { Link } from 'react-router-dom'

const ServiceCenter2 = () => {
  return (
    <div>
      <section className='repairs'>
        <div className="repairTexts">
            <h2>Expert in gadget repairs</h2>

            <div className="repairfeatures">
                <div style={{width: "123px"}}>
                    <p>pickup</p>
                </div>  

                <div style={{width: "151px"}}>
                    <p>DIAGNOSIS</p>
                </div>  

                <div style={{width: "116px"}}>
                    <p>REPAIR</p>
                </div>    

                <div style={{width: "172px"}}>
                    <p>DELIVER FAST</p>
                </div>   
            </div> 
        </div>
        
        <div className='repairImgs'>
          <img src={image} alt="robot" />
        </div>
      </section>

      <section className="repairField">
        <form action="">
          <label>What Gadget are you using</label><br />
          <textarea type="text" placeholder='Example: Iphone 15 Pro Max, 128gb, titinuim colour' /><br />
          <div style={{display: "flex", gap: "20px", marginLeft: "525px"}}>
            <button style={{width: "123px", height: "51px", backgroundColor: "#c40f35"}}><Link to="/serviceCenter"> Go Back</Link></button>
            <button><Link to="/">Continue</Link></button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default ServiceCenter2