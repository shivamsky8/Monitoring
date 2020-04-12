/* eslint-disable react/prefer-stateless-function */
import React from "react";
import HeaderWithCloseButton from "../HeaderWithCloseButton/HeaderWithCloseButton";
import "./Sidenav.css";

const menuItem = [
  { id: 1, name: "Statistics", isSelected: true, query: "home" },
  { id: 2, name: "Map View", isSelected: false, query: "map-view" },
  {
    id: 3,
    name: "Symptom Checker",
    isSelected: false,
    query: "symptom-checker",
  },
  { id: 4, name: "FAQ", isSelected: false, query: "faq" },
  { id: 5, name: "Helpline", isSelected: false, query: "helpline" },
  { id: 6, name: "About", isSelected: false, query: "about" },
];

export default class SideNav extends React.Component {
  state = {
    menuItem: [],
  };

  componentDidMount() {
    this.setState({ menuItem });
  }

  closeSideNav = () => {
    this.props.closeSideNav();
  };

  selectedItem = (item) => {
    // console.log(item);

    const { menuItem } = this.state;
    const cloneMenuItem = [...menuItem];
    cloneMenuItem.forEach((aItem) => {
      if (aItem.id === item.id) {
        aItem.isSelected = true;
      } else {
        aItem.isSelected = false;
      }
    });

    this.setState({ menuItem: cloneMenuItem });
    this.props.selectedItem(item);
  };
  render() {
    const { isNavOpen } = this.props;
    const { menuItem } = this.state;

    return (
      <>
        <div className={`sidenav ${isNavOpen ? "sidenav-open" : ""}`}>
          <HeaderWithCloseButton closeSideNav={this.closeSideNav} />
          <div className="menu-item">
            {menuItem.map((item) => (
              <span
                key={item.id}
                className={item.isSelected ? "selected-menu" : ""}
                onClick={() => this.selectedItem(item)}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </>
    );
  }
}
