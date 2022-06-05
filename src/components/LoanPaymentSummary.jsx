import React from "react";

function LoanPaymentSummary() {
  return (
    <div className="mt-6 grid font-orb text-sm">
      <p className="flex gap-3">
        <span className="w-1/2 text-right  text-levi-400">Monthly:</span>
        <span className="font-extrabold text-levi-300/90">16.480,00</span>
      </p>
      <p className="flex gap-3">
        <span className="w-1/2 text-right  text-levi-400">Loan Amount:</span>
        <span className="font-extrabold text-levi-300/90">1.000.000,00</span>
      </p>
      <p className="flex gap-3">
        <span className="w-1/2 text-right  text-levi-400">Total Paid:</span>
        <span className="font-extrabold text-levi-300/90">1.947.000,00</span>
      </p>
    </div>
  );
}

export default LoanPaymentSummary;
