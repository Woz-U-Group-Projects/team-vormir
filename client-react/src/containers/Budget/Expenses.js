import React, { PureComponent } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { loadAccounts } from '../../actions/entities/accounts';
import { loadTags } from '../../actions/entities/tags';
import { loadFilterTransactions } from '../../actions/entities/transactions';
import { applyFilters } from '../../actions/ui/transaction/filter';



class Expenses extends PureComponent {

  render() {
    return (
      <div className="container-full-page flat search-page">
          <Grid>
          <Grid.Row>
            <Grid.Column computer={6} mobile={16}>
          <br></br>
      <form id="expenses" onChange={this.props.handleChange}>
      <div className="expense-input">
      <label> Housing $</label>
        <input id="housing" type="number"></input>
          <br></br>
      </div>
      <div className="expense-input">
      <label> Utilities $</label>
        <input id="utilities" type="number"></input>
          <br></br>
      </div>
      <div className="expense-input">
      <label> Insurance $</label>
        <input id="insurance" type="number"></input>
          <br></br>
      </div>
      <div className="expense-input">
      <label> Transportation $</label>
        <input id="transportation" type="number"></input>
          <br></br>
      </div>
      <div className="expense-input">
      <label> Savings $</label>
        <input id="savings" type="number"></input>
          <br></br>
      </div>
      <div className="expense-input">
      <label> Misc. $</label>
        <input id="misc" type="number"></input>
      </div>
      </form>
      </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

}

export default connect(
    undefined,
    {
      loadAccounts,
      loadTags,
      loadFilterTransactions,
      applyFilters
    }
  )(Expenses);