import React from 'react'
import { Link } from 'react-router-dom'
import TopSales from '../Products/TopSales'
import image2 from "../images/Man with Phone 1.png"
import Footer from '../HomePages/Footer'

const Category = () => {
  return (
    <div>
        <section className='category'>
            <div className='iphones'>
                <h1>Apple Iphones</h1>
            </div>

            <div className='samsungs'>
                <h1>Samsung Phones</h1>
            </div>

            <div className='laptop'>
                <h1>Laptops</h1>
            </div>

            <div className='smartWatch'>
                <h1>Smart watch </h1>
            </div>

            <div className='tablets'>
                <h1>Tablets</h1>
            </div>

            <div className='accessories'>
                <h1>Accessories</h1>
            </div>

            <div className='games'>
                <h1>Games and Consoles</h1>
            </div>
        </section>


        <TopSales />

        <section className="priceSlash">
            <div className="priceSlashText">
                <span>Awoof Friday</span>
                <h2>Price Slash</h2>
                <p>Visit us @ 21, Kodesho Street, beside Juli<br/> Pharmacy, Ikeja, Lagos to enjoy our Awoof<br /> Friday deals.</p>
                <button type="button"><Link to="/awoofriday">Order now</Link></button>
            </div>

            <div className="priceSlashImg">
                <img src={image2} alt="" />
            </div>
        </section>

        <Footer />
    </div>
  )
}

export default Category
