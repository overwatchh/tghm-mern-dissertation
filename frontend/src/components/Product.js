import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button, Form, Badge } from "react-bootstrap";
import Rating from "./Rating";
import { addToCart, removeFromCart } from "../actions/cartActions";
const Product = ({ product }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const isProductInCart = cartItems.find(
    (item) => item.product === product._id
  );
  const qtyInCart = isProductInCart
    ? cartItems.find((item) => item.product === product._id).qty
    : 1;
  const [qty, setQty] = useState(qtyInCart);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
  };
  const removeFromCartHandler = () => {
    dispatch(removeFromCart(product._id));
    setQty(1);
  };
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={`/${product.image}`} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">{product.name}</Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Text>
        <Card.Text as="h3">
          <span>$</span>
          <CurrencyFormat
            value={product.price}
            displayType="text"
            thousandSeparator={true}
          />
        </Card.Text>
        <Card.Text as="div" className="d-flex">
          <Form.Control
            className="text-center"
            type="number"
            placeholder="Số lượng"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          ></Form.Control>
          <Button
            onClick={removeFromCartHandler}
            className={`btn btn-light ${
              !isProductInCart ? "not-allow text-muted" : "text-danger"
            }`}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button
          className={`btn-block ${isProductInCart ? "btn-danger" : ""}`}
          type="button"
          disabled={product.countInStock === 0}
          onClick={addToCartHandler}
        >
          {isProductInCart && qty === qtyInCart
            ? "In cart"
            : isProductInCart && qty !== qtyInCart
            ? "Confirm"
            : "Add to cart"}
          <Badge className="ml-2" pill variant="light">
            {isProductInCart ? qtyInCart : ""}
          </Badge>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Product;
