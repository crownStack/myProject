import React, { useState } from 'react'
import { API_URL } from '../config'

const AddProduct = () => {
    const [ product, setProduct ] = useState({
        image: null,
        name: "",
        price: "",
        description: "",
        brand: "",
        color: "",
        capacity: "",
        size: "",
        weight: "",
        stock: "",
        sold: "",
        number: ""
    })
    const [status, setStatus] = useState({ type: '', message: '' });
    
    const handleChange = (e) => {
    const { files, name, value } = e.target;
    
        setProduct({
            ...product,
            [name] : files ? files[0] : value, 
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });
    
        const formData = new FormData();

        formData.append("image", product.image);
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("description", product.description);
        formData.append("brand", product.brand);
        formData.append("color", product.color);
        formData.append("capacity", product.capacity);
        formData.append("size", product.size);
        formData.append("weight", product.weight);
        formData.append("stock", product.stock);
        formData.append("sold", product.sold);
                formData.append("number", product.number);

                try {
                        const response = await fetch(`${API_URL}/products`, {
                                method: "POST",
                                body: formData,
                        });

                        const data = await response.json();
                        if (!response.ok) throw new Error(data.message || 'Unable to add product');

                        setStatus({ type: 'success', message: 'Product added successfully.' });
                        setProduct(current => ({ ...current, image: null, name: '', price: '', description: '', brand: '', color: '', capacity: '', size: '', weight: '', stock: '', sold: '', number: '' }));
                } catch (error) {
                        setStatus({ type: 'error', message: error.message || 'Unable to add product. Please try again.' });
                }
    }

  return (
        <main className="add-product-page">
            <div className="add-product-header">
                <p className="add-product-kicker">Inventory</p>
                <h1>Add a product</h1>
                <p>Enter the product details below to add a new item to your catalogue.</p>
            </div>

            <form onSubmit={handleSubmit} className="add-product-form">
                <section className="add-product-section add-product-image-section">
                    <div>
                        <h2>Product image</h2>
                        <p>Use a clear image with a plain background.</p>
                    </div>
                    <label className="add-product-upload">
                        <span>{product.image ? product.image.name : 'Choose product image'}</span>
                        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
                    </label>
                </section>

                <section className="add-product-section">
                    <div className="add-product-section-heading">
                        <h2>Basic information</h2>
                        <p>Give customers the essential details about this product.</p>
                    </div>
                    <div className="add-product-fields">
                        <label>Product name<input type="text" name="name" placeholder="e.g. Wireless headphones" value={product.name} onChange={handleChange} required /></label>
                        <label>Product number<input type="number" name="number" placeholder="e.g. 1001" value={product.number} onChange={handleChange} required /></label>
                        <label>Price<input type="number" name="price" placeholder="e.g. 75000" min="0" value={product.price} onChange={handleChange} required /></label>
                        <label>Brand<input type="text" name="brand" placeholder="e.g. Apple" value={product.brand} onChange={handleChange} /></label>
                        <label>Colour<input type="text" name="color" placeholder="e.g. Black" value={product.color} onChange={handleChange} /></label>
                        <label>Capacity<input type="text" name="capacity" placeholder="e.g. 256GB" value={product.capacity} onChange={handleChange} /></label>
                        <label>Size<input type="text" name="size" placeholder="e.g. Medium" value={product.size} onChange={handleChange} /></label>
                        <label>Weight<input type="text" name="weight" placeholder="e.g. 1.2kg" value={product.weight} onChange={handleChange} /></label>
                        <label>Available stock<input type="number" name="stock" placeholder="0" min="0" value={product.stock} onChange={handleChange} /></label>
                        <label>Units sold<input type="number" name="sold" placeholder="0" min="0" value={product.sold} onChange={handleChange} /></label>
                    </div>
                    <label className="add-product-description">Description<textarea name="description" placeholder="Describe the product, its features, and what makes it useful." value={product.description} onChange={handleChange} required /></label>
                </section>

                {status.message && <p className={`add-product-status add-product-status-${status.type}`} role="status">{status.message}</p>}
                <div className="add-product-actions"><button type="submit">Add Product</button></div>
            </form>
        </main>
  )
}

export default AddProduct
