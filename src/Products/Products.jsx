import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import image2 from "../images/Man with Phone 1.png"
import image3 from "../images/portrait-young-man-isolated.png"
import Footer from "../HomePages/Footer"
import ProductNavbar from '../Products/productNavbar'


const Products = () => {
    const [products, setProducts] = useState([]);
    const [ loading, setLoading] = useState(true)
  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return `http://localhost:5000/uploads/${image.replace(/^uploads[\\/]/, '')}`;
  };

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch("http://localhost:5000/products");
            const data = await response.json();

            setProducts(data);
        };

        setLoading(false)
        getProducts();
    }, []);

    if(loading) {
      return <h2>Loading Products...</h2>
    }
    
  return (
    <div>
      <ProductNavbar />

      <div className="heroProducts">
        <div className="hero-gr">
          <h2>
            Dreams about the future are <br /> always filled with gadgets. We <br /> always want more.
          </h2>
        </div>
        <img src={image3} alt="" />
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: "20px", justifySelf: "center", justifyItems: "center", marginTop: "30px"}}>
        {products.map((product) => (
            <div key={product._id} style={{border: "3px solid black", overflow: 'hidden', borderRadius: "10px", width: "296px", Height: '335px', cursor: "pointer"}}>
                <img style={{ height: '257px', objectFit: 'cover' }}
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  Width={291}
                 />

                 <div style={{paddingLeft: '20px', paddingBottom: '20px' }}>
                    <div>
                      <h2 style={{ fontFamily: 'montserrat', fontWeight: '500', fontSize: '18px', margin: '5px 0', width: '250px', overflowWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'normal', overflow: 'hidden' }}>{product.name}</h2>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', justifyItems: 'center'}}>
                      <h3 style={{ fontFamily: 'montserrat', fontWeight: '700', fontSize: '18px', color: 'black' }}>#{product.price}</h3>

                      <Link style={{ background: 'yellow', width: '78px', height: '36px', background: '#ffcc29', color: '#211d1d', textAlign: 'center', display: 'block', gap: '2px', borderRadius: '5px', margin: '5px 15px 0px 5px'}} to={`/products/${product._id}`}>
                        <span style={{ fontFamily: 'montserrat', fontWeight: '700', fontSize: '24px', margin: '0px', padding: '0px' }}>+</span>
                        <p style={{fontFamily: 'montserrat', fontWeight: '800', fontSize: '8px', margin: '0px', position: 'relative', top: '-12px', left: '-10px' }}>Add to cart</p>
                      </Link>
                    </div>
                </div>    
            </div>
        ))}
      </div>

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

export default Products