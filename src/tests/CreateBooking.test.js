import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateBooking from "../pages/CreateBooking";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    eventId: "1"
  }),
  useNavigate: () => jest.fn()
}));

describe("CreateBooking Page", () => {

  test("renders booking form", () => {

    render(
      <MemoryRouter>
        <CreateBooking />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Book Seats")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Number of Seats")
    ).toBeInTheDocument();

  });

});