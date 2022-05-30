import React from "react";
import CalculatorForm from "./components/CalculatorForm";

function App() {
  return (
    <div className="m-2">
      <h1 className="text-center text-2xl font-extrabold">
        Loan Calculator <br />
        <span>with Exchange Rate and Inflation</span>
      </h1>
      <main className="mx-auto mt-4 w-1/3">
        <p>
          The rationale behind this calculator is to see if taking out a loan in
          a high inflation market with low interest rate makes sense. Especially
          if you take into account that you'll be converting USD to pay monthly
          installments.
          <br />
          Of course it is impossible to know how the future will look like and
          that's why the default values will be more conservatist. You'll be
          able to adjust the expected increase in exchange rate and housing
          market yearly. For example in Turkey the average price per sqft
          increased %110 between 2021 and 2022. In the last 10 years USDTRY get
          to 16.30 from 1.80 levels. That is around %800 increase. This
          calculator is for my personal use and that's why I didn't add any
          models that predict what USDTRY and the housing market will look like.
          I open-sourced it for anyone who wants to play around and extend it.
          Feel free to reach out!
        </p>
      </main>
      <CalculatorForm></CalculatorForm>
    </div>
  );
}

export default App;
