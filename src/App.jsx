import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ProductsSection from "./components/ProductsSection/ProductsSection";
import CartContext from "./context/CartContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Cart from "./components/Cart/Cart";
import axios from "axios";
import PaySection from "./components/Cart/PaymentSection/PaymentSection";
import OnSaleSection from "./components/OnSaleSection/OnSaleSection";
import AboutUs from "./components/AboutUs/AboutUs";
import Footer from "./components/Footer/Footer";
import CardMessage from "./components/Card/CardMessage/CardMessage";

const App = () => {
  // productos
  const [productos, setProductos] = useState([]);
  // context
  const [cart, setCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [showMessage, setShowMessage] = useState(false);
  // let [cantidades, setCantidades] = useState(0);

  ///////////////////////////////////////////////// METODOS CARRITO
  // metodo para agregar item carrito
  // recibimos un item y la cantidad "1" por defecto
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, cantidad: 1 }]);
    }
  };

  // metodo para eliminar item carrito
  // pisamos el cart con el nuevo array filtrado
  const removeItemFromCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem && item.cantidad > 1) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, cantidad: cartItem.cantidad - 1 }
            : cartItem
        )
      );
    }
  };

  // metodo para vaciar carrito
  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
  };

  const fnShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  ///////////////////////////////////////////////// METODOS CALCULO DE PRECIO

  const finalPrice = (cantidad, price, operacion) => {
    setTotalPrice((prevTotalPrice) => {
      if (operacion === "+") {
        return prevTotalPrice + price;
      } else if (operacion === "-" && cantidad > 1) {
        return prevTotalPrice - price;
      }
      // Si no se cumple ninguna condición, devuelve el estado actual sin cambios.
      return prevTotalPrice;
    });
  };

  useEffect(() => {
    // fetch("https://fakestoreapi.com/products")
    //   .then((response) => response.json())
    //   .then((datos) => {
    //     console.log("Fake API");
    //     console.log(datos);
    //     setProductos(datos);
    //   });
    axios
      .get("https://fakestoreapi.com/products")
      .then(function (response) {
        console.log(response);
        setProductos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <div>
        <Header />
        {showMessage && <CardMessage />}
        {/* <CardMessage/> */}
        <CartContext.Provider
          value={{
            cart,
            addToCart,
            removeItemFromCart,
            clearCart,
            finalPrice,
            totalPrice,
            fnShowMessage,
          }}
        >
          <Routes>
            <Route path="/" element={<ProductsSection datos={productos} />} />

            <Route path="/cart/*" element={<Cart />} />
            <Route path="/pay/*" element={<PaySection />} />
            <Route
              path="/sale/*"
              element={<OnSaleSection datos={productos} />}
            />
            <Route path="/aboutus/*" element={<AboutUs />} />
          </Routes>
        </CartContext.Provider>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
