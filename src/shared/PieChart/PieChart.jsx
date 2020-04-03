import React from "react";
import ReactEcharts from "echarts-for-react";
import "./PieChart.css";

export default class PieChart extends React.Component {
  state = {
    radius: "70%"
  };
  componentDidMount() {
    if (window.innerWidth < 480) {
      this.setState({ radius: "40%" });
    }
  }

  getOption = () => ({
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "horizontal",
      left: "left",
      data: ["Active Case", "Total Death", "Total Recovered"]
    },
    series: [
      {
        name: "Covid-19",
        type: "pie",
        radius: this.state.radius,
        center: ["50%", "50%"],
        label: {
          fontSize: 12
        },
        data: [
          {
            value: this.props.active ? this.props.active : 0,
            name: "Active Case"
          },
          {
            value: this.props.death ? this.props.death : 0,
            name: "Total Death"
          },
          {
            value: this.props.recover ? this.props.recover : 0,
            name: "Total Recovered"
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });
  render() {
    return (
      <>
        <ReactEcharts
          option={this.getOption()}
          // style={{ height: 300 }}
          className="echart-style"
        />
      </>
    );
  }
}
