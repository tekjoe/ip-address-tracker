const form = document.querySelector(".form");
const ipAddress = document.getElementById("ipAddress");
const skeletons = document.querySelectorAll(".skeleton");

const ip = document.getElementById("ip");
const city = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

const map = L.map("map", {
  zoomControl: false,
  center: [42.990716, -87.900571],
  zoom: 15,
});

const accessToken =
  "pk.eyJ1IjoidGVram9lIiwiYSI6ImNrNTRmam1oMzBpd2YzZXBuNjBndDc2ZnUifQ.wjFDugqNW99oTEt_s8S7sA";

const ipToken = "97463b4a4a65f7";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`http://ipinfo.io/${ipAddress.value}?token=97463b4a4a65f7`)
    .then((res) => res.json())
    .then((data) => {
      const { loc } = data;
      const coords = loc.split(",");
      skeletons.forEach((skeleton) => (skeleton.style.display = "none"));
      city.innerText = data.city;
      ip.innerText = data.ip;
      timezone.innerText = data.timezone;
      isp.innerText = data.org;
      L.marker(coords).addTo(map);
      map.flyTo(coords);
    });
});

L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
  {
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,

    accessToken,
  }
).addTo(map);
