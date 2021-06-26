import React from "react";
import Profile from "../Component/Profile";

export default class App extends React.Component {
  state = {
    showProfile: true,
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }
  componentDidUpdate() {
    if (this.state.time === "08:42:36") {
      // alert(this.state.time)
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    // console.log("render And Re render")
    return (
      <>
        <h1>This is a Life Cycle Method</h1>
        {/* <Profile /> */}
        {this.state.showProfile && <Profile />}
        <button
          type="button"
          onClick={() =>
            this.setState({ showProfile: !this.state.showProfile })
          }
        >
          Toggle Profile
        </button>
      </>
    );
  }
}
