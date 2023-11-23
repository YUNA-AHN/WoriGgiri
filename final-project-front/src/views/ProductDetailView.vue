<template>
  <h1>상품 상세 정보</h1>
  <div class="product-info">
    <!-- {{ product }} -->
    <div>
      <span class="sub-title">공시 제출월</span>
      <span class="sub-detail">{{
        product?.fin_co_subm_day.substring(0, 6)
      }}</span>
    </div>
    <div>
      <span class="sub-title">금융 회사명</span>
      <span class="sub-detail">{{ product?.kor_co_nm }}</span>
    </div>
    <div>
      <span class="sub-title">상품명</span>
      <span class="sub-detail">{{ product?.fin_prdt_nm }}</span>
    </div>
    <div>
      <span class="sub-title">가입 제한</span>
      <span class="sub-detail">{{ product?.join_deny }}</span>
    </div>
    <div>
      <span class="sub-title">가입 방법</span>
      <span class="sub-detail">{{ product?.join_way }}</span>
    </div>
    <div>
      <span class="sub-title"> 우대 조건 </span>
      <span class="sub-detail">{{ product?.mtrt_int }}</span>
    </div>
    <p></p>
    <p></p>
    <p></p>
    <div @click="join(product)" class="btn">가입하기</div>
  </div>

  <!-- 
    가입하기 기능 -> 로그인 유저의 정보 테이블에 현재 상세페이지의 상품 정보를 저장
   -->
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { useSignStore } from "@/stores/sign";
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

const store = useProductsStore();
const signStore = useSignStore();
const route = useRoute();
const router = useRouter();

const productCd = route.params.fin_prdt_cd;

const product = computed(() => {
  return store.deposit_products?.filter(
    (product) => product.fin_prdt_cd === productCd
  )[0];
});

const user = computed(() => {
  return signStore.user;
});

console.log(typeof user.value.financial_products);

const join = () => {
  const data = {
    // username: user.value.username,
    email: user.value?.email,
    financial_products: user.value?.financial_products,
    age: user.value?.age,
    money: user.value?.money,
    salary: user.value?.salary,
    nickname: user.value?.nickname,
  };
  if (
    user.value.financial_products !== null &&
    user.value.financial_products.length !== ""
  ) {
    console.log(user.value.financial_products);
    console.log([user.value.financial_products].join(","));
    if (
      [user.value.financial_products]
        .join(",")
        .includes(
          store.deposit_products?.filter(
            (product) => product.fin_prdt_cd === productCd
          )[0].fin_prdt_nm
        )
    ) {
      alert("이미 존재하는 상품입니다.");
      return;
    } else {
      console.log("머임");
      data.financial_products =
        user.value.financial_products +
        store.deposit_products?.filter(
          (product) => product.fin_prdt_cd === productCd
        )[0].fin_prdt_nm +
        ", ";
    }
  } else {
    data.financial_products =
      store.deposit_products?.filter(
        (product) => product.fin_prdt_cd === productCd
      )[0].fin_prdt_nm + ", ";
  }

  if (user.value.email !== null && user.value.email !== "") {
    data.email = user.value.email;
  }
  if (user.value.age !== null && user.value.age !== "") {
    data.age = user.value.age;
  }
  if (user.value.nickname !== null && user.value.nickname !== "") {
    data.nickname = user.value.nickname;
  }
  if (user.value.money !== null && user.value.money !== "") {
    data.money = user.value.money;
  }
  if (user.value.salary !== null && user.value.salary !== "") {
    data.salary = user.value.salary;
  }
  axios({
    method: "put",
    url: "http://127.0.0.1:8000/accounts/update/",
    data: data,
    headers: {
      Authorization: `Token ${signStore.token}`,
    },
  })
    .then((response) => {
      console.log(data);
      alert("가입 완료 되었습니다.");
      signStore.saveInfo();
      // router.push({ name: "profile" });
    })
    .catch((error) => {
      console.log(data);
      console.log(signStore.token);
      console.log(error);
      alert("이미 가입한 상품입니다.");
    });
};

// onMounted(() => {
//   axios({
//     method: "get",
//     url: `http://127.0.0.1:8000/accounts/`,
//     headers: {
//       Authorization: `Token ${signStore.token}`,
//     },
//   })
//     .then((res) => {
//       console.log(res.data);
//       user.value = res.data;
//       username.value = user.value.username;
//       email.value = user.value.email;
//       nickname.value = user.value.nickname;
//       age.value = user.value.age;
//       money.value = user.value.money;
//       salary.value = user.value.salary;
//       console.log(financial_products.value);
//       if (
//         financial_products.value !== null &&
//         financial_products.value !== `${[]}` &&
//         user.value.financial_products !== null
//       ) {
//         console.log(user.value.financial_products);
//         financial_products.value = user.value.financial_products.split(",");
//       }

//       // financial_products.append(financial_product);
//       // if (financial_products.value.length >= 1) {
//       //   financial_products.value = financial_products.value.join(",");
//       // }
//       console.log(financial_products.value);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
</script>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-family: "Orbit", sans-serif;
  font-weight: bolder;
}
.product-info * {
  font-size: 18px;
}

h1 {
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 5px rgba(13, 172, 220, 0.7) solid;
}

.product-info div {
  margin-bottom: 40px;
  display: flex;
}

.sub-title {
  display: block;
  width: 150px;
}
.sub-detail {
  margin: 0px 0px 0px 50px;
  width: 100%;
}
</style>
