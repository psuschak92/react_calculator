import React from "react";

export class Screen extends React.Component {
    render() {
        return (
            <div className={this.props.screenType}>
                {this.props.placeHolder}
            </div>
        );
    }
}