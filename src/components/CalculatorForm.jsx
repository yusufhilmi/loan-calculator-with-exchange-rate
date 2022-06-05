import React, { useState } from "react";

function CalculatorForm(props) {
  const [showButton, setShowButton] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setResults((prev) => ({ ...prev, show: true }));
    setShowButton(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border-[0.25px] border-levi-600 bg-levi-800 p-6 px-3"
    >
      <h4 className="mb-2 px-3 text-xl font-black">Assumptions</h4>
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
                min={0}
                step={0.01}
                value={props.exchangeRate.current}
                onChange={(e) => {
                  props.setExchangeRate((prev) => ({
                    ...prev,
                    current: Number(e.target.value),
                  }));
                }}
              />
            </label>
            <label htmlFor="exchange-rate-increase">
              <span className="flex justify-between">
                Increase % (mo)
                <div className="relative mr-2 inline">
                  <img
                    src="/icons/info.svg"
                    alt=""
                    className="tooltip  inline"
                  />
                  <div className="tooltip-content icon">
                    This approximates to{" "}
                    <span className="font-semibold">
                      %
                      {(
                        (1 + props.exchangeRate.increase / 100) ** 12 * 100 -
                        100
                      ).toFixed(2)}
                    </span>{" "}
                    increase per year.
                  </div>
                </div>
              </span>
              <input
                type="number"
                name="exchange-rate-increase"
                id="exchange-rate-increase"
                step={1.4}
                value={props.exchangeRate.increase}
                onChange={(e) => {
                  props.setExchangeRate((prev) => ({
                    ...prev,
                    increase: Number(e.target.value),
                  }));
                }}
              />
            </label>
          </fieldset>
          <div className="mb-1 flex">
            <h5 className="mr-3 font-semibold text-levi-300">
              Revenue
              <div className="relative inline">
                <img
                  src="/icons/info.svg"
                  alt=""
                  className="tooltip ml-2 inline"
                />
                <div className="tooltip-content icon">
                  This is the revenue you expect to generate by using this
                  capital.
                </div>
              </div>
            </h5>
            <div className="mb-1 flex h-max cursor-pointer justify-evenly gap-x-1 self-end rounded border border-levi-400 bg-levi-900 px-1 py-[1px] font-orb text-[0.5rem] leading-[10px]">
              <span
                className={
                  props.revenue.include
                    ? "font-semibold"
                    : "font-light text-levi-400"
                }
                onClick={(e) => {
                  props.setRevenue((prev) => ({ ...prev, include: true }));
                }}
              >
                Yes
              </span>
              <div className="h-[calc(100% + 0.25rem)] my-[-1px] w-[1px] bg-levi-400"></div>
              <span
                className={
                  props.revenue.include
                    ? "font-light text-levi-400"
                    : "font-semibold"
                }
                onClick={(e) => {
                  props.setRevenue((prev) => ({ ...prev, include: false }));
                }}
              >
                No
              </span>
            </div>
          </div>
          {props.revenue.include ? (
            <fieldset className="flex justify-between">
              <label htmlFor="revenue-monthly" className="mr-4">
                Monthly
                <input
                  type="number"
                  name="revenue-monthly"
                  id="revenue-monthly"
                  min={0}
                  step={1}
                  value={props.revenue.base}
                  onChange={(e) => {
                    props.setRevenue((prev) => ({
                      ...prev,
                      base: Number(e.target.value),
                    }));
                  }}
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
                  min={1}
                  step={1}
                  value={props.revenue.growthPeriod}
                  onChange={(e) => {
                    props.setRevenue((prev) => ({
                      ...prev,
                      growthPeriod: Number(e.target.value),
                    }));
                  }}
                />
              </label>
              <label htmlFor="revenue-growth-rate" className="basis-32">
                Growth %
                <input
                  type="number"
                  name="revenue-growth-rate"
                  id="revenue-growth-rate"
                  min={0}
                  step={1}
                  value={props.revenue.growth}
                  onChange={(e) => {
                    props.setRevenue((prev) => ({
                      ...prev,
                      growth: Number(e.target.value),
                    }));
                  }}
                />
              </label>
            </fieldset>
          ) : (
            ""
          )}
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
              step={10000}
              value={props.loan.amount}
              onChange={(e) => {
                props.setLoan((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }));
              }}
            />
          </label>
          <label htmlFor="loan-interest-rate" className="mr-4 basis-40">
            Interest Rate %
            <input
              type="number"
              name="loan-interest-rate"
              id="loan-interest-rate"
              step={0.01}
              value={props.loan.interestRate}
              onChange={(e) => {
                props.setLoan((prev) => ({
                  ...prev,
                  interestRate: Number(e.target.value),
                }));
              }}
            />
          </label>
          <label htmlFor="loan-term" className="basis-28">
            Term (mo)
            <input
              type="number"
              name="loan-term"
              id="loan-term"
              step={0.01}
              value={props.loan.term}
              onChange={(e) => {
                props.setLoan((prev) => ({
                  ...prev,
                  term: Number(e.target.value),
                }));
              }}
            />
          </label>
        </fieldset>
        <label
          htmlFor="show-pricipal"
          className="w-full flex-row items-center justify-between text-sm"
        >
          Show principal, and remaining for each month?
          <input
            className="ml-2 mt-0 basis-4 appearance-none bg-levi-900 bg-contain text-levi-900 checked:bg-emerald-200"
            type="checkbox"
            name="show-principal"
            id="show-principal"
            onChange={(e) => {
              props.setLoan((prev) => ({
                ...prev,
                showPrincipal: Number(e.target.checked),
              }));
            }}
          />
        </label>
        {!showButton ? (
          ""
        ) : (
          <button className="mt-6 w-full  rounded-md bg-gradient-to-r from-blue-600 via-purple-700 to-fuchsia-600 py-2 text-center font-orb font-extrabold outline-none transition-colors hover:from-blue-700 hover:via-purple-700 hover:to-fuchsia-700">
            Calculate
          </button>
        )}
      </div>
    </form>
  );
}

export default CalculatorForm;
