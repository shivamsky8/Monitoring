/* eslint-disable react/prefer-stateless-function */
import React from "react";
import "./Footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <>
        <footer className="footer-distributed">
          <div className="footer-right">
            <span>
              <i className="fa fa-facebook"></i>
            </span>
            <span>
              <i className="fa fa-twitter"></i>
            </span>
            <span>
              <i className="fa fa-linkedin"></i>
            </span>
            <span>
              <i className="fa fa-github"></i>
            </span>
          </div>

          <div className="footer-left">
            <p>Monitoring &copy; 2020</p>
          </div>
        </footer>
      </>
    );
  }
}
