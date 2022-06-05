import React, { useState, useEffect } from "react";
import CalculatorForm from "./components/CalculatorForm";
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
    show: false,
    monthsBreakdown: null,
    monthlyPayment: null,
    totalPaid: null,
    totalPaidEquivalent: null,
    totalRevenue: null,
    totalRevenueEquivalent: null,
    net: null,
  });

  const calculateMonthly = (amount, interest, months) => {
    // there is more complex calculations of course but this simple one is enough for our purposes
    return (
      amount *
      ((interest * (1 + interest) ** months) / ((1 + interest) ** months - 1))
    );
  };

  const calculateLoan = () => {
    let monthly = calculateMonthly(
      loan.amount,
      loan.interestRate / 100,
      loan.term
    );
    // setResults((prev) => ({ ...prev, monthlyPayment: monthly }));
    const monthlyPayments = [];
    let remaining = loan.amount,
      assumedExchangeRate = exchangeRate.current,
      totalPaidEquivalent = 0,
      rev = revenue.base,
      totalRevenue = 0,
      totalRevenueEquivalent = 0;
    let interest, principal, exhangeEquivalent, revEquivalent;
    for (let i = 0; i < loan.term; i++) {
      interest = remaining * (loan.interestRate / 100);
      principal = monthly - interest;
      remaining = remaining - principal;
      // handle rounding error, reduce precision when there is time instead
      if (remaining < 0) {
        remaining = 0;
      }
      exhangeEquivalent = monthly / assumedExchangeRate;
      assumedExchangeRate *= 1 + exchangeRate.increase / 100;
      totalPaidEquivalent += exhangeEquivalent;

      if (revenue.include) {
        if (i % 12 === 0 && i !== 0) {
          console.log(i % 12);
          rev = Math.round((rev * (1 + revenue.growth / 100)) / 50) * 50;
        }
        totalRevenue += rev;
        revEquivalent = rev / assumedExchangeRate;
        totalRevenueEquivalent += revEquivalent;
      }

      monthlyPayments.push([
        monthly,
        interest,
        principal,
        remaining,
        exhangeEquivalent,
        assumedExchangeRate,
        rev,
        revEquivalent,
      ]);
    }

    const net =
      loan.amount / exchangeRate.current -
      totalPaidEquivalent +
      totalRevenueEquivalent;
    setResults((prev) => ({
      ...prev,
      monthlyPayment: new Intl.NumberFormat("tr-TR").format(monthly.toFixed(2)),
      monthsBreakdown: monthlyPayments,
      totalPaid: new Intl.NumberFormat("tr-TR").format(
        (monthly * loan.term).toFixed(2)
      ),
      totalPaidEquivalent: new Intl.NumberFormat("tr-TR").format(
        totalPaidEquivalent.toFixed(2)
      ),
      totalRevenue: new Intl.NumberFormat("tr-TR").format(
        totalRevenue.toFixed(2)
      ),
      totalRevenueEquivalent: new Intl.NumberFormat("tr-TR").format(
        totalRevenueEquivalent.toFixed(2)
      ),
      net: new Intl.NumberFormat("tr-TR").format(net.toFixed(2)),
    }));
  };

  useEffect(() => {
    calculateLoan();
  }, [loan, revenue, exchangeRate]);

  return (
    <div className="m-2">
      <h1 className="mb-4 text-center text-xl font-black md:text-3xl xl:text-4xl">
        Loan Calculator <br />
        <span className="text-lg md:text-2xl xl:text-3xl">
          with Exchange Rate and Inflation
        </span>
      </h1>
      <div className="mb-12">
        <h3 className="mb-4 text-center font-barlow text-lg text-levi-400 md:text-xl">
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
        {!results.show ? (
          <Warnings />
        ) : (
          <LoanPaymentSummary
            loan={loan}
            results={results}
          ></LoanPaymentSummary>
        )}
      </div>
      {!results.show ? (
        ""
      ) : (
        <LoanSummary
          loan={loan}
          exchangeRate={exchangeRate}
          revenue={revenue}
          results={results}
        ></LoanSummary>
      )}
    </div>
  );
}

export default App;
