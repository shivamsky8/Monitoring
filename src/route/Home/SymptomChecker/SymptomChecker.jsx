import React from "react";
import "./SymptomChecker.css";
// import Swiper from "react-id-swiper";

import ReactCardCarousel from "react-card-carousel";
import Card from "../../../shared/Card/Card";
// import "swiper/css/swiper.css";

export default class SymptomChecker extends React.Component {
  state = {
    question: [
      {
        id: 1,
        que: "Have you travelled outside your country in past 30 days?",
        select: false,
      },
      {
        id: 2,
        que:
          "Have anyone from your family / close contact travelled outside your country in past 30 days?",
        select: false,
      },
      {
        id: 3,
        que:
          "Have you travelled inside your country to other cities in past 15 days?      ",
        select: false,
      },
      {
        id: 4,
        que:
          "Have anyone from your family / close contact travelled inside your country to other cities in past 15 days?",
        select: false,
      },
    ],
    selectedId: 1,
  };
  componentDidMount() {
    //   this.setState({})
  }

  onChange = (e) => {
    console.log(e.target.checked);
    console.log(typeof e.target.id);
    const selectedId = parseInt(e.target.id);
    this.setState((prevState) => ({
      question: prevState.question.map((qq) =>
        //   console.log("SymptomCheckar -> qq", qq)
        {
          let prev = qq.select;
          return qq.id === selectedId ? { ...qq, select: !prev } : qq;
        }
      ),
    }));
    console.log(this.state);
  };

  onSubmit = () => {
    let selected = this.state.question.filter((qq) => qq.select).length;
    console.log("yes", selected);
    console.log(this.state.question.length);
    let result = this.state.question.length - selected;
    console.log("no", result);
    if (result <= selected) {
      console.log("possible");
    } else {
      console.log("not possible");
    }
  };

  onNext = () => {
    this.Carousel.next();
  };
  onPrev = () => {
    this.Carousel.prev();
  };

  render() {
    const { question, selectedId } = this.state;

    return (
      <div className="checker-container">
        <div>
          <ReactCardCarousel ref={(Carousel) => (this.Carousel = Carousel)}>
            <Card question="what is for the tesing purpose" />
            <Card question="this is for the tesing purpose" />
            <Card question="this is for the tesing purpose" />
            <Card question="this is for the tesing purpose" />
            <Card question="this is for the tesing purpose" />
            <Card question="this is for the tesing purpose" />
            <Card question="this is for the tesing purpose" />
            <Card question="this is for the tesing purpose" />
          </ReactCardCarousel>
        </div>
        <div>
          <button onClick={this.onPrev}>Prev</button>
          <button onClick={this.onNext}>Next</button>
        </div>
      </div>
    );
  }
}
