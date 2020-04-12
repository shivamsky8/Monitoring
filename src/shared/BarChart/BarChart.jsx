import React from "react";
import ReactEcharts from "echarts-for-react";
import Loader from "../Loader/Loader";
// import "./PieChart.css";

export default class BarChart extends React.Component {
  state = {
    radius: "70%",
  };
  componentDidMount() {
    if (window.innerWidth < 480) {
      this.setState({ radius: "40%" });
    }
  }

  getOption = (date, data, name) => ({
    color: name !== "Deaths" ? ["#2F4554"] : ["#C23531"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
    },
    title: {
      text: name,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: data,
        axisTick: {
          show: false,
        },
        axisLabel: {
          rotate: 45,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: name,
        type: "bar",
        barWidth: "60%",
        data: date,
        label: {
          show: true,
          position: "top",
          rotate: 90,
          distance: 20,
          verticalAlign: "middle",
        },
      },
    ],
  });
  render() {
    const { data, date, name, style } = this.props;

    return (
      <>
        {data ? (
          <ReactEcharts
            option={this.getOption(data, date, name)}
            style={{ height: style }}
          />
        ) : (
          <Loader />
        )}
      </>
    );
  }
}
