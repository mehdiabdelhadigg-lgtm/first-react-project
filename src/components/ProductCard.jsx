import { Link  } from "react-router-dom"
import { useCart } from "../context/CartContext";
export default function ProductCard({ product }) {
  const {cartItem, addToCart} = useCart();
  const productInCart=cartItem.find((item)=>item.id===product.id);
  const quantity=productInCart ? `(${productInCart.quantity})` : "";
  return (
         <div className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-card-image"
              />
              <div className="product-card-content">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">${product.price}</p>
                <div className="product-card-actions">
                  <Link className="btn btn-secondary" to={`product/${product.id} `}>view details</Link>
                  <button className="btn btn-primary" onClick={() => addToCart(product.id)}>add to cart {quantity}</button>
                </div>  

              </div>
            </div>
  )}