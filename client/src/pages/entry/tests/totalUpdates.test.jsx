import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

describe('Sub totals update tests', () => {
  test('Update scoop subtotal when scoop change', async () => {
    // render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });
    render(<Options optionType='scoops' />);

    // make sure sub total starts out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    //update chocolate scoops to 2 and check the subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopsSubtotal).toHaveTextContent('6.00');
  });

  test('Update toppings subtotal when toppings change', async () => {
    render(<Options optionType='toppings' />);

    //make sure sub total starts out $0.00
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    //update cherries toppings to 1 and check the subtotal
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    //update hot fudge toppings to 2 and check the subtotal
    const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
    userEvent.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('3.00');

    //uncheck cherries and check the subtotal
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');
  });
});

describe('Grand total update tests', () => {
  test('Grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

    //check if grand total starts at $0.00
    expect(grandTotal).toHaveTextContent('0.00');

    //update vanilla scops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    //add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('Grand total updates properly if toppings is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

    //check if grand total starts at $0.00
    expect(grandTotal).toHaveTextContent('0.00');

    //add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    //update vanilla scops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('Grand total updates if item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

    //check if grand total starts at $0.00
    expect(grandTotal).toHaveTextContent('0.00');

    //add cherries
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox);

    //update vanilla scops to 2
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    //remove 1 vanilla scoop
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotal).toHaveTextContent('3.50');

    //remove cherries
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
