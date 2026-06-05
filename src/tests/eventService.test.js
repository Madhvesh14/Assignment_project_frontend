import axios from "axios";
import { getAllEvents } from "../services/eventService";

jest.mock("axios");

describe("Event Service", () => {

  test("get all events", async () => {

    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Concert"
        }
      ]
    });

    const result =
      await getAllEvents();

    expect(result.data.length)
      .toBe(1);
  });

});