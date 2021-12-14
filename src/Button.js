import React from "react";

export class Button extends React.Component {
    render() {
        return (
            <button id={this.props.buttonID} value={this.props.buttonType} onClick={this.props.onClick}>{this.props.buttonType}</button>
        );
    }
}