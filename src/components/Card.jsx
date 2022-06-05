import React from "react";

function Card({
  title,
  iconPath,
  shadowColor = "shadow-levi-200/10",
  children,
}) {
  return (
    <div
      className={`rounded-xl border-[0.25px] border-levi-600 bg-levi-800 p-6 text-sm shadow-[0px_0px_10px_0px] ${shadowColor} md:text-base`}
    >
      <div className="mb-3 flex items-center md:text-lg lg:text-xl">
        <span>
          <img src={iconPath} alt="" />
        </span>
        <h2 className="ml-3 font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default Card;
