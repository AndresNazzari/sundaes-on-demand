import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';

//format number as currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimunFractionDigits: 2,
  }).format(amount);
}

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider

function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
  }

  return contextValue;
}

const calculateSubtotal = (optionType, optionCounts) => {
  const countsArray = Object.values(optionCounts[optionType]);
  const optionCount = countsArray.reduce((total, value) => Number(total) + Number(value), 0);
  return optionCount * pricePerItem[optionType];
};

function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    //setter: updateOptionCount
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };
      //update option count for this item with the new value
      newOptionCounts[optionType][itemName] = newItemCount;
      // update the state with the updated copy
      setOptionCounts(newOptionCounts);
    }

    //getter: object containing option counts for scoops and toppings, subtotals and totals
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}

export { OrderDetailsProvider, useOrderDetails };
