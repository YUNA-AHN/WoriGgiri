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
        style="
          width: 100%;
          box-shadow: 1px 3px 30px 10px rgba(150, 180, 240, 0.6);
        "
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
                src="@/assets/home_banner_1.jpg"
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
                src="@/assets/home_banner_2.jpg"
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
                src="@/assets/home_banner_3.jpg"
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
