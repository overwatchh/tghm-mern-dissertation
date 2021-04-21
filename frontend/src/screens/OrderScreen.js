import React, { useEffect } from "react";
import { Card, Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //Caculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  if (!loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    );
  }
  const orderId = match.params.id;
  const successPaymentHandler = () => {
    dispatch(payOrder(orderId));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getOrderDetails(orderId));
    }

    if (successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
    }
    // eslint-disable-next-line
  }, [dispatch, successPay, successDeliver]);

  return (
    <>
      <Link to="/admin/orderlist" className="btn btn-light">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Invoice details</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Customer's info</h2>
                  <p>
                    <strong>Customer's name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address} ,
                    {order.shippingAddress.city} ,
                    {order.shippingAddress.postalCode} ,
                    {order.shippingAddress.country}.
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered at {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Chưa giao hàng</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid at {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Details</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Empty invoice</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={`/${item.image}`}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}{" "}
                              </Link>
                            </Col>
                            <Col md={4}>
                              <CurrencyFormat
                                value={item.price}
                                displayType="text"
                                thousandSeparator={true}
                              />{" "}
                              x {item.qty} ={" "}
                              <CurrencyFormat
                                value={item.qty * item.price}
                                displayType="text"
                                thousandSeparator={true}
                              />
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Subtotal total</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Products</Col>
                      <Col>{order.itemsPrice} USD</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping fee</Col>
                      <Col>{order.shippingPrice} USD</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>{order.taxPrice} USD</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>{order.totalPrice} USD</Col>
                    </Row>
                  </ListGroup.Item>
                  {loadingPay && <Loader />}
                  {userInfo && userInfo.isAdmin && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className={`btn btn-block ${
                          order.isPaid ? "btn-success" : "btn-danger"
                        }`}
                        onClick={successPaymentHandler}
                      >
                        Thanh toán{" "}
                        {order.isPaid ? (
                          <i class="fas fa-check-circle"></i>
                        ) : (
                          <i class="far fa-times-circle"></i>
                        )}
                      </Button>
                    </ListGroup.Item>
                  )}
                  {loadingDeliver && <Loader />}
                  {userInfo && userInfo.isAdmin && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className={`btn btn-block ${
                          order.isDelivered ? "btn-success" : "btn-danger"
                        }`}
                        onClick={deliverHandler}
                      >
                        Giao hàng{" "}
                        {order.isDelivered ? (
                          <i class="fas fa-check-circle"></i>
                        ) : (
                          <i class="far fa-times-circle"></i>
                        )}
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
