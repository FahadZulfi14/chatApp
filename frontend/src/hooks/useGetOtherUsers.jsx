// import React, { useEffect } from 'react';
// import axios from 'axios';
// import {useDispatch} from 'react-redux'
// import { setOtherUsers } from '../redux/userSlice';
// import { BACKEND_URL } from '../assets/config.jsx';

// const useGetOtherUsers = () => {
//     const dispatch = useDispatch();

    
//   useEffect(()=>{
//     const fetchOtherUser = async ()=>{
//         try {
//             axios.defaults.withCredentials = true;
//             const res = await axios.get(`${BACKEND_URL}/api/user`);
//             dispatch(setOtherUsers(res.data))
//             console.log("railway back url", BACKEND_URL)
//         } catch (error) {
//              console.log("can't provide users, Login first ", error)
            
//         }
//     };
//     fetchOtherUser()


//   },[])
// }

// export default useGetOtherUsers;





import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import { BACKEND_URL } from '../assets/config.jsx';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                // Make the request with credentials (cookie) included
                const res = await axios.get(`${BACKEND_URL}/api/user`, {
                    withCredentials: true  // Ensure cookies are sent with the request
                });
                
                // Dispatch users data to Redux store
                dispatch(setOtherUsers(res.data));  // Adjust if the API response structure differs
                console.log("Backend URL:", BACKEND_URL);
            } catch (error) {
                console.error("Can't provide users, Login first:", error.response?.data?.message || error.message);
                // Optionally, handle the error (e.g., show a login prompt or redirect)
            }
        };

        fetchOtherUsers();
    }, [dispatch]);  // Add `dispatch` in the dependency array to avoid warnings

};

export default useGetOtherUsers;
