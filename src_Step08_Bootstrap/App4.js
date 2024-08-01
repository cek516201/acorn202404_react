// src/App4.js
import 'bootstrap/dist/css/bootstrap.css'
import 'holderjs'
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function App4() {
    return (
        <Container>
            <h3>card component</h3>
            <Row>
                <Col md={6} lg={3}>
                    <MyCard/>
                </Col>
                <Col md={6} lg={3}>
                    <MyCard/>
                </Col>
                <Col md={6} lg={3}>
                    <MyCard/>
                </Col>
                <Col md={6} lg={3}>
                    <MyCard/>
                </Col>
            </Row>
        </Container>
    );
}

function MyCard() {
    return (
      <Card>
        <Card.Img variant="top" data-src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }

export default App4;