<template>
  <div>
    <div class="detail-title">
      <h1>🔍 주변 은행 검색</h1>
    </div>

    <div class="content-map">
      <form @submit.prevent="search" class="search-form">
        <select
          class="form-select"
          name="location1"
          id="location1"
          v-model="mainRegion"
        >
          <option :value="null" selected hidden>시 / 도 를 선택해주세요</option>
          <option v-for="locate1 in store.mainList" :value="locate1">
            {{ locate1 }}
          </option>
        </select>
        <select
          class="form-select"
          name="location2"
          id="location2"
          v-model="subRegion"
        >
          <option :value="null" selected hidden>
            시 / 군 / 구 를 선택해주세요
          </option>
          <option v-for="locate2 in store.subList[mainRegion]">
            {{ locate2 }}
          </option>
        </select>
        <select class="form-select" name="bank" id="bank" v-model="bankKeyword">
          <option :value="null" selected hidden>은행을 선택해주세요</option>
          <option v-for="bank in mapStore.bankList">
            {{ bank }}
          </option>
        </select>
        <input class="btn btn-info" type="submit" value="검색" />
      </form>
      <div id="map" style="width: 70%; height: 600px"></div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "IBM Plex Sans KR", sans-serif;
  font-family: "Orbit", sans-serif;
  font-weight: bolder;
}
h1 {
  padding-bottom: 20px;
  margin-bottom: 30px;
  border-bottom: 5px rgba(13, 172, 220, 0.7) solid;
}
.content-map {
  display: flex;
  justify-content: space-between;
}

.search-form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.search-form * {
  margin: 0px 0px 30px 0px;
  border-color: rgb(119, 185, 252);
}

.select-box {
  height: 35px;
}
.btn {
  padding: 0px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  /* font-weight: bolder; */
  border: rgba(119, 185, 252, 0.1) 1px solid;
  background-color: rgba(119, 185, 252, 0.6);
  color: rgb(80, 80, 80);
}
#map {
  border-radius: 20px;
  border: rgba(13, 172, 220, 0.7) 3px solid;
}
</style>

<script>
import { ref, onMounted } from "vue";

const API_KEY = "8084269e80aa7bddaac7aae0b01aca02";

export default {
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${API_KEY}&libraries=services`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          // center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
          center: new kakao.maps.LatLng(36.107071, 128.419289), // 지도의 중심좌표
          level: 7, // 지도의 확대 레벨
        };
      var keyword = ref("은행");

      // 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);
      map.setMapTypeId(kakao.maps.MapTypeId.USE_DISTRICT);
      var ps = new kakao.maps.services.Places(map);
      ps.keywordSearch(keyword.value, placesSearchCB, {
        useMapBounds: true,
      });

      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          var bounds = new kakao.maps.LatLngBounds();
          for (var i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      }

      // 지도에 마커를 표시하는 함수입니다
      function displayMarker(place) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              "</div>"
          );
          infowindow.open(map, marker);
        });
      }
    },
  },
};
</script>
<script setup>
import { ref } from "vue";
import { useLocationStore } from "@/stores/location";
import { useProductsStore } from "@/stores/products";

const store = useLocationStore();
const mapStore = useProductsStore();
const mainRegion = ref(null);
const subRegion = ref(null);
const bankKeyword = ref(null);

const searchKeyword = ref(null);

const dft = "시 / 도 를 선택해주세요";

const search = () => {
  searchKeyword.value = `${mainRegion.value}+${subRegion.value}+${bankKeyword.value}`;

  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  var mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 7, // 지도의 확대 레벨
    };

  // 지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 장소 검색 객체를 생성합니다
  var ps = new kakao.maps.services.Places();

  // 키워드로 장소를 검색합니다
  ps.keywordSearch(searchKeyword.value, placesSearchCB);

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      var bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  }

  // 지도에 마커를 표시하는 함수입니다
  function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infowindow.open(map, marker);
    });
  }
  console.log(searchKeyword.value);
};
</script>
