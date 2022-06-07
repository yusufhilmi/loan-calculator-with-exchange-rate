import React, { useState, useEffect } from "react";
import BreakdownTable from "./components/BreakdownTable";
import CalculatorForm from "./components/CalculatorForm";
import LoanPaymentSummary from "./components/LoanPaymentSummary";
import LoanSummary from "./components/LoanSummary";
import Share from "./components/Share";
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
    period: 12,
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

  useEffect(() => {
    const calculateLoan = () => {
      let monthly = calculateMonthly(
        loan.amount,
        loan.interestRate / 100,
        loan.term
      );
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
        monthlyPayment: new Intl.NumberFormat("tr-TR").format(
          monthly.toFixed(2)
        ),
        monthsBreakdown: monthlyPayments,
        totalPaid: new Intl.NumberFormat("tr-TR").format(
          (monthly * loan.term).toFixed(2)
        ),
        totalInterest: new Intl.NumberFormat("tr-TR").format(
          (monthly * loan.term - loan.amount).toFixed(2)
        ),
        averageExchangeRate: new Intl.NumberFormat("tr-TR").format(
          ((monthly * loan.term) / totalPaidEquivalent).toFixed(2)
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
        net: net,
      }));
    };
    calculateLoan();
  }, [loan, revenue, exchangeRate]);

  const getStateFromURL = () => {
    const url = new URL(window.location);
    const loan = {
      amount: Number(url.searchParams.get("amount")),
      interestRate: Number(url.searchParams.get("interestRate")),
      term: Number(url.searchParams.get("term")),
      showPrincipal:
        url.searchParams.get("principal") === "true" ? true : false,
    };
    if (loan.amount) {
      const exchangeRate = {
        current: Number(url.searchParams.get("exchangeRate")),
        increase: Number(url.searchParams.get("increase")),
      };
      console.log(loan);
      setLoan(loan);
      setExchangeRate(exchangeRate);

      if (url.searchParams.get("revenue")) {
        const revenue = {
          include: true,
          base: Number(url.searchParams.get("revenue")),
          growth: Number(url.searchParams.get("growth")),
          period: Number(url.searchParams.get("period")),
        };
        setRevenue(revenue);
      } else {
        setRevenue((prev) => ({
          ...prev,
          include: false,
        }));
      }

      // TODO: notify user, say welcome and let them know what they're looking at
      setResults((prev) => ({ ...prev, show: true }));
    }
  };

  useEffect(() => {
    getStateFromURL();
  }, []);

  return (
    <div className="m-2">
      <h1 className="my-4 text-center text-xl font-black md:mb-6 md:text-3xl xl:mb-12 xl:text-4xl">
        Loan Calculator <br />
        <span className="text-lg md:text-2xl xl:text-3xl">
          with Exchange Rate
        </span>
      </h1>
      <div className="grid md:grid-cols-2 md:gap-9 lg:gap-16">
        <div className="mx-auto mb-4 max-w-sm md:order-2 md:mx-0 md:my-auto md:justify-self-start">
          <h3 className="mb-4 text-center font-barlow text-lg font-light text-levi-400 md:text-xl">
            How much you actually will pay for a low interest rate loan in{" "}
            <span className="relative">
              <span className="tooltip underline decoration-dotted underline-offset-1">
                TRY
              </span>
              <span className="tooltip-content">
                Applicable to any other currency rapidly losing value against
                USD
              </span>
            </span>{" "}
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
            <div className="mt-8 md:hidden">
              <Warnings />
            </div>
          ) : (
            <LoanPaymentSummary
              loan={loan}
              results={results}
            ></LoanPaymentSummary>
          )}
        </div>

        <div className="min-w-sm hidden max-w-md justify-self-end md:order-1 md:block">
          <Warnings />
        </div>
      </div>

      {!results.show ? (
        ""
      ) : (
        <>
          <LoanSummary
            loan={loan}
            exchangeRate={exchangeRate}
            revenue={revenue}
            results={results}
          ></LoanSummary>
          <Share
            loan={loan}
            exchangeRate={exchangeRate}
            revenue={revenue}
            setResults={setResults}
          ></Share>
          <BreakdownTable
            results={results}
            loan={loan}
            revenue={revenue}
          ></BreakdownTable>
        </>
      )}
      <footer className="mt-8 mb-4 text-center text-sm">
        Created by{" "}
        <a
          href="https://twitter.com/yusufhilmi_"
          className="font-medium underline decoration-dotted"
        >
          Yusuf Hilmi
        </a>
        <br />
        <span className="text-xs">© 2022</span>
        <a
          className="fixed right-0 bottom-0 m-3 w-max  rounded-md bg-[#fedd00] p-2 font-medium text-levi-900 transition duration-200 ease-in-out hover:bg-[#e5cd31]"
          href="https://www.buymeacoffee.com/yusufhilmi"
        >
          <img
            src="/icons/coffee.svg"
            alt=""
            className="inline-block h-5 w-5"
          />
        </a>
      </footer>
    </div>
  );
}

export default App;
