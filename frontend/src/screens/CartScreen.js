import React, { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartTotalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <Link className="btn btn-light my-3" to="/">
          Go back
        </Link>
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty!
            <Link to="/">
              <strong>Shop now! </strong>
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`/${item.image}`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/item/`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    <CurrencyFormat
                      value={item.price}
                      displayType="text"
                      thousandSeparator={true}
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    ></Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="butotn"
                      variant="light"
                      onClick={() => {
                        removeFromCartHandler(item.product);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Total</h2>

              <CurrencyFormat
                value={cartTotalPrice}
                displayType="text"
                thousandSeparator={true}
                renderText={(value) => (
                  <h1 className="text-center text-danger font-weight-bold">
                    {value}
                  </h1>
                )}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Continue
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
