import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Phương pháp thanh toán</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Chọn phương pháp</Form.Label>
          <Col>
            <Form.Check
              name="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
              type="radio"
              label="Paypal"
              id="PayPal"
            ></Form.Check>
            {/* <Form.Check
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
              type="radio"
              label="Stripe"
              id="Stripe"
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Tiếp tục
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
