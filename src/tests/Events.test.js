import {render,screen} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";

import Events from "../pages/Events";

describe( "Events Component", () => {

    test("renders loading text",() => {

        render(
          <BrowserRouter>
            <Events />
          </BrowserRouter>
        );

        const loading = screen.getByText(/loading/i);
          

        expect(loading).toBeInTheDocument();
      }
    );
  }
);