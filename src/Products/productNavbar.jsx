import { NavLink, Outlet } from "react-router-dom";
import "../style/products.css";

const ProductNavbar = () => {
  return (
    <div>
      <nav className="product-navbar">
        <div className="links">
            <NavLink style={{ color: "#211d1d" }}>Home › </NavLink>
            <NavLink to="/Categories" style={({isActive}) => ({
                margin: "0 10px",
                fontWeight: isActive ? "#211d1d" : "500",
                color: isActive ? "#979281" : "#211d1d"
            })}>Categories ›</NavLink>

            <NavLink to="/Products" style={({isActive}) => ({
                margin: "0 10px",
                fontWeight: isActive ? "#211d1d" : "500",
                color: isActive ? "#979281" : "#211d1d"
            })}>Products</NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default ProductNavbar
