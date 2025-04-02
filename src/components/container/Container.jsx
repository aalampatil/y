import React from "react";

function Container({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-4 md:py-6">
      {children}
    </div>
  );
}

export default Container;
