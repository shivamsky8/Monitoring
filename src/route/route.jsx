import React, { Suspense } from "react";
import { Switch, Redirect } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import HomeComponent from "./Home/Home";
import Footer from "../shared/Footer/Footer";
import Header from "../shared/Header/Header";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { openMenu, closeMenu } from "../Module/ui.reducer";

class Routes extends React.Component {
  navStatus = () => {
    const { isMenuOpen } = this.props;
    if (isMenuOpen) {
      this.props.closeMenu();
    } else {
      this.props.openMenu();
    }
  };

  render() {
    return (
      <>
        <Header navStatus={this.navStatus} />
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" component={HomeComponent} />
              <Route path="/notfound" component={NotFound} />
              <Redirect from="**" to="home" />
            </Switch>
          </Suspense>
        </Router>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isMenuOpen: state.ui.menu.isOpen,
});

const mapDispatchToProps = {
  openMenu,
  closeMenu,
};

// export default Routes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
