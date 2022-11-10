import { OrderDetailsProvider } from './contexts/OrderDetails';
import Container from 'react-bootstrap/Container';

import OrderEntry from './pages/entry/OrderEntry';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderSummary from './pages/summary/OrderSummary';
import { useState } from 'react';

function App() {
  //order¨hase needs to be "inProgres", "review" or "completed"
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container> {<Component setOrderPhase={setOrderPhase} />} </Container>
    </OrderDetailsProvider>
  );
}

export default App;
