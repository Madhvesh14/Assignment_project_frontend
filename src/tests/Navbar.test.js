import {render,screen} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";

import Navbar
from "../components/Navbar";

describe("Navbar Component", () => {

    test("renders navbar title", () => {

        render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        );

        const title = screen.getByText(/event booking/i);

        expect(title).toBeInTheDocument();
      }
    );
  }
);