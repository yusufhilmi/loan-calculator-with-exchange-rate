import React from "react";

function Card({
  title,
  iconPath,
  shadowColor = "shadow-levi-200/10",
  children,
}) {
  return (
    <div
      className={`rounded-xl border-[0.25px] border-levi-600 bg-levi-900 p-6 text-sm shadow-[0px_0px_10px_0px] ${shadowColor}`}
    >
      <div className="mb-1 flex items-center md:text-base">
        <span>
          <img src={iconPath} alt="" />
        </span>
        <h2 className="ml-2 font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default Card;
