import { render, screen, fireEvent }
from "@testing-library/react";

import ConfirmModal
from "../components/ConfirmModal";

describe("ConfirmModal Component", () => {

  test(
    "renders modal when open",
    () => {

      render(

        <ConfirmModal
          isOpen={true}
          message="Delete booking?"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />

      );

      expect(
        screen.getByText(
          "Delete booking?"
        )
      ).toBeInTheDocument();

    }
  );

  test(
    "calls confirm function",
    () => {

      const mockConfirm =
        jest.fn();

      render(

        <ConfirmModal
          isOpen={true}
          message="Delete booking?"
          onConfirm={mockConfirm}
          onCancel={jest.fn()}
        />

      );

      fireEvent.click(
        screen.getByText(
          "Confirm"
        )
      );

      expect(
        mockConfirm
      ).toHaveBeenCalled();

    }
  );

  test(
    "calls cancel function",
    () => {

      const mockCancel =
        jest.fn();

      render(

        <ConfirmModal
          isOpen={true}
          message="Delete booking?"
          onConfirm={jest.fn()}
          onCancel={mockCancel}
        />

      );

      fireEvent.click(
        screen.getByText(
          "Cancel"
        )
      );

      expect(
        mockCancel
      ).toHaveBeenCalled();

    }
  );

});
