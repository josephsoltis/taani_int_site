
let dataLocationString = "https://coriolix.ceoas.oregonstate.edu/demo/api";

// Base class for shared CORIOLIX gauge styles
export class BaseGauge {
  constructor(config) {
    this.containerId = config.containerId;
    this.title = config.title;
    this.subtitle = config.subtitle;
    this.subtitle_units = config.subtitle_units;
    this.min = config.min;
    this.max = config.max;
    this.startAngle = config.startAngle || 225;
    this.endAngle = config.endAngle || -45;
    this.decimalPlaces = config.decimalPlaces || 0;
    this.splitNumber = config.splitNumber || 8;
    this.center = config.center || ["50%", "55%"];
    this.radius = config.radius || "70%";
    this.chartDom = null;
    this.myChart = null;
    this.gaugeValue = 0;
    this.dataId = config.dataId;

    this.getData();
  }

  init() {
    this.chartDom = document.getElementById(this.containerId);
    console.log(this.chartDom);
    this.myChart = echarts.init(this.chartDom);
    this.setOptions();
    this.setUpdateInterval();
  }

  setOptions() {
    let option = {
      title: this.getTitleOptions(),
      graphic: this.getGraphicOptions(),
      tooltip: this.getTooltipOptions(),
      series: [this.getSeriesOptions()],
    };

    this.myChart.setOption(option);
  }

  getTitleOptions() {
    return {
      show: true,
      text: this.title,
      textStyle: this.getTitleTextStyle(),
      subtext: this.getSubtext(),
      subtextStyle: this.getSubtextStyle(),
      top: "top",
      left: "center",
      itemGap: 80,
      padding: [5, 0, 0, 0],
    };
  }

  getGraphicOptions() {
    return [this.getBackgroundCircle(), this.getInnerCircle()];
  }

  getTooltipOptions() {
    return {
      show: true,
      formatter: (params) => {
        return `${this.title}: ${params.value.toFixed(this.decimalPlaces)} ${
          this.subtitle_units
        }`;
      },
      position: ["50%", "50%"],
    };
  }

  getSeriesOptions() {
    return {
      name: this.title,
      type: "gauge",
      min: this.min,
      max: this.max,
      startAngle: this.startAngle,
      endAngle: this.endAngle,
      radius: this.radius,
      center: this.center,
      splitNumber: this.splitNumber,
      axisLine: this.getAxisLineOptions(),
      axisTick: this.getAxisTickOptions(),
      splitLine: this.getSplitLineOptions(),
      axisLabel: this.getAxisLabelOptions(),
      anchor: this.getAnchorOptions(),
      pointer: this.getPointerOptions(),
      detail: this.getDetailOptions(),
      data: [{ value: this.gaugeValue }],
    };
  }

  getTitleTextStyle() {
    return {
      fontSize: "1.2em",
      color: "#BBB",
      fontWeight: "lighter",
    };
  }

  getSubtext() {
    return (
      "{normal|" + this.subtitle + "}\n{italic|\n" + this.subtitle_units + "}"
    );
  }

  getSubtextStyle() {
    return {
      rich: {
        normal: {
          fontSize: "0.8em",
          color: "#AAA",
          fontStyle: "normal",
        },
        italic: {
          fontSize: "0.8em",
          color: "#AAA",
          fontStyle: "italic",
        },
      },
    };
  }

  

  getBackgroundCircle() {
    return {
      type: "circle",
      shape: {
        cx: this.chartDom.clientWidth * 0.5,
        cy: this.chartDom.clientHeight * 0.55,
        r: 86, // Radius of the background circle
      },
      style: {
        fill: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#ffffff" }, // Start color
            { offset: 1, color: "#dddddd" }, // End color
          ],
        },
      },
    };
  }

  getInnerCircle() {
    return {
      type: "circle",
      shape: {
        cx: this.chartDom.clientWidth * 0.5,
        cy: this.chartDom.clientHeight * 0.55,
        r: 82, // Radius of the smaller circle
      },
      style: {
        stroke: "#b4c1d1",
        fill: "none",
        lineWidth: 1.0, // Border width
      },
    };
  }

  getAxisLineOptions() {
    return {
      show: true,
      lineStyle: {
        width: 2.0,
        color: [[1, "#999"]],
      },
    };
  }

  getAxisLabelOptions() {
    return {
      show: true,
      distance: 10,
      color: "#555",
      rotate: "tangential",
      formatter: (value) => {
        return `${value.toFixed(0)}`;
      },
    };
  }

  getSplitLineOptions() {
    return {
      distance: -12,
      length: 24,
      lineStyle: {
        color: "#999",
        width: 1.25,
      },
    };
  }

  getAxisTickOptions() {
    return {
      show: true,
      splitNumber: 5,
      distance: 4,
      length: 8,
      lineStyle: {
        color: "#999",
        width: 1.0,
      },
    };
  }

  getAnchorOptions() {
    return {
      show: true,
      showAbove: true,
      size: 10,
      itemStyle: {
        borderWidth: 3,
        borderColor: "#555",
      },
    };
  }

  getPointerOptions() {
    return {
      icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
      length: "75%",
      itemStyle: {
        color: "#555",
      },
    };
  }

  getDetailOptions() {
    return {
      valueAnimation: true,
      fontSize: "0.8em",
      width: "20%",
      height: 10,
      borderColor: "#999",
      borderWidth: 0.25,
      borderRadius: 4,
      offsetCenter: [0, "30%"],
      formatter: (value) => {
        return "{value|" + value.toFixed(this.decimalPlaces) + "}{unit|}";
      },
      rich: {
        value: {
          fontSize: "0.8em",
          fontWeight: "bolder",
          color: "#555",
          padding: [0, 0, 20, 0],
        },
        unit: {
          fontSize: "0.75em",
          fontStyle: "italic",
          color: "#999",
          padding: [0, 0, 0, 0],
        },
      },
    };
  }

  getData = async () => {
    try {
      const response = await fetch(`${dataLocationString}/last_obs/?format=json`);
      const jsondata_lastobs = await response.json();
      jsondata_lastobs.features.forEach((item) => {
        if (item.id === this.dataId) {
          this.gaugeValue = parseFloat(item.properties.value);
        }
      });
      this.gaugeValue = parseFloat(this.gaugeValue.toFixed(this.decimalPlaces));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  setUpdateInterval() {
    setInterval(() => {
      this.getData();
      this.myChart.setOption({
        series: [{ data: [{ value: this.gaugeValue }] }],
      });
    }, 1000);
  }
}