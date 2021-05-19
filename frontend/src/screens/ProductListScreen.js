import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Paginate } from "../components/Paginate";
import Meta from "react-helmet";
import Loader from "../components/Loader";
import { listProducts, deleteProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      //Delete prodcuts
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    //navigate to create product page
    history.push("/admin/product/new");
  };
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    dispatch(listProducts("", pageNumber));

    // eslint-disable-next-line
  }, [dispatch, history, userInfo, successDelete, pageNumber]);
  return (
    <>
      <Meta title="Manage products" />
      <Row className="align-items-center">
        <Col>
          <h1>Products management</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Add
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product._id.substring(0, 3)}...
                    {product._id.substring(
                      product._id.length - 3,
                      product._id.length
                    )}
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}$</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="dark" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
