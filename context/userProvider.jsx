import { useState, createContext, useEffect  } from "react";
import { getNotifications, test } from "../services"
import useIsLogined from '../hooks/useIsLogined';
import useLoginUser from '../hooks/useLoginUser';

export const UserContext = createContext();

export const UserProvider = props => {
    const { children } = props;
    const [error, setError] = useState(); 
    const [notifications, setNotifications] = useState([]);    
    const { isLogined, setIsLogined } = useIsLogined();
    const { loginUser, setLoginUser } = useLoginUser();

    const fetchData = async _ => {
      try {
        if(isLogined == false)
        {
          return ;
        }
        const response = await getNotifications();
        setNotifications(response);
        //setTimeout(fetchData, 2000);
        const tres = await test();
        console.log(tres);
      } catch (err) {
        setError(err);
      }        
    };

    useEffect(() => {
      fetchData();
    }, []);
    const value = {
        notifications: notifications,
        reLoadNotification: fetchData,
        isLogined,
        setIsLogined,
        loginUser,
        setLoginUser
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};