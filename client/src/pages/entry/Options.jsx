import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOptions from './ScoopOptions';
import ToppingOptions from './ToppingOptions';
import Row from 'react-bootstrap/Row';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  //optionType es 'scoops' o 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions;

  const OptionItems = items.map((item) => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{OptionItems}</Row>;
};

export default Options;
