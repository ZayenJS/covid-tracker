import React, { Component, useState } from 'react';

class Button extends Component {
  state = {
    isVisible: true,
  };

  clickHandler = () => this.setState(() => ({ isVisible: !this.state.isVisible }));

  render() {
    const { isVisible } = this.state;
    return isVisible ? (
      <button onClick={this.clickHandler}>Clique moi je disparait !</button>
    ) : null;
  }
}

// const Button = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   const clickHandler = () => {
//     setIsVisible(() => !isVisible);
//   };

//   return isVisible ? <button onClick={clickHandler}>Clique moi je disparait !</button> : null;
// };

export default Button;
