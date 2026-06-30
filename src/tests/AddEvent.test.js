import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddEvent from "../pages/AddEvent";
import { addEvent } from "../services/eventService";
import { toast } from "react-toastify";

const mockNavigate = jest.fn();

jest.mock("../services/eventService");

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AddEvent Component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fillForm = () => {

    fireEvent.change(
      screen.getByPlaceholderText("Enter event title"),
      {
        target: {
          value: "Music Fest",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter event description"),
      {
        target: {
          value: "Live Concert",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter location"),
      {
        target: {
          value: "Delhi",
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/Event Date/i),
      {
        target: {
          value: "2026-08-15T18:30",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter total seats"),
      {
        target: {
          value: "100",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter available seats"),
      {
        target: {
          value: "100",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter price"),
      {
        target: {
          value: "500",
        },
      }
    );
  };

  test("renders Add Event form", () => {

    render(
      <MemoryRouter>
        <AddEvent />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: /Add Event/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter event title")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter event description")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter location")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/Event Date/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter total seats")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter available seats")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter price")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /Add Event/i,
      })
    ).toBeInTheDocument();
  });

  test("updates input fields correctly", () => {

    render(
      <MemoryRouter>
        <AddEvent />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter event title"),
      {
        target: {
          value: "Music Fest",
        },
      }
    );

    expect(
      screen.getByPlaceholderText("Enter event title")
    ).toHaveValue("Music Fest");
  });

  test("submits the form successfully", async () => {

    addEvent.mockResolvedValue({
      data: "Event Added Successfully",
    });

    render(
      <MemoryRouter>
        <AddEvent />
      </MemoryRouter>
    );

    fillForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Add Event/i,
      })
    );

    await waitFor(() => {

      expect(addEvent).toHaveBeenCalledTimes(1);

      expect(addEvent).toHaveBeenCalledWith({
        title: "Music Fest",
        description: "Live Concert",
        location: "Delhi",
        eventDate: "2026-08-15T18:30",
        totalSeats: "100",
        availableSeats: "100",
        price: "500",
      });

      expect(toast.success).toHaveBeenCalledWith(
        "Event Added Successfully"
      );

      expect(mockNavigate).toHaveBeenCalledWith(
        "/events"
      );

    });
  });

  test("shows error toast when API fails", async () => {

    addEvent.mockRejectedValue({
      response: {
        data: "Failed to add event",
      },
    });

    render(
      <MemoryRouter>
        <AddEvent />
      </MemoryRouter>
    );

    fillForm();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Add Event/i,
      })
    );

    await waitFor(() => {

      expect(addEvent).toHaveBeenCalledTimes(1);

      expect(toast.error).toHaveBeenCalledWith(
        "Failed to add event"
      );

    });
  });

});