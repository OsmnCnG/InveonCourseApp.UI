import React, { createContext, useEffect, useState } from "react";
import alertify from 'alertifyjs';
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  // const addToCart = (product) => {
  //   setCartItems((prev) => {
  //     const itemExists = prev.find((item) => item.id === product.id);

  //     if (itemExists) {
  //       return prev.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     }
  //     return [...prev, { ...product, quantity: 1 }];
  //   });
  //   alertify.success("Ürün sepete eklendi!");
  // };

  const cartItemsCount = JSON.parse(localStorage.getItem("cartItems"));
  const [itemCount, setItemCount] = useState(cartItemsCount ? cartItemsCount.length : 0);
  
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    setCartItems(savedCartItems ? savedCartItems : []);
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const itemExists = prev.find((item) => item.id === product.id);

      if (itemExists) {
        // const updatedCart = prev.map((item) =>
        //   item.id === product.id
        //     ? { ...item, quantity: item.quantity + 1 }
        //     : item
        // );
        // localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        // return updatedCart;
        alertify.error("Kurs zaten sepette");
        return prev;
      }
      const updatedCart = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      //localStorage.setItem('cartItems', updatedCart);

      alertify.success("Kurs sepete eklendi!");
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setItemCount(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")).length : 0);
      return updatedCart;
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // const completePurchase = async (userId,productId) => {
  //   if (cartItems.length > 0) {
  //     setPurchasedItems((prev) => [...prev, ...cartItems]);
  //     setCartItems([]);
  //     setItemCount(0);
  //     // await addCourseToUser(userId,productId);
  //     await axios.post(
  //       `https://localhost:7055/api/Course/AddCourseToUser?userId=${userId}&productId=${productId}`
  //     );
  //     localStorage.removeItem("cartItems");
  //     alertify.success("Satın alma başarılı!");
  //   } else {
  //     alertify.error("Sepetin boş!");
  //   }
  // };
  const completePurchase = async (userId) => {
    if (cartItems.length > 0) {
      const productIds = cartItems.map((item) => item.id);
  
      try {
        // await axios.post(
        //   `https://localhost:7055/api/Course/AddCoursesToUser?userId=${userId}&productIds=${productIds}`
        // );
        for (const productId of productIds) {
          await axios.post(
            `https://localhost:7055/api/Course/AddCourseToUser?userId=${userId}&productId=${productId}`
          );
        }
        // await axios.post(
        //   "https://localhost:7055/api/Course/AddCoursesToUser",
        //   {
        //     userId: userId,
        //     productIds: productIds,
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
        setPurchasedItems((prev) => [...prev, ...cartItems]);
        setCartItems([]);
        setItemCount(0);
        localStorage.removeItem("cartItems");
  
        alertify.success("Satın alma başarılı!");
      } catch (error) {
        console.error("Satın alma sırasında bir hata oluştu:", error);
        alertify.error("Satın alma işlemi başarısız!");
      }
    } else {
      alertify.error("Sepetin boş!");
    }
  };
  


  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, calculateTotal, completePurchase, itemCount, setItemCount}}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
