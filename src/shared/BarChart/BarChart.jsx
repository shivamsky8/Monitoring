import React from "react";
import ReactEcharts from "echarts-for-react";
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
    color: name !== "New Deaths" ? ["#2F4554"] : ["#C23531"],
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
          rotate: 30,
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
        data: date,
        label: {
          show: true,
          position: "top",
        },
      },
    ],
  });
  render() {
    const { data, date, name, style } = this.props;

    return (
      <>
        <ReactEcharts
          option={this.getOption(data, date, name)}
          style={{ height: style }}
        />
      </>
    );
  }
}
