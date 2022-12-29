import axios from "../axios";

export const fetchPosts = async () => {
  const promise = new Promise((resolve, reject) => {
    axios
      .get('post') // 20s
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  });

  return await promise;
};

export const addPost = async (payload) => {
  const promise = new Promise((resolve, reject) => {
    axios
      .post("post",payload) // 20s
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  });

  return await promise;
};


export const updatePost = async (payload) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put("post",payload) // 20s
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          console.log("err" + err);
        });
    });
  
    return await promise;
  };

  export const deletePost = async (id) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .delete("post/"+id) // 20s
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          console.log("err" + err);
        });
    });
  
    return await promise;
  };
