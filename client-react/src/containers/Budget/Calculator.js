import React, { Component } from 'react';
import Expenses from './Expenses';
import { Grid, Segment } from 'semantic-ui-react';


class Calculator extends Component {
  state = {
    income: null,
    tax: 0,
    net: 0,
    balance: 0,
    expenses: [
      { expense: 'housing', cost: 0 },
      { expense: 'transportation', cost: 0 },
      { expense: 'utilities', cost: 0 },
      { expense: 'insurance', cost: 0 },
      { expense: 'savings', cost: 0 }
    ]
  };

  handleIncome = e => {
    let value = null;
    let tax = 0;
    let income = e.target.value * 12;
    if (income < 9525) {
      tax = 10;
      value = income - income * 0.1;
    } else if (income > 9525 && income < 38700) {
      value = income - income * 0.12;
      tax = 12;
    } else if (income > 38701 && income < 82500) {
      value = income - income * 0.22;
      tax = 22;
    } else if (income > 82501 && income < 157500) {
      value = income - income * 0.24;
      tax = 24;
    } else if (income > 157501 && income < 200000) {
      value = income - income * 0.32;
      tax = 32;
    } else if (income > 200001 && income < 500000) {
      value = income - income * 0.35;
      tax = 35;
    } else if (income > 500001) {
      value = income - income * 0.37;
      tax = 37;
    }
    this.setState({
      income: income,
      tax: tax,
      net: (value / 12).toFixed(2),
      balance: (value / 12).toFixed(2)
    });
  };

  handleChange = e => {
    if (this.state.income != null) {
      let index = this.state.expenses.findIndex(x => x.expense === e.target.id);
      if (index === -1) {
        console.log('error');
      } else {
        this.setState({
          expenses: [
            ...this.state.expenses.slice(0, index),
            Object.assign({}, this.state.expenses[index], {
              cost: parseInt(e.target.value)
            }),
            ...this.state.expenses.slice(index + 1)
          ]
        });
      }
      this.renderBalance(e.target.value, e.target.id);
    } else {
      alert('Please enter an income!');
    }
  };

  renderBalance = (value, id) => {
    let total = 0;
    let remainder = 0;
    const filtered = this.state.expenses.filter(x => x.expense != id);
    for (var i = 0, _len = filtered.length; i < _len; i++) {
      total += filtered[i].cost;
    }
    let balance = this.state.net - (parseInt(total) + parseInt(value));

    if (isNaN(balance) && total === 0) {
      remainder = 0;
    } else if (isNaN(balance) && total > 0) {
      remainder = total;
    } else {
      remainder = balance;
    }

    this.setState({
      balance: remainder
    });
  };

  render() {
    return (
        <Segment>
        <div className="container-full-page flat">
        <Grid>
          <Grid.Row>
            <Grid.Column computer={6} mobile={16}>
              <div id="calculator">
                <h1> Monthly Budget Calculator </h1>
                <form id="income" onChange={this.handleIncome}>
                  <label> Gross Monthly Income </label>$
                  <input id="income" type="number"></input>
                  <label> Estimated Tax : </label>%{' '}
                  <label> {this.state.tax}</label>
                </form>
                <Expenses handleChange={this.handleChange} />
                <label>
                  {' '}
                  Income Remaining: ${' '}
                  {this.state.balance
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </label>
                <label>
                  {' '}
                  Net Income : ${' '}
                  {this.state.net
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      </Segment>
    );
  }
}

export default Calculator;
