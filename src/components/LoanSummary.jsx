import React from "react";

function LoanSummary() {
  return (
    <div className="mt-6 grid font-orb">
      <p className="flex gap-3">
        <span className="w-1/2 text-right text-levi-300">Loan Amount:</span>
        <span className="text-lg font-extrabold text-emerald-400">
          $61.349,00
        </span>
      </p>
      <p className="flex gap-3">
        <span className="w-1/2 text-right text-levi-300">Total Paid:</span>
        <span className="text-lg font-extrabold text-red-400">-$53.420,00</span>
      </p>
      <p className="flex gap-3">
        <span className="w-1/2 text-right text-levi-300">Total Revenue:</span>
        <span className="text-lg font-extrabold text-emerald-400">
          $22.413,00
        </span>
      </p>
      <p className="flex gap-3">
        <span className="w-1/2 text-right font-black text-levi-200">Net:</span>
        <span className="text-lg font-extrabold text-emerald-400">
          $31.442,00
        </span>
      </p>
    </div>
  );
}

export default LoanSummary;
