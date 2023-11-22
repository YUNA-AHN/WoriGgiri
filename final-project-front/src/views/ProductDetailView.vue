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
    <div @click="join" class="btn">가입하기</div>
  </div>

  <!-- 
    가입하기 기능 -> 로그인 유저의 정보 테이블에 현재 상세페이지의 상품 정보를 저장
   -->
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { useSignStore } from "@/stores/sign";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";

const store = useProductsStore();
const signStore = useSignStore();
const route = useRoute();

const productCd = route.params.fin_prdt_cd;

// const filtered = ref(null)
const product = computed(() => {
  // filtered.value = store.deposit_products.filter((product) =>
  // product.fin_prdt_cd === productCd)
  return store.deposit_products?.filter(
    (product) => product.fin_prdt_cd === productCd
  )[0];
});

const join = () => {
  axios({
    method: "post",
    url: `http://127.0.0.1:8000/products/${productCd}/${signStore.username}/`,
  })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// const user = ref();

// const username = ref(null);
// const email = ref(null);

// const nickname = ref(null);
// const age = ref(null);
// const money = ref(null);
// const salary = ref(null);
// const financial_products = [];
// const join = () => {
//   console.log(username.value);

//   const data = {
//     username: username.value,
//     // financial_products: [productCd],
//   };
//   if (email.value !== null && email.value !== "") {
//     data.email = email.value;
//   }
//   if (age.value !== null && age.value !== "") {
//     data.age = age.value;
//   }
//   if (nickname.value !== null && nickname.value !== "") {
//     data.nickname = nickname.value;
//   }
//   if (money.value !== null && money.value !== "") {
//     data.money = money.value;
//   }
//   if (salary.value !== null && salary.value !== "") {
//     data.salary = salary.value;
//   }
//   if (financial_products.length > 0) {
//     // if (financial_products.value.includes(productCd)) {
//     //   alert("이미 가입한 상품입니다.");
//     //   return;
//     // } else {
//     console.log(financial_products);
//     // if (financial_products.value.length >= 1) {
//     financial_products.push(productCd);
//     console.log(financial_products);
//     // financial_products.value = financial_products.value.join(",");
//     // } else {
//     // financial_products.value.push(productCd);
//     // console.log(financial_products.value);
//     // }
//     data.financial_products = financial_products;
//     // }
//   } else {
//     console.log(financial_products);
//     financial_products.push(productCd);
//     data.financial_products = financial_products;
//     // console.log(flattenArray(data.financial_products));
//   }
//   axios({
//     method: "put",
//     url: "http://127.0.0.1:8000/accounts/update/",
//     data: data,
//     headers: {
//       Authorization: `Token ${signStore.token}`,
//     },
//   })
//     .then((response) => {
//       alert("가입 완료 되었습니다.");
//     })
//     .catch((error) => {
//       console.log(data);
//       console.log(signStore.token);
//       console.log(error);
//       alert("이미 가입한 상품입니다.");
//     });
// };

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
//       if (user.value.financial_products !== null) {
//         console.log(user.value.financial_products);
//         financial_products.push(user.value.financial_products);
//       }
//       // if (
//       //   financial_products.value !== null &&
//       //   financial_products.value !== `${[]}` &&
//       //   user.value.financial_products !== null
//       // ) {
//       //   console.log(user.value.financial_products);
//       //   financial_products.value = user.value.financial_products.split(",");
//       // }

//       // financial_products.append(financial_product);
//       // if (financial_products.value.length >= 1) {
//       //   financial_products.value = financial_products.value.join(",");
//       // }
//       console.log(financial_products);
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
