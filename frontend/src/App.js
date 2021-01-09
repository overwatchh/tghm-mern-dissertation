import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className="py-3">
          <h1>Wel come to TGHM</h1>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
