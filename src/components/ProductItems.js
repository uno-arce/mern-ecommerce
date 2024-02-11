import { Button, InputGroup } from 'react-bootstrap';
import { useState, useEffect} from 'react';

export default function ProductItems({ productData, updateTotalAmount, removeFromCart }) {
  const [quantity, setQuantity] = useState(productData.quantity);
  const [image] = useState(productData.image);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);

    updateTotalAmount(productData._id, productData.price, newQuantity);
  };

  const handleRemoveFromCart = () => {
      removeFromCart(productData._id);
  };

  return (
    <>
    <div className="d-flex justify-content-between align-items-center">
      <div className='d-flex'>
        <div className='me-3' style={{ 
                height: '70px',
                width: '70px',
                backgroundImage: `url(${process.env.REACT_APP_API_URL}${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px'
                 }}>
        </div>
        <div>
          <h6>{productData.productName}</h6>
          <InputGroup className="me-3">
            <Button
              id='view-input-group-button'
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity === 1}
            >
              -
            </Button>
            <InputGroup.Text>{quantity}</InputGroup.Text>
            <Button
              id='view-input-group-button'
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </Button>
          </InputGroup>
        </div>
      </div>
      <div className="d-flex">
        <p className='me-2'>₱{productData.price * quantity}</p>
        <Button
          variant="danger"
          size="sm"
          onClick={handleRemoveFromCart}
        >
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    </div>
    <hr/>
    </>
  );
}


