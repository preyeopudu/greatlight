import axios from "axios";

// const path="http://192.168.43.108:5000"
const path = "https://greatlight1.herokuapp.com";

export const userSecret = async (user, secret) => {
  const result = await axios
    .post(`${path}/${user}/secret`, secret)
    .catch((err) => {
      return { error: true };
    });
  return result;
};

export const getAd = async () => {
  const result = await axios.get(`${path}/ads`).catch((err) => {
    console.log(`error ${err}`);
    return { error: true };
  });
  console.log(result);
  return result;
};

export const getUser = async (user) => {
  const result = await axios.get(`${path}/user/${user}`).catch((err) => {
    return { error: true };
  });
  return result;
};

export const getBonus = async (user) => {
  const result = await axios.post(`${path}/${user}/claim`).catch((err) => {
    return { error: true };
  });
  return result;
};

export const notify = async (user) => {
  const result = await axios.post(`${path}/${user}/notify`).catch((err) => {
    return { error: true };
  });
  return result;
};

export const userWithdraw = async (user, withdraw) => {
  const result = await axios
    .post(`${path}/${user}/withdraw`, withdraw)
    .catch((err) => {
      return { error: true };
    });
  return result;
};

export const cryptoWithdraw = async (user, withdraw) => {
  const result = await axios
    .post(`${path}/${user}/crypto`, withdraw)
    .catch((err) => {
      return { error: true };
    });
  return result;
};

export const transfer = async (user, data) => {
  const result = await axios
    .post(`${path}/${user}/transfer`, data)
    .catch((err) => {
      return { error: true };
    });
  console.log(result);
  return result;
};

export const getNotification = async () => {
  const result = await axios.get(`${path}/notifications`).catch((err) => {
    return { error: true };
  });
  return result;
};
