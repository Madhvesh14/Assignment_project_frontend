import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UpdateEvent from "../pages/UpdateEvent";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1"
  }),
  useNavigate: () => jest.fn()
}));

describe("UpdateEvent Page", () => {

  test("renders update event page", () => {

    render(
      <MemoryRouter>
        <UpdateEvent />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: /update event/i
      })
    ).toBeInTheDocument();

  });

});