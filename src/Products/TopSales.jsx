import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import '../style/topsales.css';

const TopSales = () => {
    const [products, setProducts] = useState([]);
    
    const getImageUrl = (image) => {
        if (!image) return '';
        if (image.startsWith('http://') || image.startsWith('https://')) return image;
        return `${API_URL}/uploads/${image.replace(/^uploads[\\/]/, '')}`;
      };
    
        useEffect(() => {
            const getProducts = async () => {
                const response = await fetch(`${API_URL}/products`);
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
          <article className="topsales-card">
            <img className="topsales-card-image"
              src={getImageUrl(product.image)}
              alt={product.name}
            />
            <div className="topsales-card-content">
              <h2 className="topsales-card-name">{product.name}</h2>

              <div className="topsales-card-footer">
                <h3 className="topsales-card-price">#{product.price}</h3>

                <Link className="topsales-card-link" to={`/products/${product._id}`}>
                  <span>+</span>
                  <p>Add to cart</p>
                </Link>
              </div>
            </div>
          </article>
        );

  return (
    <div className="topsales">
        {/* TOPSALES */}
      <section className="topsales-section">
        <h2 className="topsales-heading">Top Stock</h2>
        <div className="topsales-grid">
          {sortedByStock.slice(0, 4).map((product) => <ProductCard key={`stock-${product._id}`} product={product} />)}
        </div>
      </section>
 
      <section className="topsales-section">
        <h2 className="topsales-heading">Top Selling Items</h2>
        <div className="topsales-grid">
          {sortedBySales.slice(0, 4).map((product) => <ProductCard key={`sales-${product._id}`} product={product} />)}
        </div>
      </section>
    </div>
  )
}

export default TopSales
