<template>
  <h1>메인 페이지</h1>
  <div class="main">
    <div
      id="carouselExampleInterval"
      class="carousel slide"
      data-bs-carousel="carousel"
      style="width: 100%"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
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
            data-bs-interval="5000"
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
            data-bs-interval="5000"
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
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <!-- <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/we_ele.jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="@/assets/family.jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="@/assets/nyambok.jpg" class="d-block w-100" alt="..." />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div> -->

  <!-- <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/we_ele.jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="@/assets/nyambok.jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="@/assets/we_ele.jpg" class="d-block w-100" alt="..." />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div> -->
</template>

<script setup>
import { onMounted } from "vue";

const car = document.querySelector("#carouselExampleInterval");
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
