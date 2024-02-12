import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import ProductItems from '../components/ProductItems.js';
import UserContext from '../UserContext';

import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2';

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/my-cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      setProducts(data.products);
      setTotalAmount(data.totalAmount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateTotalAmount = (productId, productPrice, newQuantity) => {
      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            quantity: newQuantity,
            subTotal: productPrice * newQuantity,
          };
        }
        return product;
      });

      const newTotalAmount = updatedProducts.reduce((acc, product) => acc + product.subTotal, 0);

      // Update state only after mapping and reducing are done
      setProducts(updatedProducts);
      setTotalAmount(newTotalAmount);
    };

  const removeFromCart = async (productId) => {
      try {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/my-cart/remove/${productId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(result => result.json())
        .then(data => {
          if (data) {
            Swal.fire({
              title: "Deleted Successfully",
              icon: "success",
            })
            fetchData();
          } else {
            Swal.fire({
              title: "Delete Failed",
              icon: "error",
            })
          }
        })
      } catch (error) {
        Swal.fire({
          title: "Delete Failed",
          icon: "error",
        })
      }
    };

  const handleUpdateAndCheckout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/my-cart/update-cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ products, totalAmount }),
      });

      const data = await response.json();

      if (data) {
        // Fetch the updated data after the cart is updated
        await fetchData();
        navigate('/cart/checkout');
      } else {
        Swal.fire({
          title: 'Update Failed',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Update Failed',
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    if (user.role === 'User') {
      fetchData();
    }
  }, [user.role]);

  return (
    <>
      <Container fluid id="cart-header">
        <Row>
          <Col>
            <Container>
              <div className="d-flex flex-column py-5">
                <h2 id='cart-title'>My Cart</h2>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container fluid id="cart-container">
        <Row>
          <Col>
            <Container>
              <div className="d-flex flex-column mt-5">
                {products.map((product) => (
                  <ProductItems
                    key={product.productId}
                    productData={product}
                    updateTotalAmount={updateTotalAmount}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>
              <div className='d-flex justify-content-end'>
                <div>
                  <InputGroup>
                    <InputGroup.Text className="bi bi-bag"></InputGroup.Text>
                    <Button onClick={handleUpdateAndCheckout} id='view-input-group-button' 
                    variant='dark'>
                      Checkout
                    </Button>
                    <InputGroup.Text>₱{totalAmount}</InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
