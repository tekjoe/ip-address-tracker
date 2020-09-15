const form = document.querySelector(".form");
const ipInput = document.getElementById("ipInput");
const skeletons = document.querySelectorAll(".skeleton");

const ipAddress = document.getElementById("ip");
const city = document.getElementById("location");
const tz = document.getElementById("timezone");
const isp = document.getElementById("isp");

const accessToken =
  "pk.eyJ1IjoidGVram9lIiwiYSI6ImNrNTRmam1oMzBpd2YzZXBuNjBndDc2ZnUifQ.wjFDugqNW99oTEt_s8S7sA";

const ipToken = "97463b4a4a65f7";

const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

const map = L.map("map", {
  zoomControl: false,
  center: [42.990716, -87.900571],
  zoom: 15,
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

const handleSubmit = (e) => {
  e.preventDefault();
  validateInput();
};

const validateInput = () => {
  if (ipRegex.test(ipInput.value)) {
    fetch(`http://ipinfo.io/${ipInput.value}?token=97463b4a4a65f7`)
      .then((res) => res.json())
      .then((data) => {
        updateLayout(data);
        const { loc } = data;
        const coords = loc.split(",");
        return coords;
      })
      .then((coords) => {
        L.marker(coords).addTo(map);
        map.flyTo(coords);
      });
  } else {
    fetch(`http://ipinfo.io?token=97463b4a4a65f7`)
      .then((res) => res.json())
      .then((data) => {
        updateLayout(data);
        const { loc } = data;
        const coords = loc.split(",");
        return coords;
      })
      .then((coords) => {
        L.marker(coords).addTo(map);
        map.flyTo(coords);
      });
  }
};

const updateLayout = (data) => {
  const { city: cityName, ip, timezone, org } = data;
  skeletons.forEach((skeleton) => (skeleton.style.display = "none"));
  city.innerText = cityName;
  ipAddress.innerText = ip;
  tz.innerText = timezone;
  isp.innerText = org;
};

form.addEventListener("submit", handleSubmit);
