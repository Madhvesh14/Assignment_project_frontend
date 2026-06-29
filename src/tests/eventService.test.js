import API from "../services/api";

import { getAllEvents, getEventById, addEvent, updateEvent, deleteEvent, searchEventsByTitle } from "../services/eventService";

jest.mock("../services/api");

describe("Event Service", () => {

  beforeEach(() => {

    localStorage.setItem(
      "token",
      "abc123"
    );

    jest.clearAllMocks();

  });

  test("getAllEvents should fetch all events", async () => {

    API.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Music Concert"
        }
      ]
    });

    const result =
      await getAllEvents();

    expect(API.get)
      .toHaveBeenCalledWith(
        "/events",
        {
          headers: {
            Authorization:
              "Bearer abc123"
          }
        }
      );

    expect(result.data.length)
      .toBe(1);

  });

  test("getEventById should fetch event by id", async () => {

    API.get.mockResolvedValue({
      data: {
        id: 1,
        title: "Music Concert"
      }
    });

    const result =
      await getEventById(1);

    expect(API.get)
      .toHaveBeenCalledWith(
        "/events/1",
        {
          headers: {
            Authorization:
              "Bearer abc123"
          }
        }
      );

    expect(result.data.id)
      .toBe(1);

  });

  test("addEvent should create event", async () => {

    const eventData = {
      title: "Workshop",
      location: "Bangalore"
    };

    API.post.mockResolvedValue({
      data: "Event Added"
    });

    const result =
      await addEvent(eventData);

    expect(API.post)
      .toHaveBeenCalledWith(
        "/events",
        eventData,
        {
          headers: {
            Authorization:
              "Bearer abc123"
          }
        }
      );

    expect(result.data)
      .toBe("Event Added");

  });

  test("updateEvent should update event", async () => {

    const eventData = {
      title: "Updated Event"
    };

    API.put.mockResolvedValue({
      data: "Event Updated"
    });

    const result =
      await updateEvent(
        1,
        eventData
      );

    expect(API.put)
      .toHaveBeenCalledWith(
        "/events/1",
        eventData,
        {
          headers: {
            Authorization:
              "Bearer abc123"
          }
        }
      );

    expect(result.data)
      .toBe("Event Updated");

  });

  test("deleteEvent should delete event", async () => {

    API.delete.mockResolvedValue({
      data: "Event Deleted"
    });

    const result =
      await deleteEvent(1);

    expect(API.delete)
      .toHaveBeenCalledWith(
        "/events/1",
        {
          headers: {
            Authorization:
              "Bearer abc123"
          }
        }
      );

    expect(result.data)
      .toBe("Event Deleted");

  });

  test("searchEventsByTitle should search events", async () => {

    API.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Music Concert"
        }
      ]
    });

    const result =
      await searchEventsByTitle(
        "Music"
      );

    expect(API.get)
      .toHaveBeenCalledWith(
        "/events/search?title=Music",
        {
          headers: {
            Authorization:
              "Bearer abc123"
          }
        }
      );

    expect(result.data.length)
      .toBe(1);

  });

});