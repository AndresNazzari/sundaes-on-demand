import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      //in a real app we would get order details from context
      //and send with post
      .post('http://localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        //TODO: handle error here
      });
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '25%' }}> as per our terms and conditions, nothing will happend now</p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default OrderConfirmation;
