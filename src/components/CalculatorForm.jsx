import React, { useState, useEffect } from "react";

function CalculatorForm() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(1.29);
  const [exchangeRatePrice, setExchangeRatePrice] = useState(16.3);
  const [exchangeRateIncrease, setExchangeRateIncrease] = useState(1.7);
  const [loanTerm, setLoanTerm] = useState(120);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [months, setMonths] = useState(null);
  const [totalPaidEquivalent, setTotalPaidEquivalent] = useState(0);

  const calculateMonthly = (amount, interest, months) => {
    // there is more complex calculations of course but this simple one is enough for our purposes
    return (
      amount *
      ((interest * (1 + interest) ** months) / ((1 + interest) ** months - 1))
    );
  };

  const calculateLoan = () => {
    let monthly = calculateMonthly(loanAmount, interestRate / 100, loanTerm);
    setMonthlyPayment(monthly);
    const monthlyPayments = [];
    let remaining = loanAmount,
      assumedExchangeRate = exchangeRatePrice,
      totalPaidEquivalent = 0;
    let interest, principal, exhangeEquivalent;
    for (let i = 0; i < loanTerm; i++) {
      interest = remaining * (interestRate / 100);
      principal = monthly - interest;
      remaining = remaining - principal;
      exhangeEquivalent = monthly / assumedExchangeRate;
      assumedExchangeRate *= 1 + exchangeRateIncrease / 100;
      totalPaidEquivalent += exhangeEquivalent;
      monthlyPayments.push([
        monthly,
        interest,
        principal,
        remaining,
        exhangeEquivalent,
        assumedExchangeRate,
      ]);
    }
    setMonths(monthlyPayments);
    setTotalPaidEquivalent(totalPaidEquivalent);
  };

  // required because we're setting two other states and don't want infinite re-renders
  useEffect(() => {
    calculateLoan();
  }, []);

  useEffect(() => {
    calculateLoan();
  }, [
    loanAmount,
    interestRate,
    loanTerm,
    exchangeRateIncrease,
    exchangeRatePrice,
  ]);

  return (
    <div className="flex flex-col items-center">
      <form action="/" className="m-10 inline-block">
        <fieldset className="flex">
          <label htmlFor="exchange-rate-price" className="mr-4">
            Exchange Rate (current price)
            <input
              type="number"
              name="exchange-rate-price"
              id="exchange-rate-price"
              step={0.01}
              value={exchangeRatePrice}
              onChange={(e) => {
                setExchangeRatePrice(Number(e.target.value));
              }}
            />
          </label>
          <label htmlFor="exchange-rate-increase" className="mr-4">
            Exchange Rate (monthly %)
            <input
              type="number"
              name="exchange-rate-increase"
              id="exchange-rate-increase"
              step={0.01}
              value={exchangeRateIncrease}
              onChange={(e) => {
                setExchangeRateIncrease(Number(e.target.value));
              }}
            />
          </label>
        </fieldset>
        <label htmlFor="loan-amount" className="mb-4 w-full">
          Loan Amount
          <input
            type="number"
            name="loan-amount"
            id="loan-amount"
            min="1000"
            max="9999999999"
            value={loanAmount}
            onChange={(e) => {
              setLoanAmount(Number(e.target.value));
            }}
            step={1000}
            className="max-w-full"
          />
        </label>
        <fieldset className="flex">
          <label htmlFor="interest-rate" className="mr-4">
            Interest Rate
            <input
              type="number"
              name="interest-rate"
              id="interest-rate"
              min={0}
              max={10}
              step={0.01}
              value={interestRate}
              onChange={(e) => {
                setInterestRate(Number(e.target.value));
              }}
            />
          </label>

          <label htmlFor="loan-term" className="mr-4">
            Loan Term (months)
            <input
              type="number"
              name="loan-term"
              id="loan-term"
              min={0}
              max={360}
              value={loanTerm}
              onChange={(e) => {
                setLoanTerm(Number(e.target.value));
              }}
            />
          </label>

          <input
            type="submit"
            value="Calculate"
            className="bottom-0 cursor-pointer self-end rounded-md bg-slate-300 p-2 text-slate-800"
          />
        </fieldset>
      </form>

      <br />

      {monthlyPayment ? (
        <p className="mb-4 text-xl font-semibold">
          Monthly: {monthlyPayment}
          <br /> Loan Amount in TRY: {loanAmount}
          <br />
          Total Paid in TRY: {monthlyPayment * loanTerm}
          <br />
          Loan Amount Equivalent: {loanAmount / exchangeRatePrice}
          <br />
          Total Paid in USD: {totalPaidEquivalent}
        </p>
      ) : (
        ""
      )}

      <div className="max-h-[40vh] overflow-scroll md:max-h-max">
        {months ? (
          <table className="table-auto">
            <thead className="sticky top-0 bg-slate-800 shadow-lg shadow-slate-800 after:absolute after:inset-0 after:w-full after:border-t after:border-b after:border-slate-500 md:shadow-none">
              <tr>
                <th className="border border-y-0 border-slate-500 p-2"></th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Payment
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Interest
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Principal
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Remaining
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Equivalent
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Assumed Exchange Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {months.map((month, i) => {
                return (
                  <tr key={i}>
                    <td className="border border-slate-500 bg-slate-800 p-2 font-semibold">
                      Month {i + 1}
                    </td>
                    <td className="border border-slate-500 p-2">
                      {month[0].toFixed(2)}
                    </td>
                    <td className="border border-slate-500 p-2">
                      {month[1].toFixed(2)}
                    </td>
                    <td className="border border-slate-500 p-2">
                      {month[2].toFixed(2)}
                    </td>
                    <td className="border border-slate-500 p-2">
                      {month[3].toFixed(2)}
                    </td>
                    <td className="border border-slate-500 p-2">
                      {month[4].toFixed(2)}
                    </td>
                    <td className="border border-slate-500 p-2">
                      {month[5].toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CalculatorForm;
