import React from "react";

function BreakdownTable({ results, loan }) {
  return (
    <div className="mt-12">
      <table className="text-center">
        <thead className="bg-levi-800">
          <tr>
            <th></th>
            <th>Payment</th>
            {loan.showPrincipal ? <th>Interest</th> : ""}
            {loan.showPrincipal ? <th>Principal</th> : ""}
            {loan.showPrincipal ? <th>Remaining</th> : ""}
            <th>$</th>
            <th className="tracking-tighter">USD / TRY</th>
            <th>Revenue</th>
            <th>$</th>
          </tr>
        </thead>
        <tbody>
          {results.monthsBreakdown.map((month, i) => {
            return (
              <tr key={i}>
                <td className="bg-levi-800 font-medium">Month {i + 1}</td>
                <td>
                  {new Intl.NumberFormat("tr-TR").format(month[0].toFixed(2))}₺
                </td>
                {loan.showPrincipal ? (
                  <td>
                    {new Intl.NumberFormat("tr-TR").format(month[1].toFixed(2))}
                    ₺
                  </td>
                ) : (
                  ""
                )}
                {loan.showPrincipal ? (
                  <td>
                    {new Intl.NumberFormat("tr-TR").format(month[2].toFixed(2))}
                    ₺
                  </td>
                ) : (
                  ""
                )}
                {loan.showPrincipal ? (
                  <td>
                    {new Intl.NumberFormat("tr-TR").format(month[3].toFixed(2))}
                    ₺
                  </td>
                ) : (
                  ""
                )}
                <td>
                  ${new Intl.NumberFormat("tr-TR").format(month[4].toFixed(2))}
                </td>
                <td>
                  {new Intl.NumberFormat("tr-TR").format(month[5].toFixed(2))}
                </td>
                <td>
                  {new Intl.NumberFormat("tr-TR").format(month[6].toFixed(2))}₺
                </td>
                <td>
                  ${new Intl.NumberFormat("tr-TR").format(month[7].toFixed(2))}
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="bg-levi-800 font-orb font-medium">TOTAL</td>
            <td className="bg-levi-800">{results.totalPaid}₺</td>
            {loan.showPrincipal ? (
              <td className="bg-levi-800">{results.totalInterest}₺</td>
            ) : (
              ""
            )}
            {loan.showPrincipal ? (
              <td className="bg-levi-800">
                {new Intl.NumberFormat("tr-TR").format(loan.amount.toFixed(2))}₺
              </td>
            ) : (
              ""
            )}
            {loan.showPrincipal ? <td className="bg-levi-800">0₺</td> : ""}
            <td className="bg-levi-800">${results.totalPaidEquivalent}</td>
            <td className="bg-levi-800">{results.averageExchangeRate}</td>
            <td className="bg-levi-800">{results.totalRevenue}₺</td>
            <td className="bg-levi-800">${results.totalRevenueEquivalent}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BreakdownTable;
