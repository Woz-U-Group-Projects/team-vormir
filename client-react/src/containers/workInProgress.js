import React from 'react';
import { Message } from 'semantic-ui-react';

export default () => (
  <Message
    size="large"
    icon="hourglass half"
    header="Work in Progress"
    content="Enter Budget expenses Here!"
  />

);
// eslint-disable-next-line no-unused-expressions
<div id="container"></div>

anychart.onDocumentReady(function () {
anychart.theme('sea') });
  var chart = anychart.pie([
      ['Income', 6371664],
      ['Expenses', 789622],
      ['Savings', 7216301]
  ]);
  chart.title('Budgetizer');
  chart.labels().position('outside');
  chart.legend().title()
      .enabled(true)
      .text('Retail channels')
      .padding([0, 0, 10, 0]);
  chart.legend()
      .position('center-bottom')
      .itemsLayout('horizontal')
      .align('center');
  chart.container('container');
  chart.draw();