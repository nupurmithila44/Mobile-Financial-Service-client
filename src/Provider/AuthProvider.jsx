
import { createContext, useEffect, useState } from "react";

import PropTypes from 'prop-types'

import useAxiosSecure from "../Hook/useAxiosSecure";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null)
      const [loading, setLoading] = useState(true)
    const axiosSecure = useAxiosSecure()

    const setToken = async (user) => {
        try {
            const userInfo = user?.email;
            if (userInfo) {
                const res = await axiosSecure.post('/jwt', { userInfo });
                console.log(res.data.token)
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    return { token: res.data.token };
                }
            } else {
                throw new Error('User information is missing');
            }
        } catch (error) {
            console.error('Error setting token:', error.message);
            return null;
        }
    };


    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axiosSecure.post('/is-login', { token });
                    setUser(response.data.user);
                    setLoading(false);
                    return
                } catch (error) {
                    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                        logout();
                    } else {
                        console.error('Error checking login status:', error);
                    }
                }
            } else {
                setUser(null);
            }
            setLoading(true);
        };

        const interval = setInterval(checkToken, 50000); // Check every minute

        checkToken(); // Initial check

        return () => clearInterval(interval);
    }, [axiosSecure]);

    const signIn = async (email, pin) => {
        try {
            const res = await axiosSecure.post("/signIn", { email, pin });
            console.log(res.data)

            if (res?.data?.message === 'Login successful') {
                setToken(res?.data?.user);
                setUser(res?.data?.user);
                return res.data;
            } else {

                return res
            }
        } catch (error) {
            console.error('Login error:', error);
            return error
        }
    };


    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };


    console.log(user);


    const userInfo = {
        user,
        loading,
        setToken,
        signIn,
        logout
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {
                children
            }

        </AuthContext.Provider>
    );
}

export default AuthProvider;
AuthProvider.propTypes = {
    children: PropTypes.node
};