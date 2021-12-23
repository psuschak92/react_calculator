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
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    updateScreen(buttonVal) {
        if(buttonVal === '+' || buttonVal === '-' || buttonVal === '/' || buttonVal === 'x') {
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

    collapseArray(arr, str) {
        while(arr.indexOf(str) !== -1) {
            let result;
            let num1 = arr[arr.indexOf(str) - 1];
            let num2 = arr[arr.indexOf(str) + 1];
            if(str === 'x') {
                result = num1 * num2;
            } else if(str === '/') {
                result = num1 / num2;
            } else if(str === '+') {
                result = num1 + num2;
            } else if(str === '-') {
                result = num1 - num2;
            }
            arr.splice(arr.indexOf(str) - 1, 3, result);
        }
    }

    calculateTotal() {
        let str = this.state.formulaScreen;
        let arr =str.split(' ');

        for(let i = 0; i < arr.length; i++) {
            if(arr[i] === '+' || arr[i] === '-' || arr[i] === 'x' || arr[i] === '/') {
                continue;
            } else {
                if(arr[i].includes('.')) {
                    arr[i] = parseFloat(arr[i]);
                } else {
                    arr[i] = parseInt(arr[i]);
                }
            }
        }

        if(arr.includes('x') && arr.includes('/')) {
            if(arr.indexOf('x') < arr.indexOf('/')) {
                this.collapseArray(arr, 'x');
                this.collapseArray(arr, '/');
            } else if(arr.indexOf('x') > arr.indexOf('/')) {
                this.collapseArray(arr, '/');
                this.collapseArray(arr, 'x');
            }
        }
        // handle any multiplication or division operations first
        if(arr.includes('x')) {
            this.collapseArray(arr, 'x');
        }
        if(arr.includes('/')) {
            this.collapseArray(arr, '/');
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
            }
        }
        this.setState({
            outputScreen: total
        });
    }

    clearScreen() {
        this.setState({
            formulaScreen: '',
            outputScreen: 0
        });
    }

    render() {
        return (
            <div className='calculator'>
                <div className='screen'>
                    <div className='formulaScreen'>
                        {this.state.formulaScreen.replace(/ +/g, "")}
                    </div>
                    <div className='outputScreen'>
                        {this.state.outputScreen}
                    </div>
                </div>
                <div className='buttons'>
                    <Button buttonID='clear' buttonType='AC' onClick={() => this.clearScreen()} />
                    <Button buttonClass='operation' buttonID='divide' buttonType='/' onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='operation' buttonID='multiply' buttonType='x' onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='digit' buttonID='seven' buttonType={7} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='digit' buttonID='eight' buttonType={8} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='digit' buttonID='nine' buttonType={9} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='operation' buttonID='subtract' buttonType='-' onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='digit' buttonID='four' buttonType={4} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='digit' buttonID='five' buttonType={5} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='digit' buttonID='six' buttonType={6} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='operation' buttonID='add' buttonType='+' onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='digit' buttonID='one' buttonType={1} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='digit' buttonID='two' buttonType={2} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='digit' buttonID='three' buttonType={3} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonID='equals' buttonType='=' onClick={() => this.calculateTotal()} />
                    <Button buttonClass='digit' buttonID='zero' buttonType={0} onClick={(e) => this.updateScreen(e.target.value)} />
                    <Button buttonClass='digit' buttonID='period' buttonType='.' onClick={(e) => this.updateScreen(e.target.value)} />
                </div>
            </div>
        );
    }
}

export default Calculator;