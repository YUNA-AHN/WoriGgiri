import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";

export const useSignStore = defineStore(
  "sign",
  () => {
    const API_URL = "http://127.0.0.1:8000";

    const router = useRouter();

    const token = ref(null);
    const username = ref(null);
    const password = ref(null);

    const logIn = (payload) => {
      // const data = {
      //   username: payload.username,
      //   password: payload.password,
      // };
      username.value = payload.username;
      password.value = payload.password;
      // console.log(username);
      // console.log(password);
      axios({
        method: "post",
        url: `http://localhost:8000/dj-rest-auth/login/`,
        data: {
          username: username.value,
          password: password.value,
        },
      })
        .then((response) => {
          token.value = response.data.key;
          console.log(response.data);
          window.alert("로그인 성공");
          router.push({ name: "main" });
        })
        .catch((error) => {
          window.alert("잘못 된 접근 방식입니다.");
          username.value = null;
          password.value = null;
          console.log(error);
        });
    };

    const isLogin = computed(() => {
      if (token.value === null) {
        return false;
      } else {
        return true;
      }
    });

    const logout = () => {
      // username.value = payload.username;
      // password.value = payload.password;
      axios({
        method: "post",
        url: `http://127.0.0.1:8000/dj-rest-auth/logout/`,
        data: {
          username: username.value,
          password: password.value,
        },
        headers: {
          Authorization: `Token ${token.value}`,
        },
      })
        .then((response) => {
          alert("로그아웃 되었습니다!");
          username.value = null;
          password.value = null;
          token.value = null;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return { token, logIn, isLogin, logout, username, password, API_URL };
  },
  { persist: true }
);
