import axios from "axios";

// const path="http://192.168.43.108:5000"
const path = "https://greatlight1.herokuapp.com";

export const pull = async () => {
  const result = await axios.get(path).catch((err) => {
    err: true;
  });
  return result;
};

export const getAd = async () => {
  const result = await axios.get(`${path}/`).catch((err) => {
    err: true;
  });
  return result;
};

export const signIn = async (user) => {
  const result = await axios.post(`${path}/signin`, user).catch((err) => {
    return { error: true };
  });
  return result;
};

export const signUp = async (user) => {
  const result = await axios.post(`${path}/signup`, user).catch((err) => {
    return { error: true };
  });
  return result;
};

export const reset = async (user) => {
  const result = await axios.post(`${path}/reset`, user).catch((err) => {
    return { error: true };
  });
  return result;
};
