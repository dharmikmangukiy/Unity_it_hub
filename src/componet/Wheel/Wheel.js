import React from "react";
import "./index.css";

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    // this.selectItem = this.selectItem.bind(this);
  }

  render() {
    // const { selectedItem } = this.state;
    const { items, isLocked, selectedItem, spinning1 } = this.props;
    console.log("sad", selectedItem, items);
    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };
    const spinning = selectedItem !== null ? "spinning" : "";
    const blurOpacity = isLocked ? "blur-opacity" : "";
    console.log("djhgdsbnm", this.state.isLocked);
    return (
      <div className="ring-container">
        <div className="wheel-container">
          <div
            className={`wheel ${spinning1 ? "spinning" : ""} ${blurOpacity}`}
            style={wheelVars}
          >
            {items.map((item, index) => (
              <div
                className="wheel-item"
                key={index}
                style={{ "--item-nb": index }}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="lock-image">
            {isLocked ? (
              <img src="/images/lock.png" />
            ) : (
              <img src="/images/spin-gold-btn.png" />
            )}
          </div>
        </div>
      </div>
    );
  }
}
