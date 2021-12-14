import React from 'react';
// import { Screen } from './Screen';
import { Button } from './Button';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formulaScreen: '',
            outputScreen: 0
        };
        this.updateScreen = this.updateScreen.bind(this);
    }

    updateScreen(buttonVal) {
        if(buttonVal === '+' || buttonVal === '-' || buttonVal === '/' || buttonVal === '*') {
            this.setState((state) => ({
                formulaScreen: state.formulaScreen + ' ' + buttonVal + ' ',
                outputScreen: buttonVal
            }));
        } else {
            this.setState((state) => ({
                formulaScreen: state.formulaScreen + buttonVal,
                outputScreen: buttonVal
            }));
        }
    }

    calculateTotal() {
        let str = this.state.formulaScreen;
        let arr =str.split(' ');
        // converts all str to num
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === '+' || arr[i] === '-' || arr[i] === '*' || arr[i] === '/') {
                continue;
            } else {
                if(arr[i].includes('.')) {
                    arr[i] = parseFloat(arr[i]);
                } else {
                    arr[i] = parseInt(arr[i]);
                }
            }
        }
        // apply the necessary operations to `total`
        let total = 0;
        for(let i = 0; i < arr.length; i++) {
            if(i === 0) {
                total = arr[i];
            } else if(arr[i] === '+') {
                total += arr[i + 1];
                i++;
            } else if(arr[i] === '-') {
                total -= arr[i + 1];
                i++;
            } else if(arr[i] === '*') {
                total *= arr[i + 1];
                i++;
            } else if(arr[i] === '/') {
                total /= arr[i + 1];
                i++;
            }
        }
        this.setState({
            outputScreen: total
        });
    }

    render() {
        // let arr = [];
        // for(let i = 0; i < this.state.formulaScreen.length; i++) {
        //     arr.push(this.state.formulaScreen[i]);
        // }
        // console.log(arr.join(' '));
        return (
            <div className='calculator'>
                <div className='screen'>
                    <div className='formulaScreen'>
                        {this.state.formulaScreen}
                    </div>
                    <div className='outputScreen'>
                        {this.state.outputScreen}
                    </div>
                </div>
                <div className='buttons'>
                    <Button buttonID='clear' buttonType='AC' onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='divide' buttonType='/' onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='multiply' buttonType='*' onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='subtract' buttonType='-' onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='add' buttonType='+' onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='equals' buttonType='=' onClick={() => this.calculateTotal()} />
                    <Button buttonID='period' buttonType='.' onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='zero' buttonType={0} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='one' buttonType={1} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='two' buttonType={2} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='three' buttonType={3} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='four' buttonType={4} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='five' buttonType={5} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='six' buttonType={6} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='seven' buttonType={7} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='eight' buttonType={8} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='nine' buttonType={9} onClick={(e) => this.updateScreen(e.target.value)} />
                </div>
            </div>
        );
    }
}

export default Calculator;