import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Order phases tests', () => {
  test.skip('Order phases for happy path', async () => {
    //render app
    render(<App />);

    //add ice cream scoop and toppings
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '3');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox);

    //find and click order summary button
    const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i });
    userEvent.click(orderSummaryButton);

    //check summary information based on order
    const summaryHeading = screen.getByRole('heading', { name: /order summary/i });
    expect(summaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' });
    expect(toppingsHeading).toBeInTheDocument();

    //check summary option items
    expect(screen.getByText('3 Vanilla')).toBeInTheDocument();
    expect(screen.getByText('Cherries')).toBeInTheDocument();

    //accept terms and condictions and click button to confirm order
    const tcCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    userEvent.click(tcCheckbox);

    const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });
    userEvent.click(confirmOrderButton);

    //Expect "Loading to show"
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    //confirm order number on confirmation page
    //this is async because is a POST to server
    const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i });
    expect(thankYouHeader).toBeInTheDocument();

    //expect that loading has removed
    const notLoading = screen.queryByText(/loading/i);
    expect(notLoading).not.toBeInTheDocument();

    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    //click "new order" button on confirmation page
    const newOrderButton = screen.getByRole('button', { name: /new order/i });
    userEvent.click(newOrderButton);

    //check that scoops and toppings subtotals have been reset
    const scoopsTotal = screen.getByText('Scoops total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();
    const toppingsTotal = screen.getByText('Toppings total: $0.00');
    expect(toppingsTotal).toBeInTheDocument();

    //wait for items to apear so that Testing Library doesn't get angry about happening after test is over
    await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await screen.findByRole('checkbox', { name: 'Cherries' });
  });

  test('Toppings header is not on summary page if no toppings ordered', async () => {
    //render app
    render(<App />);

    //add ice cream scoop and toppings
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');

    const total = screen.getByText('Scoops total: $6.00', { exact: false });
    expect(total).toBeInTheDocument();
    //find and click order summary button
    // const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i });
    // userEvent.click(orderSummaryButton);

    // //check summary information based on order
    // const summaryHeading = screen.getByRole('heading', { name: /order summary/i });
    // expect(summaryHeading).toBeInTheDocument();

    // const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
    // expect(scoopsHeading).toBeInTheDocument();

    // const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i });
    // expect(toppingsHeading).not.toBeInTheDocument();
  });
});
