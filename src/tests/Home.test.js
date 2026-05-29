import {render,screen} from "@testing-library/react";

import Home from "../pages/Home";

describe( "Home Component", () => {

    test(
      "renders welcome heading", () => {

        render(<Home />);

        const heading = screen.getByText( /welcome to event booking system/i);

        expect(heading).toBeInTheDocument();
      }
    );

    test(
      "renders tagline", () => {

        render(<Home />);

        const text = screen.getByText(/book events easily online/i);

        expect(text).toBeInTheDocument();
      }
    );
  }
);