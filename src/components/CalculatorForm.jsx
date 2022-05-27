import React from "react";

function CalculatorForm() {
  return (
    <div className="flex justify-center">
      <form action="#" className="m-10 inline-block">
        <label htmlFor="loan-amount" className="mb-4 w-full">
          Loan Amount
          <input
            type="number"
            name="loan-amount"
            id="loan-amount"
            min="1000"
            max="9999999999"
            defaultValue={1000000}
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
              defaultValue={1.29}
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
              defaultValue={120}
            />
          </label>

          <input
            type="button"
            value="Calculate"
            className="bottom-0 self-end rounded-md bg-slate-300 p-2 text-slate-800"
          />
        </fieldset>
      </form>
    </div>
  );
}

export default CalculatorForm;
