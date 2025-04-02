import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg font-medium transition duration-300 ease-in-out ${bgColor} ${textColor} hover:brightness-90 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
