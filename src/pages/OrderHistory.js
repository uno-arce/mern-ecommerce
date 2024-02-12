import { Container, Row, Col } from 'react-bootstrap';
import OrderHistoryView from '../components/OrderHistoryView.js';
import { useState, useEffect } from 'react';

export default function OrderHistory() {
  const [orderHistoryView, setOrderHistoryView] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/my-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {

        const productsArr = data.userOrders.map(product => {
          return(
            <OrderHistoryView key={product._id} productData={product} />
          )
        })  
        setOrderHistoryView(productsArr);
      });
  }, []);

  return (
    <>
      <Container fluid id="cart-header">
        <Row>
          <Col>
            <Container>
              <div className="d-flex flex-column py-5">
                <h2 id='cart-title'>Order History</h2>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container fluid id='order-history-container'>
        <Row>
          <Col>
            <Container className='py-4'>
              {orderHistoryView}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}
