import { ref, computed, onUpdated, onMounted } from "vue";
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

    const user = ref(null);

    const saveInfo = () => {
      axios({
        method: "get",
        url: `${API_URL}/accounts/`,
        headers: {
          Authorization: `Token ${token.value}`,
        },
      })
        .then((res) => {
          console.log(res.data);
          user.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const logIn = (payload) => {
      username.value = payload.username;
      password.value = payload.password;

      axios({
        method: "post",
        url: `${API_URL}/dj-rest-auth/login/`,
        data: {
          username: username.value,
          password: password.value,
        },
      })
        .then((response) => {
          token.value = response.data.key;
          console.log(response.data);
          saveInfo();

          window.alert(`환영합니다. ${username.value} 님!`);
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
      axios({
        method: "post",
        url: `${API_URL}/dj-rest-auth/logout/`,
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
          localStorage.removeItem("sign");
          // 로그아웃 시 로컬스토리지를 비우고 새로고침하여 사용자 인증상태 갱신
          router.go(0);
          router.push({ name: "main" });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      token,
      logIn,
      isLogin,
      logout,
      username,
      password,
      API_URL,
      user,
      saveInfo,
    };
  },
  { persist: true }
);
