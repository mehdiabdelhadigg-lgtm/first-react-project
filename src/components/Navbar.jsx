import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItem } = useCart();
  const totalItems = cartItem.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Shophub 
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="navbar-link">
            cart {totalItems > 0 && <span className="cart-badge">({totalItems})</span>}
          </Link>
        </div>
        <div className="navbar-auth">
          <div className="navbar-auth-links">
            {user ? <div>{user.email} <button onClick={logout} className="btn btn-secondary">Logout</button></div> :  <div className="navbar-auth-links"><Link to="/auth" className="btn btn-secondary">Login</Link>
            <Link to="/auth" className="btn btn-primary ">SignUp</Link></div>}
           

          </div>
        </div>
      </div>
    </nav>
  );
}
