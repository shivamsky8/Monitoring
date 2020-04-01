import React from "react";
import "./SymptomCheckar.css";

export default class SymptomCheckar extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.clickSubmit = this.clickSubmit.bind(this);
  //   }

  //   clickSubmit = e => {
  //     console.log(e.target.value);
  //     console.log(this.refs.my.value);
  //     e.preventDefault();
  //   };

  state = {
    question: [
      {
        id: 1,
        que: "Have you travelled outside your country in past 30 days?",
        select: false
      },
      {
        id: 2,
        que:
          "Have anyone from your family / close contact travelled outside your country in past 30 days?",
        select: false
      },
      {
        id: 3,
        que:
          "Have you travelled inside your country to other cities in past 15 days?      ",
        select: false
      },
      {
        id: 4,
        que:
          "Have anyone from your family / close contact travelled inside your country to other cities in past 15 days?",
        select: false
      }
    ],
    selectedId: 1
  };
  componentDidMount() {
    //   this.setState({})
  }

  onChange = e => {
    console.log(e.target.checked);
    console.log(typeof e.target.id);
    const selectedId = parseInt(e.target.id);
    this.setState(prevState => ({
      question: prevState.question.map(qq =>
        //   console.log("SymptomCheckar -> qq", qq)
        {
          let prev = qq.select;
          return qq.id === selectedId ? { ...qq, select: !prev } : qq;
        }
      )
    }));
    console.log(this.state);
  };

  onSubmit = () => {
    let selected = this.state.question.filter(qq => qq.select).length;
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
    this.setState(prevState => ({ selectedId: prevState.selectedId + 1 }));
    console.log(this.state.selectedId);
  };
  onPrev = () => {
    this.setState(prevState => ({ selectedId: prevState.selectedId - 1 }));
  };

  render() {
    const { question, selectedId } = this.state;
    return (
      <div className="checker-container">
        {question.map(el => {
          return (
            el.id === selectedId && (
              <div key={el.id} className="quest-card">
                {el.id}.<span>{el.que}</span>
                <div>
                  <input
                    type="checkbox"
                    checked={el.select}
                    onChange={this.onChange}
                    id={el.id}
                  />
                </div>
              </div>
            )
          );
        })}
        <div className="action-container">
          {selectedId > 1 && selectedId <= question.length && (
            <button onClick={this.onPrev}>Previous</button>
          )}
          {selectedId === question.length && (
            <button onClick={this.onSubmit}>Submit</button>
          )}
          {selectedId >= 1 && selectedId < question.length && (
            <button onClick={this.onNext}>Next</button>
          )}
        </div>
      </div>
    );
  }
}
