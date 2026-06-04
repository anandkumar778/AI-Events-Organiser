import axios from "axios";

const API =
  "http://localhost:8000/api/bookings";

export const getBookings =
  async () => {
    const response =
      await axios.get(API);

    return response.data;
  };