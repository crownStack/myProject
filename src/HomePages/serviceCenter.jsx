import React from 'react'
import image from "../images/robot-with-pliers 1.png"
import footer from "./Footer"
import { Link } from 'react-router-dom'

const ServiceCenter = () => {
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
          <label>State your Gadget Problem <span>(in Details)</span></label><br />
          <textarea type="text" placeholder='e.g My phone has a broken Screen' /><br />
          <button type="submit"><Link to="/serviceCenter2">Continue</Link></button>
        </form>
      </section>
    </div>
  )
}

export default ServiceCenter
