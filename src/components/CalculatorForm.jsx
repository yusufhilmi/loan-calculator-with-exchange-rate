import React from "react";

function CalculatorForm(exchangeRate, setExchangeRate) {
  return (
    <form className="rounded-xl border-[0.25px] border-levi-600 bg-levi-800 p-6 px-3">
      <h4 className="mb-4 px-3 text-xl font-black">Assumptions</h4>
      <div className="gradient-border mb-4">
        <div className="rounded-lg border-transparent bg-levi-800 p-3">
          <h5 className="mb-1 font-semibold text-levi-300">Exchange Rate</h5>
          <fieldset className="mb-4 flex justify-between">
            <label htmlFor="exchange-rate-price" className="mr-4">
              Current
              <input
                type="number"
                name="exchange-rate-price"
                id="exchange-rate-price"
                step={0.01}
                // value={exchangeRate}
                // onChange={(e) => {
                //   setExchangeRate(Number(e.target.value));
                // }}
              />
            </label>
            <label htmlFor="exchange-rate-increase">
              Increase % (mo)
              <input
                type="number"
                name="exchange-rate-increase"
                id="exchange-rate-increase"
                step={0.01}
                // value={exchangeRate}
                // onChange={(e) => {
                //   setExchangeRate(Number(e.target.value));
                // }}
              />
            </label>
          </fieldset>
          <div className="mb-1 flex">
            <h5 className="mr-3 font-semibold text-levi-300">Revenue</h5>
            <div className="mb-1 flex h-max justify-evenly gap-x-1 self-end rounded border border-levi-400 bg-levi-900 px-1 py-[1px] font-orb text-[0.5rem] leading-[10px]">
              <span className="font-semibold">Yes</span>
              <div className="h-[calc(100% + 0.25rem)] my-[-1px] w-[1px] bg-levi-400"></div>
              <span className="font-light text-levi-400">No</span>
            </div>
          </div>
          <fieldset className="flex justify-between">
            <label htmlFor="revenue-monthly" className="mr-4">
              Monthly
              <input
                type="number"
                name="revenue-monthly"
                id="revenue-monthly"
                step={100}
                // value={exchangeRate}
                // onChange={(e) => {
                //   setExchangeRate(Number(e.target.value));
                // }}
              />
            </label>
            <label
              htmlFor="revenue-growth-period"
              className="mr-4 basis-[15rem]"
            >
              Growth Period (mo)
              <input
                type="number"
                name="revenue-growth-period"
                id="revenue-growth-period"
                step={100}
                // value={exchangeRate}
                // onChange={(e) => {
                //   setExchangeRate(Number(e.target.value));
                // }}
              />
            </label>
            <label htmlFor="revenue-growth-rate" className="basis-32">
              Growth %
              <input
                type="number"
                name="revenue-growth-rate"
                id="revenue-growth-rate"
                step={0.01}
                // value={exchangeRate}
                // onChange={(e) => {
                //   setExchangeRate(Number(e.target.value));
                // }}
              />
            </label>
          </fieldset>
        </div>
      </div>
      <h4 className="mb-2 px-3 text-xl font-black">Loan</h4>
      <div className="px-3">
        <fieldset className="mb-2 flex justify-between">
          <label htmlFor="loan-amount" className="mr-4">
            Amount
            <input
              type="number"
              name="loan-amount"
              id="loan-amount"
              step={100}
              // value={exchangeRate}
              // onChange={(e) => {
              //   setExchangeRate(Number(e.target.value));
              // }}
            />
          </label>
          <label htmlFor="loan-interest-rate" className="mr-4 basis-40">
            Interest Rate %
            <input
              type="number"
              name="loan-interest-rate"
              id="loan-interest-rate"
              step={0.01}
              // value={exchangeRate}
              // onChange={(e) => {
              //   setExchangeRate(Number(e.target.value));
              // }}
            />
          </label>
          <label htmlFor="loan-term" className="basis-28">
            Term (mo)
            <input
              type="number"
              name="loan-term"
              id="loan-term"
              step={0.01}
              // value={exchangeRate}
              // onChange={(e) => {
              //   setExchangeRate(Number(e.target.value));
              // }}
            />
          </label>
        </fieldset>
        <label
          htmlFor="show-pricipal"
          className="w-full flex-row items-center justify-between"
        >
          Show principal, and remaining for each month?
          <input
            className="ml-2 mt-0 basis-4 appearance-none bg-levi-900 bg-contain text-levi-900 checked:bg-emerald-400"
            type="checkbox"
            name="show-principal"
            id="show-principal"
          />
        </label>
        <input
          type="submit"
          value="Calculate"
          className="mt-6 w-full bg-gradient-to-r from-blue-600 via-purple-700 to-fuchsia-600 py-2 text-center font-orb font-extrabold"
        />
      </div>
    </form>
  );
}

export default CalculatorForm;
