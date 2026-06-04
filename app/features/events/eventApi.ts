import axios from "axios";

const API =
  "http://localhost:8000/api/events";

export const getEvents =
  async () => {
    const response =
      await axios.get(API);

    return response.data;
  };

export const createEvent =
  async (data: any) => {
    const response =
      await axios.post(
        API,
        data
      );

    return response.data;
  };