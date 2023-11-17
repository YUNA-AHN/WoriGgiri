import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useSignStore = defineStore("sign", () => {
  // const API_URL = "http://127.0.0.1:8000";

  const token = ref(null);

  const logIn = (payload) => {
    // const data = {
    //   username: payload.username,
    //   password: payload.password,
    // };
    const username = payload.username;
    const password = payload.password;
    console.log(username);
    console.log(password);
    axios({
      method: "post",
      url: `http://localhost:8000/dj-rest-auth/login/`,
      data: {
        username,
        password,
      },
    })
      .then((response) => {
        token.value = response.data.key;
        console.log(response.data);
        // alert("로그인 성공");
      })
      .catch((error) => {
        // alert("잘못 된 접근 방식입니다.");
        console.log(error);
      });
  };

  return { token, logIn };
});
