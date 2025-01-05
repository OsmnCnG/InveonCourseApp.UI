import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "reactstrap";
import alertify from "alertifyjs";
import CartContext from "../CartContext";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";

const Card = () => {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal } = useContext(CartContext);
  const {isLoggedIn} = useContext(AuthContext);

  const checkout = () => {

    if(!isLoggedIn){
      return alertify.error("Satın almak için giriş yapın!");
    }

    alertify.success("Ödeme işlemi başlatıldı!");
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Sepetim</h1>
      {cartItems?.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <>
          <Table responsive>
            <thead>
              <tr>
                <th>Kurs</th>
                <th>Fiyat</th>
                {/* <th>Adet</th> */}
                <th>Toplam</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₺{item.price.toFixed(2)}</td>
                  {/* <td>
                    <Button
                      color="secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      color="secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </td> */}
                  <td>₺{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => {
                        removeFromCart(item.id);
                        alertify.success("Kurs sepetten kaldırıldı");
                      }}
                    >
                      Kaldır
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row className="mt-4">
            <Col md={{ size: 4, offset: 8 }}>
              <h4>Toplam: ₺{calculateTotal()}</h4>
              <Link to={"/Payment"} >
                <Button color="primary" block onClick={checkout}>
                  Ödemeye Geç
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Card;
