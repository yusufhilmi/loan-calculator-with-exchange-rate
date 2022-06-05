import React from "react";

function LoanPaymentSummary({ results, loan }) {
  return (
    <div className="mt-6 grid font-orb text-sm">
      <p className="flex gap-3">
        <span className="w-1/2 text-right text-levi-400  md:text-lg">
          Monthly:
        </span>
        <span className="font-extrabold text-levi-300/90 md:text-lg">
          {results.monthlyPayment}₺
        </span>
      </p>
      <p className="flex gap-3">
        <span className="w-1/2 text-right text-levi-400  md:text-lg">
          Loan Amount:
        </span>
        <span className="font-extrabold text-levi-300/90 md:text-lg">
          {new Intl.NumberFormat("tr-TR").format(loan.amount)}₺
        </span>
      </p>
      <p className="flex gap-3">
        <span className="w-1/2 text-right text-levi-400  md:text-lg">
          Total Paid:
        </span>
        <span className="font-extrabold text-levi-300/90 md:text-lg">
          {results.totalPaid}₺
        </span>
      </p>
    </div>
  );
}

export default LoanPaymentSummary;
