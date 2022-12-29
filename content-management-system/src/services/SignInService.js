import axios from "../axios";

export const fetchUser = async (params) => {
  const promise = new Promise((resolve, reject) => {
    axios
      .get("user/" + params.username) // 20s
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  });

  return await promise;
};
