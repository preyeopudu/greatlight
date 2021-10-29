import axios from "axios";

// const path="http://192.168.43.108:5000"
const path = "https://greatlight1.herokuapp.com";

export const addPlan = async (user, plan) => {
  const result = await axios
    .post(`${path}/${user}/plan/${plan}`)
    .catch((err) => {
      err: true;
    });
  return result;
};
