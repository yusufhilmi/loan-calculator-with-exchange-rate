import React, { useState } from "react";
import CalculatorForm from "./components/CalculatorForm";
import Card from "./components/Card";

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
      <main className="m-4 grid gap-8">
        <Card
          title="High Inflation Market"
          iconPath="/icons/fire.svg"
          shadowColor="shadow-orange-400/20"
        >
          <p>
            The goal is to see if taking out a loan in a high inflation, low
            interest rate market makes sense when the base income is more stable
            like USD. Similar to everything in life,
            <b>the variables you’ll set in this calculator is a bet</b>. A bet
            on future. I didn’t add any prediction models because it is hard to
            predict what’ll happen.
            <b> Please think thoroughly, and make your own research.</b>
          </p>
        </Card>
        <Card
          title="Volatile Exchange Rate"
          iconPath="/icons/red-chart.svg"
          shadowColor="shadow-red-400/20"
        >
          <p>
            Another downside of high inflation is the volatility and increase in
            the exchange rate. For Turkey, the USDTRY was trading around 1.80 in
            2012. In 10 year period it <b>increased %800</b> and it was an
            exponential growth. That’s why in this calculator the increase in
            exchange rate is set to <b>monthly</b>. Check the table to see how
            the exchange rate is gonna look like in the future.
          </p>
        </Card>
        <Card
          title="Revenue"
          iconPath="/icons/money.svg"
          shadowColor="shadow-emerald-400/20"
        >
          <p>
            If you expect to have revenue by using the loan, you can add the
            <b> monthly base</b> , <b>growth</b>, and <b>growth period</b>. With
            these three variables it is possible to simulate most types of
            revenue. For example, for a rental income the growth level is
            limited to %17 per year in Turkey. If you know what rental market
            looks like you will be able to calculate your revenue for the period
            you’ll be paying this loan. Also take into account, due to high
            inflation there can be a higher growth rate depending on the usage
            of capital.
          </p>
        </Card>
      </main>
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
      </div>
    </div>
  );
}

export default App;
