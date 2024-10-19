import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userProfile } from "../common/api/authApi";

const PrivateRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  

  const getCurrentUsers = async () => {
    setLoading(true);
    const user = await userProfile();
    setCurrentUser(user?.result);
    setLoading(false);
  };

  useEffect(() => {
    const callBackCurrentUser = async ()=>{
       await getCurrentUsers();
        setLoading(false)
    }
    callBackCurrentUser()
    setLoading(true)
  }, []);

  if (loading) {
    return (
      <progress className="progress progress-secondary w-56" value="100" max="100"></progress>
    );
  }

  if (!currentUser) {
  
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
