import React from "react";
import CalculatorForm from "./components/CalculatorForm";

function App() {
  return (
    <div className="m-2">
      <h1 className="text-center text-2xl font-extrabold">
        Loan Calculator <br />
        <span>with Exchange Rate and Inflation</span>
      </h1>
      {/* <main></main> */}
      <CalculatorForm></CalculatorForm>
    </div>
  );
}

export default App;
