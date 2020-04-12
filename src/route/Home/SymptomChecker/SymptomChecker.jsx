import React from "react";
import "./SymptomChecker.css";
// import Swiper from "react-id-swiper";

import ReactCardCarousel from "react-card-carousel";
import Card from "../../../shared/Card/Card";
import Result from "../../../shared/Result/Result";
import { symptoms } from "../../../config/symptom_question";

// import "swiper/css/swiper.css";
export default class SymptomChecker extends React.Component {
  state = {
    checkerQuestions: [],
    selectedId: 0,
    isCheck: false,
    result: false,
  };

  componentDidMount() {
    this.setState({ checkerQuestions: symptoms });
  }
  onSubmit = () => {
    this.setState({ isCheck: true });
    let selected = this.state.checkerQuestions.filter((qq) => qq.select).length;
    let result = this.state.checkerQuestions.length - selected;
    if (result <= selected) {
      this.setState({ result: true });
    } else {
      this.setState({ result: false });
    }
  };

  onNext = () => {
    this.Carousel.next();
  };

  onPrev = () => {
    this.Carousel.prev();
  };

  onchange = (e) => {
    this.setState({ selectedId: this.Carousel.getCurrentIndex() });
  };

  onRecheck = () => {
    this.setState({
      selectedId: 1,
      result: false,
      isCheck: false,
    });
  };

  onClickHandler = (type) => {
    let id = this.state.selectedId + 1;
    let ans = type === "no" ? false : true;
    this.setState((prevState) => ({
      checkerQuestions: prevState.checkerQuestions.map((qq) => {
        return qq.id === id ? { ...qq, select: ans } : qq;
      }),
    }));
  };

  render() {
    const { selectedId, checkerQuestions, isCheck, result } = this.state;

    return (
      <div className="checker-container">
        {!isCheck ? (
          <>
            <div>
              <ReactCardCarousel
                afterChange={this.onchange}
                ref={(Carousel) => (this.Carousel = Carousel)}
              >
                {checkerQuestions.map((question) => {
                  return (
                    <Card
                      question={question}
                      onClickAns={this.onClickHandler}
                      key={question.id}
                    />
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
                </div>
              </div>
            </div>
            {selectedId === checkerQuestions.length - 1 && (
              <div className="check-button">
                <button onClick={this.onSubmit}>
                  Check <i className="fa fa-arrow-circle-o-right"></i>
                </button>
              </div>
            )}
          </>
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
