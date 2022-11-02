import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

describe('OrderEntry tests', () => {
  //test.only solo ejecuta ese test
  //test.skip salta ese test
  test('Handle errors for scoops and topping routes', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.status(500))),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500)))
    );

    render(<OrderEntry />);
    // const alerts = await screen.findAllByRole('alert');
    // expect(alerts).toHaveLength(2);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);
    });
  });
});
