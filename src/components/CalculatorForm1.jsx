import React, { useState, useEffect } from "react";

function CalculatorForm() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(1.29);
  const [loanTerm, setLoanTerm] = useState(120);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [exchangeRatePrice, setExchangeRatePrice] = useState(16.3);
  const [exchangeRateIncrease, setExchangeRateIncrease] = useState(1.7);
  const [totalPaidEquivalent, setTotalPaidEquivalent] = useState(0);

  const [rentalIncome, setRentalIncome] = useState(
    Math.round(loanAmount / 240 / 50) * 50
  );
  const [rentalIncomeIncrease, setRentalIncomeIncrease] = useState(17);
  const [totalRentalIncome, setTotalRentalIncome] = useState(0);
  const [totalRentalIncomeEquivalent, setTotalRentalIncomeEquivalent] =
    useState(0);

  const [months, setMonths] = useState(null);

  const calculateMonthly = (amount, interest, months) => {
    // there is more complex calculations of course but this simple one is enough for our purposes
    return (
      amount *
      ((interest * (1 + interest) ** months) / ((1 + interest) ** months - 1))
    );
  };

  const calculateLoan = () => {
    let monthly = calculateMonthly(loanAmount, interestRate / 100, loanTerm);
    setMonthlyPayment(monthly);
    const monthlyPayments = [];
    let remaining = loanAmount,
      assumedExchangeRate = exchangeRatePrice,
      totalPaidEquivalent = 0,
      rent = rentalIncome,
      totalRental = 0,
      totalRentalEquivalent = 0;
    let interest, principal, exhangeEquivalent, rentEquivalent;
    for (let i = 0; i < loanTerm; i++) {
      interest = remaining * (interestRate / 100);
      principal = monthly - interest;
      remaining = remaining - principal;
      // handle rounding error, reduce precision when there is time instead
      if (remaining < 0) {
        remaining = 0;
      }
      exhangeEquivalent = monthly / assumedExchangeRate;
      assumedExchangeRate *= 1 + exchangeRateIncrease / 100;
      totalPaidEquivalent += exhangeEquivalent;

      if (i % 12 === 0 && i !== 0) {
        console.log(i % 12);
        rent = Math.round((rent * (1 + rentalIncomeIncrease / 100)) / 50) * 50;
      }
      totalRental += rent;
      rentEquivalent = rent / assumedExchangeRate;
      totalRentalEquivalent += rentEquivalent;

      monthlyPayments.push([
        monthly,
        interest,
        principal,
        remaining,
        exhangeEquivalent,
        assumedExchangeRate,
        rent,
        rentEquivalent,
      ]);
    }
    setMonths(monthlyPayments);
    setTotalPaidEquivalent(totalPaidEquivalent);
    setTotalRentalIncome(totalRental);
    setTotalRentalIncomeEquivalent(totalRentalEquivalent);
  };

  // required because we're setting two other states and don't want infinite re-renders
  useEffect(() => {
    calculateLoan();
  }, []);

  useEffect(() => {
    calculateLoan();
  }, [
    loanAmount,
    interestRate,
    loanTerm,
    exchangeRateIncrease,
    exchangeRatePrice,
    rentalIncome,
    rentalIncomeIncrease,
  ]);

  return (
    <div className="flex flex-col items-center">
      <form action="/" className="m-10 inline-block">
        <fieldset className="flex flex-wrap">
          <label htmlFor="exchange-rate-price" className="mr-4">
            Exchange Rate (current price)
            <input
              type="number"
              name="exchange-rate-price"
              id="exchange-rate-price"
              step={0.01}
              value={exchangeRatePrice}
              onChange={(e) => {
                setExchangeRatePrice(Number(e.target.value));
              }}
            />
          </label>
          <label htmlFor="exchange-rate-increase" className="mr-4">
            Exchange Rate (monthly %)
            <input
              type="number"
              name="exchange-rate-increase"
              id="exchange-rate-increase"
              step={0.01}
              value={exchangeRateIncrease}
              onChange={(e) => {
                setExchangeRateIncrease(Number(e.target.value));
              }}
            />
          </label>
          <div className="h-0 basis-full"></div>
          <label htmlFor="rental-income" className="mt-4">
            Rental Income (TRY)
            <input
              type="number"
              name="rental-income"
              id="rental-income"
              step={100}
              value={rentalIncome}
              onChange={(e) => {
                setRentalIncome(Number(e.target.value));
              }}
            />
          </label>
          <label htmlFor="rental-income-increase" className="mt-4">
            Rental Income Increase
            <input
              type="number"
              name="rental-income-increase"
              id="rental-income-increase"
              step={1}
              value={rentalIncomeIncrease}
              onChange={(e) => {
                setRentalIncomeIncrease(Number(e.target.value));
              }}
            />
          </label>
        </fieldset>
        <label htmlFor="loan-amount" className="mb-4 w-full">
          Loan Amount
          <input
            type="number"
            name="loan-amount"
            id="loan-amount"
            min={1000}
            max={9999999999}
            value={loanAmount}
            onChange={(e) => {
              setLoanAmount(Number(e.target.value));
            }}
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
              min={0.01}
              max={10}
              step={0.01}
              value={interestRate}
              onChange={(e) => {
                setInterestRate(Number(e.target.value));
              }}
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
              value={loanTerm}
              onChange={(e) => {
                setLoanTerm(Number(e.target.value));
              }}
            />
          </label>

          <input
            type="submit"
            value="Calculate"
            className="bottom-0 cursor-pointer self-end rounded-md bg-slate-300 p-2 text-slate-800"
          />
        </fieldset>
      </form>

      <br />

      {monthlyPayment ? (
        <p className="mb-4 text-xl font-semibold">
          Monthly:{" "}
          {new Intl.NumberFormat("tr-TR").format(monthlyPayment.toFixed(2))}
          <br /> Loan Amount in TRY:{" "}
          {new Intl.NumberFormat("tr-TR").format(loanAmount.toFixed(2))}
          <br />
          Total Paid in TRY:{" "}
          {new Intl.NumberFormat("tr-TR").format(
            (monthlyPayment * loanTerm).toFixed(2)
          )}
          <br />
          Loan Amount Equivalent:{" "}
          {new Intl.NumberFormat("tr-TR").format(
            (loanAmount / exchangeRatePrice).toFixed(2)
          )}
          <br />
          Total Paid in USD:{" "}
          {new Intl.NumberFormat("tr-TR").format(
            totalPaidEquivalent.toFixed(2)
          )}
          <br />
          Total Rental Income:{" "}
          {new Intl.NumberFormat("tr-TR").format(totalRentalIncome.toFixed(2))}
          <br />
          Total Rental Income (USD):{" "}
          {new Intl.NumberFormat("tr-TR").format(
            totalRentalIncomeEquivalent.toFixed(2)
          )}
        </p>
      ) : (
        ""
      )}

      <div className="mt-8">
        {months ? (
          <table className="table-auto text-center">
            <thead className="sticky top-8 bg-slate-800 before:absolute before:-top-8 before:-left-1 before:z-10 before:h-8 before:w-[102%] before:bg-gray-900 after:absolute after:inset-0 after:w-full after:border-t after:border-b after:border-slate-500">
              <tr>
                <th className="border border-y-0 border-slate-500 p-2"></th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Payment
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Interest
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Principal
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Remaining
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Payment (USD)
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  USD/TRY
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Rental Income
                </th>
                <th className="border border-y-0 border-slate-500 p-2">
                  Rental Income (USD)
                </th>
              </tr>
            </thead>
            <tbody>
              {months.map((month, i) => {
                return (
                  <tr key={i}>
                    <td className="border border-slate-500 bg-slate-800 p-2 font-semibold">
                      Month {i + 1}
                    </td>
                    <td className="border border-slate-500 p-2">
                      {new Intl.NumberFormat("tr-TR").format(
                        month[0].toFixed(2)
                      )}
                      ₺
                    </td>
                    <td className="border border-slate-500 p-2">
                      {new Intl.NumberFormat("tr-TR").format(
                        month[1].toFixed(2)
                      )}
                      ₺
                    </td>
                    <td className="border border-slate-500 p-2">
                      {new Intl.NumberFormat("tr-TR").format(
                        month[2].toFixed(2)
                      )}
                      ₺
                    </td>
                    <td className="border border-slate-500 p-2">
                      {new Intl.NumberFormat("tr-TR").format(
                        month[3].toFixed(2)
                      )}
                      ₺
                    </td>
                    <td className="border border-slate-500 p-2">
                      $
                      {new Intl.NumberFormat("tr-TR").format(
                        month[4].toFixed(2)
                      )}
                    </td>
                    <td className="border border-slate-500 p-2">
                      {new Intl.NumberFormat("tr-TR").format(
                        month[5].toFixed(2)
                      )}
                    </td>
                    <td className="border border-slate-500 p-2">
                      {new Intl.NumberFormat("tr-TR").format(month[6])}₺
                    </td>
                    <td className="border border-slate-500 p-2">
                      $
                      {new Intl.NumberFormat("tr-TR").format(
                        month[7].toFixed(2)
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td className="border border-slate-500 bg-slate-800 p-2 font-semibold">
                  TOTAL
                </td>
                <td className="border border-slate-500 p-2">
                  {new Intl.NumberFormat("tr-TR").format(
                    (monthlyPayment * loanTerm).toFixed(2)
                  )}
                  ₺
                </td>
                <td className="border border-slate-500 p-2">
                  {new Intl.NumberFormat("tr-TR").format(
                    (monthlyPayment * loanTerm - loanAmount).toFixed(2)
                  )}
                  ₺
                </td>
                <td className="border border-slate-500 p-2">
                  {new Intl.NumberFormat("tr-TR").format(loanAmount)}₺
                </td>
                <td className="border border-slate-500 p-2">0₺</td>
                <td className="border border-slate-500 p-2">
                  $
                  {new Intl.NumberFormat("tr-TR").format(
                    totalPaidEquivalent.toFixed(2)
                  )}
                </td>
                <td className="border border-slate-500 p-2">
                  {new Intl.NumberFormat("tr-TR").format(
                    ((monthlyPayment * loanTerm) / totalPaidEquivalent).toFixed(
                      2
                    )
                  )}
                </td>
                <td className="border border-slate-500 p-2">
                  {new Intl.NumberFormat("tr-TR").format(
                    totalRentalIncome.toFixed(2)
                  )}
                  ₺
                </td>
                <td className="border border-slate-500 p-2">
                  $
                  {new Intl.NumberFormat("tr-TR").format(
                    totalRentalIncomeEquivalent.toFixed(2)
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CalculatorForm;
