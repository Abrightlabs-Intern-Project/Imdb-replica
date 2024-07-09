import { useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";


const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { tokens } = await fetchAuthSession();
        const groups = tokens?.accessToken.payload["cognito:groups"] || []
        setIsAdmin(groups.toString()==="admins")
      } catch (error) {
        console.log("")
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  return { isAdmin, loading };
};

export default useIsAdmin;
