import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOptions from './ScoopOptions';
import ToppingOptions from './ToppingOptions';
import Row from 'react-bootstrap/Row';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilis';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  //optionType es 'scoops' o 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const OptionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{OptionItems}</Row>
    </>
  );
};

export default Options;
