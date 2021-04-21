import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FormContainer } from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch login
    dispatch(login(userName, password));
  };
  return (
    <FormContainer>
      <h1>Login</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Don't have an account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Sign up
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
