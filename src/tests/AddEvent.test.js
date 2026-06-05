import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddEvent from "../pages/AddEvent";

describe("AddEvent Page", () => {

  test("renders add event form", () => {

    render(
      <MemoryRouter>
        <AddEvent />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: /add event/i
      })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Title")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Description")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Location")
    ).toBeInTheDocument();

  });

});