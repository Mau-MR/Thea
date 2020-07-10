import React, { Component } from "react";
import ClientBar from "./ClientBarComponent.jsx";

export default class OptionBar extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      buttonSelected: "0",
    };
    this.change = "0";
  }
  componentDidMount() {
    document.getElementById("0").style.background = "rgb(213,78,103)";
    document.getElementById("0").style.color = "white";
  }

  changeColor(id) {
    var v = "0";
    if (id === "1") {
      var b1 = document.querySelector(
        "div.buttons-div-clientas button[id='1']"
      );
      this.BI = b1;
      b1.style.background = "rgb(213,78,103)";
      b1.style.color = "white";
      v = "1";
    } else if (id === "2") {
      var b2 = document.querySelector(
        "div.buttons-div-clientas button[id='2']"
      );
      this.BI = b2;
      b2.style.background = "rgb(213,78,103)";
      b2.style.color = "white";
      v = "2";
    } else if (id === "3") {
      var b3 = document.querySelector(
        "div.buttons-div-clientas button[id='3']"
      );
      this.BI = b3;
      b3.style.background = "rgb(213,78,103)";
      b3.style.color = "white";
      v = "3";
    } else if (id === "0") {
      var b0 = document.querySelector(
        "div.buttons-div-clientas button[id='0']"
      );
      this.BI = b0;
      b0.style.background = "rgb(213,78,103)";
      b0.style.color = "white";
      v = "0";
    }

    if (v !== this.change) {
      switch (this.change) {
        case "0":
          document.getElementById("0").style.background = "transparent";
          document.getElementById("0").style.color = "rgb(133,134,136)";
          break;
        case "1":
          document.getElementById("1").style.background = "transparent";
          document.getElementById("1").style.color = "rgb(133,134,136)";
          break;
        case "2":
          document.getElementById("2").style.background = "transparent";
          document.getElementById("2").style.color = "rgb(133,134,136)";
          break;
        case "3":
          document.getElementById("3").style.background = "transparent";
          document.getElementById("3").style.color = "rgb(133,134,136)";
          break;
        default:
          console.log("Bro alch no se que paso pero se rompió");
      }
    }
    this.change = v;
    console.log(this.change);
  }
  handleClick(event) {
    const id = event.target.id;
    this.changeColor(id);
    this.setState({ buttonSelected: id });
  }
  toggleCategories() {
    if (this.state.buttonSelected === "0") {
      return (
        <div>
          <ClientBar></ClientBar>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="display-div">
        <div className="side-bar-clientas">
          <div className="buttons-div-clientas">
            <button className="returnButton">Aqui probandp</button>
            <button
              className="window-layout-clientas"
              id={0}
              onClick={this.handleClick}
            >
              Bitacoras
            </button>

            <button
              className="window-layout-clientas"
              id={1}
              onClick={this.handleClick}
            >
              Registro
            </button>

            <button
              className="window-layout-clientas"
              id={2}
              onClick={this.handleClick}
            >
              Citas
            </button>

            <button
              className="window-layout-clientas"
              id={3}
              onClick={this.handleClick}
            >
              Corrección
            </button>
          </div>
        </div>
        <div className="content-div-clientas">{this.toggleCategories()}</div>
      </div>
    );
  }
}

