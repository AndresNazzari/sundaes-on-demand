import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  // const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopArray = Object.entries(orderDetails.scoops);

  const scoopList = scoopArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });
  const hasToppings = Object.keys(orderDetails.toppings).length > 0;

  let toppingsDisplay = null;

  if (hasToppings) {
    // const toppingsArray = Array.from(orderDetails.toopings.keys());
    const toppingsArray = Object.keys(orderDetails.toppings);
    const toppingList = toppingsArray.map((key) => {
      return <li key={key}> {key}</li>;
    });
    toppingsDisplay = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
