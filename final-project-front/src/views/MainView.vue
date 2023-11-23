<template>
  <h1>
    <span>우</span>
    <span>리</span>
    <span>끼</span>
    <span>리</span>
  </h1>
  <div class="main-container">
    <div class="main">
      <div
        id="carouselExampleInterval"
        class="carousel slide"
        data-bs-carousel="carousel"
        style="width: 100%"
      >
        <div class="carousel-indicators">
          <button
            id="btn-indi"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            id="btn-indi"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            id="btn-indi"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div style="display: flex; justify-content: center">
          <div class="carousel-inner">
            <div
              class="carousel-item active"
              data-bs-interval="2000"
              style="width: 100%; height: 700px"
            >
              <img
                src="@/assets/we_ele.jpg"
                alt="..."
                style="width: 100%; height: 100%"
              />
            </div>
            <div
              class="carousel-item"
              data-bs-interval="2000"
              style="width: 100%; height: 700px"
            >
              <img
                src="@/assets/nyambok.jpg"
                style="width: 100%; height: 100%"
                alt="..."
              />
            </div>
            <div
              class="carousel-item"
              data-bs-interval="2000"
              style="width: 100%; height: 700px"
            >
              <img
                src="@/assets/family.jpg"
                style="width: 100%; height: 100%"
                alt="..."
              />
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          style="background-color: rgba(40, 40, 40, 0.4); width: 100px"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          style="background-color: rgba(40, 40, 40, 0.4); width: 100px"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
  <div style="height: 2000px; width: 100%">
    우리끼리만 이용하고싶은 커뮤니티 금융 상품 검색 특화 커뮤니티
  </div>
</template>

<script setup>
const car = document.querySelector("#carouselExampleInterval");
</script>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-family: "Orbit", sans-serif;
}
h1 {
  text-align: center;
  font-weight: 900;
  font-size: 70px;
  text-decoration: red;
  margin-bottom: 30px;
}
h1 > span {
  margin: 0px 20px;
  text-shadow: 4px 4px 4px rgba(50, 60, 120, 0.3);
  color: skyblue;
  -webkit-text-stroke: 1px cornflowerblue;
}

#btn-indi {
  width: 65px;
  height: 15px;
  border-radius: 50px;
  border: 1px solid lightgray;
  margin-bottom: 20px;
}
.main-container {
  display: flex;
  justify-content: center;
}
.main {
  width: 1500px;
}
</style>
