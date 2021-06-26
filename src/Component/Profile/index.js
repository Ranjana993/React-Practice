import React from "react";
import "./Profile.css";


export default class Profile extends React.Component {
  state = {
    time: null,
    users: [],
    userInfo: null,
    selectedUser: null,
  };
  //   https:jsonplaceholder.typicode.com/users/1

  fetchUser = (id) => {
    const path = id
      ? `https:jsonplaceholder.typicode.com/users/ ${id}`
      : "https:jsonplaceholder.typicode.com/users";

    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (id) {
          this.setState({ userInfo: data });
        } else {
          this.setState({ users: data });
        }
      });
  };

  componentDidMount() {
    this.fetchUser();
    this.timer = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }
  componentDidUpdate(prevProps, prevState) {
    //   console.log(prevState , this.state);
    // if (prevState.selectedUser !== this.state.selectedUser) {
    //   this.fetchUser(this.state.selectedUser);
    // }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getUserInfo = (id) => {
    const userInfo = this.state.users.filter((user) => user.id === id);
    if (userInfo.length) {
      this.setState({ userInfo: userInfo[0] });
    }
    //  this.fetchUser(id);
    //  console.log(this.fetchUser, "Butterfly");
     //  this.setState({selectedUser:id})
  };

  render() {
    return (
      <>
        {" "}
        <h2>TIMING : {this.state.time}</h2>
        <div className="container">
          <div className="userContainer">
            <h2
              style={{
                fontSize: "30px",
                textAlign: "center",
                color: "darkred",
              }}
            >
              USER LIST....
            </h2>
            {this.state.users.map((user, index) => {
              return (
                <div
                  className="profile-card"
                  key={index}
                  onClick={() => this.getUserInfo(user.id)}
                >
                  <h3>{user.name}</h3>
                  <address>{user.company.catchPhrase}</address>
                </div>
              );
            })}
          </div>

          <div className="user-info">
            <h2>USER INFORMATION</h2>
            <div className="profile-cards">
              <h3>{this.state.userInfo?.name}</h3>
              <address>{this.state.userInfo?.company?.catchPhrase}</address>
            </div>
          </div>
        </div>
      </>
    );
  }
}
