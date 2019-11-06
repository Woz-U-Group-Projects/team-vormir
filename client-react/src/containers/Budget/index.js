import { Button } from 'semantic-ui-react';
import { getForm, getModal } from '../../selectors/ui/form/account';
import ModalForm from '../../components/Account/ModalForm';
import AccountsList from './List';
import AccountForm from './Form';
import { getAccountsAsOptions } from '../../selectors/entities/accounts';
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";


  
 


const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/c9pL8k61/";

  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}

class Accounts extends React.Component {
  componentWillMount() {
    this.props.loadAccounts();
  }

  render() {
    return (
      <div className="container-full-page flat">
        <div className="container-header">
          <Button.Group basic>
            <Button
              icon="plus"
              labelPosition="left"
              content="New"
              onClick={this.props.openAccountInModal}
            />
          </Button.Group>
        </div>
        <div className="accounts-list-wrapper">
          <AccountsList />
        </div>
        <ModalForm {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  form: getForm(state),
  modal: getModal(state),
  isEdit: getForm(state).id !== undefined,
  accountOptions: getAccountsAsOptions(state).filter(
    option => option.key !== getForm(state).id
  ),
  EditForm: AccountForm
});


