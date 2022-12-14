import React from 'react';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ScoopOptions = ({ name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const currentValue = e.target.value;
    //make sure we're using a number and not a string to validate
    const currentValueFloat = parseFloat(currentValue);
    const valueIsValid =
      0 <= currentValueFloat && currentValueFloat < 11 && Math.floor(currentValueFloat) === currentValueFloat;

    //valdiate
    setIsValid(valueIsValid);
    if (isValid) updateItemCount(name, e.target.value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} stytle={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3030${imagePath}`} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs='6' style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: 'left' }}>
          <Form.Control type='number' defaultValue={0} onChange={(e) => handleChange(e)} isInvalid={!isValid} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOptions;
