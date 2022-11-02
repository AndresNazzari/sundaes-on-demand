import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

describe('Options tests', () => {
  test('Display images for each scoop option from server', async () => {
    // render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });
    render(<Options optionType='scoops' />);

    // find images
    // name de img es el alt, regex $ significa al final del string
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    //se usa getByRole para las que no son async. Se usa findByRole para las que son async
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const altText = scoopImages.map((img) => img.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']); // arrays y objects .toEqual - .toBe para strings y numbers
  });

  test('Display images for each topping option from server', async () => {
    render(<Options optionType='toppings' />);
    // find images
    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
    expect(toppingImages).toHaveLength(3);

    const altText = toppingImages.map((img) => img.alt);
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
  });
});
