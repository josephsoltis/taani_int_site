import { BaseGauge } from "./E_BaseGauge.js";

// Extend BaseGauge for nav gauge
export class NavGauge extends BaseGauge {
  constructor(config) {
    super(config);
    this.init();
  }

  init() {
    super.init();
  }

  getAxisLabelOptions() {
    return {
      distance: 15,
      color: "#555",
      rotate: "tangential",
      formatter: function (value) {
        if (value == 0) return "N";
        else if (value == 45) return "NE";
        else if (value == 90) return "E";
        else if (value == 135) return "SE";
        else if (value == 180) return "S";
        else if (value == 225) return "SW";
        else if (value == 270) return "W";
        else if (value == 315) return "NW";
      },
    };
  }
}