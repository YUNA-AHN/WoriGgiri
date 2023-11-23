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
          // username.value = user.value.username;
          // email.value = user.value.email;
          // nickname.value = user.value.nickname;
          // age.value = user.value.age;
          // money.value = user.value.money;
          // salary.value = user.value.salary;
          // financial_products.value = user.value.financial_products;
          // console.log(salary);
        })
        .catch((err) => {
          console.log(err);
        });
    };

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
          saveInfo();
          // axios({
          //   method: "get",
          //   url: `http://127.0.0.1:8000/accounts/`,
          //   headers: {
          //     Authorization: `Token ${token.value}`,
          //   },
          // })
          //   .then((response) => {
          //     user.value = response.data;
          //     console.log(response.data);
          //     console.log(user.value);
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });

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
