import React, { useState } from "react";
import CalculatorForm from "./components/CalculatorForm";
import Card from "./components/Card";
import LoanPaymentSummary from "./components/LoanPaymentSummary";
import LoanSummary from "./components/LoanSummary";
import Warnings from "./components/Warnings";

function App() {
  const [loan, setLoan] = useState({
    amount: 1000000,
    term: 120,
    interestRate: 1.29,
    showPrincipal: false,
  });

  const [exchangeRate, setExchangeRate] = useState({
    current: 16.4,
    increase: 1.7,
  });

  const [revenue, setRevenue] = useState({
    include: true,
    base: Math.round(loan.amount / 240 / 50) * 50,
    growth: 17,
    growthPeriod: 12,
  });

  const [results, setResults] = useState({
    months: null,
    monthlyPayment: null,
    totalPaid: null,
    totalPaidEquivalent: null,
    totalRevenue: null,
    totalRevenueEquivalent: null,
  });

  return (
    <div className="m-2">
      <h1 className="text-center text-xl font-black md:text-3xl xl:text-4xl">
        Loan Calculator <br />
        <span className="text-lg md:text-2xl xl:text-3xl">
          with Exchange Rate and Inflation
        </span>
      </h1>
      <Warnings />
      <div className="mb-12">
        <h3 className="mb-8 text-center font-barlow text-lg text-levi-400 md:text-xl">
          How much you actually will pay for a low interest rate loan in{" "}
          <abbr title="or any other currency losing value against USD">
            TRY
          </abbr>{" "}
          when you’re earning USD.
        </h3>
        <CalculatorForm
          loan={loan}
          setLoan={setLoan}
          exchangeRate={exchangeRate}
          setExchangeRate={setExchangeRate}
          revenue={revenue}
          setRevenue={setRevenue}
          setResults={setResults}
        ></CalculatorForm>
        <LoanPaymentSummary></LoanPaymentSummary>
      </div>

      <LoanSummary></LoanSummary>
    </div>
  );
}

export default App;
