import React, { useState, useEffect } from "react";

function Share({ loan, exchangeRate, revenue, setResults }) {
  const [isCopied, setIsCopied] = useState(false);
  const [url, setUrl] = useState(null);
  const [tweetUrl, setTweetUrl] = useState(null);

  const updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip).then(
      function () {
        setIsCopied(true);
      },
      function () {
        console.error("something went wrong while copying the link");
      }
    );
  };

  const shareOnTwitter = (href) => {
    const searchParams = new URLSearchParams();

    // construct the share url
    searchParams.append("url", href);
    searchParams.append("via", "yusufhilmi");
    searchParams.append(
      "text",
      "Check out how much profit you can make by taking out a loan in this crazy exchange rate and inflation. Go to "
    );
    return `https://twitter.com/intent/tweet?${searchParams}`;
  };

  useEffect(() => {
    const constructSharingURL = () => {
      const url = new URL(window.location);

      const params = {
        amount: loan.amount,
        interestRate: loan.interestRate,
        term: loan.term,
        principal: loan.showPrincipal,
        exchangeRate: exchangeRate.current,
        increase: exchangeRate.increase,
      };
      if (revenue.include) {
        Object.assign(params, {
          revenue: revenue.base,
          growth: revenue.growth,
          period: revenue.period,
        });
      }
      url.search = new URLSearchParams(params);
      return url;
    };
    const href = constructSharingURL();
    setUrl(href);
    if (href) {
      setTweetUrl(shareOnTwitter(href));
    }
  }, []);

  const handleClick = () => {
    updateClipboard(url.href);
  };

  return (
    <div className="mt-8 flex justify-center gap-4">
      <a
        className="flex w-max cursor-pointer items-center rounded-lg bg-[#1d9bf0] p-2  px-3 font-orb font-semibold hover:bg-[#1d9cf0e3]"
        href={tweetUrl}
      >
        <img
          src="/icons/twitter.svg"
          alt=""
          className="mr-1.5 inline-block h-5 w-5"
        />{" "}
        Share
      </a>
      <div
        className="flex w-max cursor-pointer items-center rounded-lg border-[0.5px] border-levi-500 bg-levi-800 p-2 font-orb text-sm font-light font-light hover:bg-levi-700"
        onClick={handleClick}
      >
        {!isCopied ? (
          <img
            src="/icons/link.svg"
            alt=""
            className="mr-1.5 inline-block h-4 w-4 transition duration-300"
          />
        ) : (
          ""
        )}
        {isCopied ? "Copied to clipboard" : "Copy link"}
      </div>
    </div>
  );
}

export default Share;
