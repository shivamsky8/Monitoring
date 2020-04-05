import React from "react";
import "./SymptomCheckar.css";

export default class SymptomCheckar extends React.Component {
  state = {
    question: [
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
    selectedId: 1,
    result: false,
    isCheck: false
  };

  componentDidMount() {}

  onChange = (type, id) => {
    let ans = type === "No" ? false : true;
    this.setState(prevState => ({
      question: prevState.question.map(qq => {
        return qq.id === id ? { ...qq, select: ans } : qq;
      })
    }));
  };

  onSubmit = () => {
    this.setState({ isCheck: true });
    let selected = this.state.question.filter(qq => qq.select).length;
    let result = this.state.question.length - selected;
    if (result <= selected) {
      console.log("possible");
      this.setState({ result: true });
    } else {
      console.log("not possible");
      this.setState({ result: false });
    }
  };

  onNext = () => {
    this.setState(prevState => ({ selectedId: prevState.selectedId + 1 }));
  };

  onPrev = () => {
    this.setState({ isCheck: false });
    this.setState(prevState => ({ selectedId: prevState.selectedId - 1 }));
  };

  onRecheck = () => {
    this.setState({
      selectedId: 1,
      result: false,
      isCheck: false
    });
  };

  render() {
    const { question, selectedId, result, isCheck } = this.state;
    return (
      <>
        <label>Symptom Checkar</label>
        <div className="checker-container">
          {selectedId <= question.length ? (
            question.map(el => {
              return (
                el.id === selectedId && (
                  <div key={el.id} className="quest-card">
                    <span>
                      {el.id}. {el.que}
                    </span>
                    <div className="action-question">
                      <button
                        className={`${el.select ? "" : "selected-true"}`}
                        onClick={() => this.onChange("No", el.id)}
                      >
                        No
                      </button>
                      <button
                        className={`${el.select ? "selected-true" : ""}`}
                        onClick={() => this.onChange("Yes", el.id)}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                )
              );
            })
          ) : (
            <div class="check-process">
              {!isCheck && <button onClick={this.onSubmit}>Check</button>}
              {isCheck && result && (
                <div className="positive">
                  Possibility of Virus Infection. Do not panic, Contact your
                  family Physician or nearest hospital.
                </div>
              )}
              {isCheck && !result && (
                <div className="negative">
                  No possibility of Infection. If you are not feeling well,
                  Contact your family Physician or nearest hospital.
                </div>
              )}
              <div className="recheck">
                {isCheck && (
                  <button onClick={this.onRecheck}>Start Again </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="action-container">
          {isCheck && (
            <p>
              <b>Note:</b> This is not laboratory or biological test. This is
              just self evaluation / screening test. Result is based on
              questions and answer given by you. ( Not to be used for medical
              purpose)
            </p>
          )}
          <div>
            {selectedId > 1 && selectedId <= question.length + 1 && !isCheck && (
              // <button onClick={this.onPrev}>Previous</button>
              <i
                className="fa fa-arrow-left  arrow-left"
                onClick={this.onPrev}
              ></i>
            )}
          </div>
          <div>
            {selectedId >= 1 && selectedId <= question.length && (
              // <button onClick={this.onNext}>Next</button>
              <i
                className="fa fa-arrow-right arrow-right"
                onClick={this.onNext}
              ></i>
            )}
            {/* {selectedId === question.length && (
              <button onClick={this.onSubmit}>Submit</button>
            )} */}
          </div>
        </div>
      </>
    );
  }
}
