import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import App from "../App";
import ListElement from "../Components/ListElement";

beforeEach(()=>{
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({areas: ["Area 1", "Area 2"]}),
        })
    );
});

afterEach(()=>{
    jest.clearAllMocks();
})

describe("ListElement Component", () => {
    const props = {
        text: "Test Location",
        url: "https://pokeapi.co/api/v2/location/test-location",
        setData: jest.fn(),
        isAreasShown: false,
        setIsAreasShown: jest.fn(),
        setAreas: jest.fn(),
        setAreaSelected: jest.fn(),
    };

    test("Render correctly with provided text", () => {
        render(<ListElement {...props} />);
        const element = screen.getByText(/test location/i);
        expect(element).toBeInTheDocument();
    });


    test("Fetches data and updates state on click when areas are not shown", async () => {
        render(<ListElement {...props} />);

        const listItem = screen.getByText(/test location/i);
        fireEvent.click(listItem);

        expect(global.fetch).toHaveBeenCalledWith(props.url);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(props.url);
            expect(props.setData).toHaveBeenCalledWith(["Area 1", "Area 2"]);
            expect(props.setIsAreasShown).toHaveBeenCalledWith(true);
            expect(props.setAreas).toHaveBeenCalledWith(["Area 1", "Area 2"]);
        });
    });

    test("Fetches data and updates state on click when areas are already shown", async () => {
        const updatedProps = { ...props, isAreasShown: true };
        render(<ListElement {...updatedProps} />);

        const listItem = screen.getByText(/test location/i);
        fireEvent.click(listItem);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(updatedProps.url);
            expect(updatedProps.setAreas).toHaveBeenCalledWith({areas: ["Area 1", "Area 2"]});
            expect(updatedProps.setAreaSelected).toHaveBeenCalledWith(true);
        });
    });
});