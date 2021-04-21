import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history, className }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline className={className}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5 mt-2"
        placeholder="Shop now"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2 mt-2 ml-auto"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
