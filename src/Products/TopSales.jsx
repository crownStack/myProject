import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const TopSales = () => {
    const [products, setProducts] = useState([]);
    
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
    
            getProducts();
        }, []);
    
        const sortedByStock = [...products].sort((firstProduct, secondProduct) =>
          (secondProduct.stock || 0) - (firstProduct.stock || 0)
        );
        const sortedBySales = [...products].sort((firstProduct, secondProduct) =>
          (secondProduct.sold || 0) - (firstProduct.sold || 0)
        );
    
        const ProductCard = ({ product }) => (
          <div style={{ border: "3px solid black", overflow: "hidden", borderRadius: "10px", Width: "296px", minHeight: "335px", cursor: "pointer" }}>
            <img style={{ height: '257px', width: '291px', objectFit: 'cover' }}
              src={getImageUrl(product.image)}
              alt={product.name}
            />
            <div style={{paddingLeft: '20px', paddingBottom: '20px' }}>
              <div>
                <h2 style={{ fontFamily: 'montserrat', fontWeight: '500', fontSize: '18px', margin: '5px 0', width: '250px', overflowWrap: 'break-word', wordBreak: 'break-word', whiteSpace: 'normal', overflow: 'hidden' }}>{product.name}</h2>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', justifyItems: 'center'}}>
                <h3 style={{ fontFamily: 'montserrat', fontWeight: '700', fontSize: '18px', color: 'black' }}>#{product.price}</h3>

                <Link style={{ background: 'yellow', width: '78px', height: '36px', background: '#ffcc29', color: '#211d1d', textAlign: 'center', display: 'block', gap: '2px', borderRadius: '5px', margin: '5px 15px 0px 5px'}} to={`/products/${product._id}`}>
                  <span style={{ fontFamily: 'montserrat', fontWeight: '700', fontSize: '24px', margin: '0px', padding: '0px' }}>+</span>
                  <p style={{fontFamily: 'montserrat', fontWeight: '800', fontSize: '8px', margin: '0px', position: 'relative', top: '-13px', left: '-8px' }}>Add to cart</p>
                </Link>
              </div>
            </div>
          </div>      
        );

  return (
    <div>
        {/* TOPSALES */}
      <section style={{ margin: "40px 0px" }}>
        <h2 style={{ width: '100%', padding: '10px 0px 10px 70px', color: "#fff", background: '#211d1d', fontFamily: 'Montserrat', fontWeight: '800', fontStyle: 'ExtraBold', fontSize: '20px', lineHeight: '100%'
            }}>Top Stock</h2><br />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: "20px", justifyItems: "center", marginTop: '30px' }}>
          {sortedByStock.slice(0, 4).map((product) => <ProductCard key={`stock-${product._id}`} product={product} />)}
        </div>
      </section>
 
      <section style={{ margin: "40px 0px" }}>
        <h2 style={{ width: '100%', padding: '10px 0px 10px 70px', color: "#fff", background: '#211d1d', fontFamily: 'Montserrat', fontWeight: '800', fontStyle: 'ExtraBold', fontSize: '20px', lineHeight: '100%'
            }}>Top Selling Items</h2><br />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: "20px", justifyItems: "center", marginTop: '30px' }}>
          {sortedBySales.slice(0, 4).map((product) => <ProductCard key={`sales-${product._id}`} product={product} />)}
        </div>
      </section>
    </div>
  )
}

export default TopSales
