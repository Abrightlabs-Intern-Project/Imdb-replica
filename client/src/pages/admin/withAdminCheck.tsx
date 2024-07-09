// withAdminCheck.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useIsAdmin from "./useIsAdmin";

const withAdminCheck = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const { isAdmin, loading } = useIsAdmin();

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAdmin ? <Component {...props} /> : <Navigate to="/" />;
  };
};

export default withAdminCheck;
