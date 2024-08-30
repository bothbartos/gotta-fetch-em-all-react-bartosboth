import {render, screen} from "@testing-library/react";
import App from "../App";

test("Render main page", ()=>{
    render(<App />);
    const element = screen.getByText(/Choose Location/)
    expect(element).toBeInTheDocument();
})
