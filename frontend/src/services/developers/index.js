import axios from "axios";

export const getAllDevelopers = async (data) => {
  const response = await axios.get("http://localhost:4000/developers", {
    params: { reqData: JSON.stringify(data) },
  });
  return response.data;
};

export const addDeveloper = async (data) => {
  const response = await axios.post("http://localhost:4000/developers", data);
  return response.data;
};