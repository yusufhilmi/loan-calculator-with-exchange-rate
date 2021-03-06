import React from "react";

function LoanSummary({ loan, exchangeRate, results, revenue }) {
  return (
    <div className="mt-6 grid font-orb">
      <p className="flex gap-3">
        <span className="w-1/2 text-right text-levi-300 md:text-xl">
          Loan Amount:
        </span>
        <span className="text-lg font-extrabold text-emerald-400 md:text-2xl">
          +${(loan.amount / exchangeRate.current).toFixed(2)}
        </span>
      </p>
      <p className="flex gap-3">
        <span className="w-1/2 text-right text-levi-300 md:text-xl">
          Total Paid:
        </span>
        <span className="text-lg font-extrabold text-red-400 md:text-2xl">
          -$
          {results.totalPaidEquivalent ? results.totalPaidEquivalent : ""}
        </span>
      </p>
      {revenue.include ? (
        <p className="flex gap-3">
          <span className="w-1/2 text-right text-levi-300 md:text-xl">
            Total Revenue:
          </span>
          <span className="text-lg font-extrabold text-emerald-400 md:text-2xl">
            +$
            {results.totalRevenueEquivalent
              ? results.totalRevenueEquivalent
              : ""}
          </span>
        </p>
      ) : (
        ""
      )}
      <p className="flex gap-3">
        <span className="w-1/2 text-right font-black text-levi-200 md:text-xl">
          Net:
        </span>
        {results.net > 0 ? (
          <span className="text-lg font-extrabold text-emerald-400 md:text-2xl">
            +${new Intl.NumberFormat("tr-TR").format(results.net.toFixed(2))}
          </span>
        ) : (
          <span className="text-lg font-extrabold text-red-400 md:text-2xl">
            -${new Intl.NumberFormat("tr-TR").format(-results.net.toFixed(2))}
          </span>
        )}
      </p>
    </div>
  );
}

export default LoanSummary;
