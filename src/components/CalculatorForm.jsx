import React, { useState, useEffect } from "react";

function CalculatorForm() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(1.29);
  const [loanTerm, setLoanTerm] = useState(120);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [months, setMonths] = useState(null);

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
    let remaining = loanAmount;
    let interest, principal;
    for (let i = 0; i < loanTerm; i++) {
      interest = remaining * (interestRate / 100);
      principal = monthly - interest;
      remaining = remaining - principal;
      monthlyPayments.push([monthly, interest, principal, remaining]);
    }
    setMonths(monthlyPayments);
  };

  // required because we're setting two other states and don't want infinite renders
  useEffect(() => {
    calculateLoan();
  }, []);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="flex flex-col items-center">
      <form action="/" className="m-10 inline-block">
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
        <p className="text-xl font-semibold">{monthlyPayment}</p>
      ) : (
        ""
      )}
      <ol>
        {months ? (
          months.map((month, i) => {
            return (
              <li>
                <span className="mr-2 font-semibold">Month {i + 1}</span>:{" "}
                {month[0].toFixed(2)} : {month[1].toFixed(2)} :{" "}
                {month[2].toFixed(2)} : {month[3].toFixed(2)}
              </li>
            );
          })
        ) : (
          <p>HOLA</p>
        )}
      </ol>
    </div>
  );
}

export default CalculatorForm;
