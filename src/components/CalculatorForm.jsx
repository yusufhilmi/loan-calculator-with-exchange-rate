import React from "react";

function CalculatorForm(exchangeRate, setExchangeRate) {
  return (
    <form className="rounded-xl border-[0.25px] border-levi-600 bg-levi-800 p-6 px-3">
      <h4 className="mb-4 px-3 text-xl font-black">Assumptions</h4>
      <div className="gradient-border">
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
    </form>
  );
}

export default CalculatorForm;
