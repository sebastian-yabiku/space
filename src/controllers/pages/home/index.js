import leaflet from "leaflet";
import * as moment from "moment";
import json from "./space.json";

export default {
  name: "home",
  props: {
    msg: String
  },
  mixins: [],
  components: {},
  data() {
    return {
      name: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    valueColor(value) {
      return value <= 2
        ? "blue"
        : value > 2 && value <= 4
        ? "green"
        : value > 4 && value <= 6
        ? "yellow"
        : value > 6
        ? "red"
        : "";
    },
    handlerStyle(feature) {
      let color = "";
      const {
        properties: { values }
      } = feature || {};

      if (values.length) {
        color = this.valueColor(values[0].value);
      }

      return { color };
    },
    timeBetweenDays(values) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const nowDate = moment([year, month, day]);
      const wasDate = values[0].date_stamp.split("-").map(function(item) {
        return parseInt(item, 10);
      });
      const wasDateMoment = moment([wasDate]);

      return nowDate.diff(wasDateMoment, "days");
    },
    handlerPopup(layer) {
      const {
        feature: { properties }
      } = layer;

      const { unit } = properties;
      const { values } = properties;

      const {
        name,
        state: { variety },
        state: { year_of_planting: year },
        state: { area }
      } = unit;

      const dataObject = {
        date: values.length
          ? `${this.timeBetweenDays(values)} dias`
          : "Sin Dato",
        name: `Lote ${name}`,
        detail: {
          variety,
          year,
          area: `${area} Ha`
        }
      };

      const templateString = `<div class="popup">
        <div class="popup__data"><b>${dataObject.date}</b></div>
        <div class="popup__lote">${dataObject.name}</div>
        <ul class="popup__detail">
          <li>
            <span>Variedad:</span>${dataObject.detail.variety}
          </li>
          <li>
            <span>Año:</span> ${dataObject.detail.year}
          </li>
          <li>
            <span>Area:</span> ${dataObject.detail.year}
          </li>
        </ul>
      </div>`;

      return templateString;
    },
    initMap() {
      const map = leaflet.map("map");

      leaflet
        .geoJSON(json, {
          style: this.handlerStyle
        })
        .bindPopup(this.handlerPopup)
        .addTo(map);

      leaflet
        .tileLayer(
          "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3lhYmlrdSIsImEiOiJjanJ0c3AwNjQwMW90NDNsNWxvMXlsOWIwIn0.pE6xBMNgorj7Btz-r3jlVw",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox.satellite",
            accessToken: "your.mapbox.access.token"
          }
        )
        .addTo(map);

      map.setView(
        leaflet.GeoJSON.coordsToLatLng(
          json.features[3].geometry.coordinates[0][4]
        ),
        15.5
      );
    }
  },
  created() {},
  mounted() {
    this.initMap();
  }
};
