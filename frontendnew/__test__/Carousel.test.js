import Carousel from "../src/components/Banner/Carousel"

test('on initial render, the carousel renders is disabled', () => {
    render(<Carousel />)

    screen.debug();
})