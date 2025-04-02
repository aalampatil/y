import React, { forwardRef, useId } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-gray-700 font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        type={type}
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
