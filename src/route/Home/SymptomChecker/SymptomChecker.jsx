import React from "react";
import "./SymptomChecker.css";
// import Swiper from "react-id-swiper";

import ReactCardCarousel from "react-card-carousel";
import Card from "../../../shared/Card/Card";
import Result from "../../../shared/Result/Result";

// import "swiper/css/swiper.css";
export default class SymptomChecker extends React.Component {
  state = {
    checkerQuestions: [
      {
        id: 1,
        que: "Do yoh have symptoms of ferver ?",
        select: false
      },
      {
        id: 2,
        que: "Do yoh have any cough in past 15 days ?",
        select: false
      },
      {
        id: 3,
        que: "Do you sneeze often  ?",
        select: false
      },
      {
        id: 4,
        que: "Do you have symptoms of sore throat ?",
        select: false
      },
      {
        id: 5,
        que: "Do you have any pain  in a muscle or group of muscles?",
        select: false
      },
      {
        id: 6,
        que: "Do you have symptoms of Fatigue ?",
        select: false
      },
      {
        id: 7,
        que: "Do you have any  difficulty while breathing ?",
        select: false
      },
      {
        id: 8,
        sysptoms: [],
        que: "Have you travelled outside your country in past 30 days?",
        select: false
      },
      {
        id: 9,
        sysptoms: [],
        que:
          "Have anyone from your family / close contact travelled outside your country in past 30 days?",
        select: false
      },
      {
        id: 10,
        sysptoms: [],
        que:
          "Have you travelled inside your country to other cities in past 15 days?",
        select: false
      },
      {
        id: 11,
        sysptoms: [],
        que:
          "Have anyone from your family / close contact travelled inside your country to other cities in past 15 days?",
        select: false
      },
      {
        id: 12,
        sysptoms: [],
        que:
          "Exposure to a confirmed covid-19 case or suspicious patient in the last two weeks?",
        select: false
      },
      {
        id: 13,
        sysptoms: [],
        que: "Have you visited a health care facility in the past two weeks?",
        select: false
      }
    ],
    selectedId: 0,
    isCheck: false,
    result: false
  };

  // onChange = e => {
  //   const selectedId = parseInt(e.target.id);
  //   this.setState(prevState => ({
  //     question: prevState.question.map(qq =>
  //       //   console.log("SymptomCheckar -> qq", qq)
  //       {
  //         let prev = qq.select;
  //         return qq.id === selectedId ? { ...qq, select: !prev } : qq;
  //       }
  //     )
  //   }));
  //   console.log(this.state);
  // };

  // onSubmit = () => {
  // let selected = this.state.question.filter(qq => qq.select).length;
  // console.log("yes", selected);
  // console.log(this.state.question.length);
  // let result = this.state.question.length - selected;
  // console.log("no", result);
  // if (result <= selected) {
  //   console.log("possible");
  // } else {
  //   console.log("not possible");
  // }
  onSubmit = () => {
    this.setState({ isCheck: true });
    let selected = this.state.checkerQuestions.filter(qq => qq.select).length;
    let result = this.state.checkerQuestions.length - selected;
    if (result <= selected) {
      console.log("possible");
      this.setState({ result: true });
    } else {
      console.log("not possible");
      this.setState({ result: false });
    }
  };

  onNext = () => {
    this.Carousel.next();
  };

  onPrev = () => {
    this.Carousel.prev();
  };

  onchange = e => {
    this.setState({ selectedId: this.Carousel.getCurrentIndex() });
  };

  onRecheck = () => {
    this.setState({
      selectedId: 1,
      result: false,
      isCheck: false
    });
  };

  onClickHandler = type => {
    let id = this.state.selectedId + 1;
    let ans = type === "no" ? false : true;
    this.setState(prevState => ({
      checkerQuestions: prevState.checkerQuestions.map(qq => {
        return qq.id === id ? { ...qq, select: ans } : qq;
      })
    }));
  };

  render() {
    const { selectedId, checkerQuestions, isCheck, result } = this.state;

    return (
      <div className="checker-container">
        {!isCheck ? (
          <div>
            <ReactCardCarousel
              afterChange={this.onchange}
              ref={Carousel => (this.Carousel = Carousel)}
            >
              {checkerQuestions.map(question => {
                return (
                  <Card question={question} onClickAns={this.onClickHandler} />
                );
              })}
            </ReactCardCarousel>

            <div className="carousel-action">
              <div>
                {selectedId > 0 && selectedId < checkerQuestions.length && (
                  <i
                    className="fa fa-chevron-left arrow "
                    onClick={this.onPrev}
                  ></i>
                )}
              </div>
              <div>
                {selectedId < checkerQuestions.length - 1 && (
                  <i
                    className="fa fa-chevron-right arrow"
                    onClick={this.onNext}
                  ></i>
                )}
                {selectedId === checkerQuestions.length - 1 && (
                  <button onClick={this.onSubmit}>
                    Check <i className="fa fa-arrow-circle-o-right"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Result type={result} />
            <div className="recheck">
              <button onClick={this.onRecheck}>Start Again </button>
              <p>
                <b>Note:</b> This is not laboratory or biological test. This is
                just self evaluation / screening test. Result is based on
                questions and answer given by you. ( Not to be used for medical
                purpose)
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
