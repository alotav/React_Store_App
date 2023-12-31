/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import "./Card.css";
import CartContext from "../../context/CartContext";
// eslint-disable-next-line no-unused-vars
import CardMessage from "./CardMessage/CardMessage";


const Card = ({ data }) => {
  // llamamos al contexto
  const { addToCart } = useContext(CartContext);
  let { finalPrice, totalPrice, fnShowMessage } = useContext(CartContext);

  // imprimimos el valor de totalprice cuando haya cambiado
  useEffect(() => {
    console.log(`Precio final: ${totalPrice}`);
  }, [totalPrice]);

  return (
    <div className="card">
      <div>
        <img src={data.image} alt="image" />
      </div>
      <p>{data.title}</p>
      <div className="priceAndButtonDiv">
        <p>${data.price}</p>
        <button
          className="btn"
          onClick={() => {
            addToCart(data);
            console.log(data.price);
            finalPrice(data.cantidad, data.price, "+");
            fnShowMessage();
          }}
        >
          Comprar
        </button>
      </div>      
    </div>
  );
};

export default Card;
