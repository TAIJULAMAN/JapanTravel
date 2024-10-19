import { createContext, useReducer, useEffect } from "react";
import {
  authReducer,
  initialState,
  LOGOUT,
  LOAD_USER,
  SET_LOADING,
} from "../../../Reducers/authReducer";
import { userProfile } from "../../../common/api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      dispatch({ type: SET_LOADING });
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const profileData = await userProfile();
          if (profileData?.result) {
            dispatch({ type: LOAD_USER, payload: profileData.result });
          } else {
            dispatch({ type: LOGOUT });
          }
        } catch (error) {
          console.error("Error loading user profile", error);
          dispatch({ type: LOGOUT });
        }
      } else {
        dispatch({ type: LOGOUT });
      }
    };

    loadUser();
  }, []);

  const signOut = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
