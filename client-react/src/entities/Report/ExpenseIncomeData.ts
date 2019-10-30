import format from 'date-fns/format';
import getDaysInMonth from 'date-fns/get_days_in_month';
import range from 'lodash/range';
import Currency, { ExchangeRateT } from 'entities/Currency';
import { ReportStateT, ReportDataT, ReportTimespanT } from 'entities/Report';
import { TransactionStateT, TransationKindT } from 'entities/Transaction';
import { toUtcTimestamp } from 'util/timezone';

const { Expense, Income } = TransationKindT;

export default function ExpenseIncomeData(
  report: ReportStateT,
  transactions: TransactionStateT[],
  exchangeRate: ExchangeRateT,
  base: string
): ReportDataT {
  const labels =
    report.timespan === ReportTimespanT.Yearly
      ? range(0, 12).map(month => format(new Date().setMonth(month), 'MMM'))
      : range(1, getDaysInMonth(report.date.start) + 1).map(day =>
          `${day}`.padStart(2, '0')
        );
  const data = [
    new Array(labels.length).fill(0), // income series
    new Array(labels.length).fill(0) // expense series
  ];

  for (const tx of transactions) {
    if (tx.kind !== Expense && tx.kind !== Income) continue;

    const period = format(
      toUtcTimestamp(tx.date),
      report.timespan === ReportTimespanT.Yearly ? 'M' : 'D'
    );
    data[tx.kind === Income ? 0 : 1][parseInt(period) - 1] += Currency.convert(
      Math.abs(tx.amount),
      exchangeRate[tx.currency],
      base,
      tx.currency
    );
  }

  return {
    labels,
    series: data.map(set =>
      set.map(amount => Math.floor(Currency.centsToNumber(amount, base)))
    )
  };
}
