import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication =true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoader(false);
    if (authStatus !== authentication) {
      navigate(authentication ? "/login" : "/");
    }
  }, [authStatus, authentication, navigate]);

  return loader ? (
    <p className="text-center text-gray-500">Loading...</p>
  ) : (
    children
  );
}

export default Protected;
