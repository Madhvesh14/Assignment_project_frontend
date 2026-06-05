import { render, screen, fireEvent }
from "@testing-library/react";

import UpdateBookingModal
from "../components/UpdateBookingModal";

describe(
  "UpdateBookingModal Component",
  () => {

    test(
      "renders modal with current seats",
      () => {

        render(

          <UpdateBookingModal
            currentSeats={5}
            onUpdate={jest.fn()}
            onCancel={jest.fn()}
          />

        );

        expect(
          screen.getByText(
            "Update Booking"
          )
        ).toBeInTheDocument();

        expect(
          screen.getByText(
            "Enter new seat count"
          )
        ).toBeInTheDocument();

        expect(
          screen.getByDisplayValue(5)
        ).toBeInTheDocument();

      }
    );

    test(
      "calls onCancel when Cancel button is clicked",
      () => {

        const mockCancel =
          jest.fn();

        render(

          <UpdateBookingModal
            currentSeats={5}
            onUpdate={jest.fn()}
            onCancel={mockCancel}
          />

        );

        fireEvent.click(

          screen.getByRole(
            "button",
            { name: /cancel/i }
          )

        );

        expect(
          mockCancel
        ).toHaveBeenCalled();

      }
    );

    test(
      "calls onUpdate with updated seat count",
      () => {

        const mockUpdate =
          jest.fn();

        render(

          <UpdateBookingModal
            currentSeats={5}
            onUpdate={mockUpdate}
            onCancel={jest.fn()}
          />

        );

        const input =
          screen.getByDisplayValue(5);

        fireEvent.change(
          input,
          {
            target: {
              value: "10"
            }
          }
        );

        fireEvent.click(

          screen.getByRole(
            "button",
            { name: /update/i }
          )

        );

        expect(
          mockUpdate
        ).toHaveBeenCalledWith(10);

      }
    );

  }
);