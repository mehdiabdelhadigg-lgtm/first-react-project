import { useEffect, useState } from "react";
import { getProductById } from "../data/products";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
    const {cartItem, addToCart} = useCart();
  

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (!foundProduct) {
      navigate("/");
      return;
    } 
   
    setProduct(foundProduct);
    
  }, [id]);

 if (!product ) {
        return <h1>loading. . . </h1>;
    }
    const productInCart=cartItem.find((item)=>item.id===product.id);
  const quantity=productInCart ? `(${productInCart.quantity})` : "";
  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>{" "}
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">{product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button className="btn btn-primary" onClick={() => addToCart(product.id)}>
              Add to Cart
            </button>
            <p>Quantity: {quantity }</p>
          </div>
        </div>
      </div>
    </div>
  );
}
