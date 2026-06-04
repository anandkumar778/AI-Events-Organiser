import axios from "axios";

const API =
  "http://localhost:8000/api/ai";

export const generateTitle =
  async (prompt: string) => {
    const response =
      await axios.post(
        `${API}/title`,
        { prompt }
      );

    return response.data;
  };

export const generateDescription =
  async (prompt: string) => {
    const response =
      await axios.post(
        `${API}/description`,
        { prompt }
      );

    return response.data;
  };