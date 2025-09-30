import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set up axios defaults
  useEffect(() => {
    // Force API base URL to backend to avoid Next.js /api route collisions
    axios.defaults.baseURL = 'http://localhost:5000/api';
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token and get user data
      verifyToken(token);
    } else {
      // For development: if no token and server is not running, create a mock user
      if (process.env.NODE_ENV === 'development') {
        console.log('No token found, using mock authentication for development');
        const mockUser = {
          id: 'dev-user-1',
          email: 'admin@school.com',
          role: 'admin',
          profile: {
            firstName: 'System',
            lastName: 'Admin'
          }
        };
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: mockUser,
            token: 'dev-token',
          },
        });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get('/api/auth/me');
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data,
          token,
        },
      });
    } catch (error) {
      // For development: if server is not running, create a mock user
      if (process.env.NODE_ENV === 'development' && error.code === 'ECONNREFUSED') {
        console.log('Server not running, using mock authentication for development');
        const mockUser = {
          id: 'dev-user-1',
          email: 'admin@school.com',
          role: 'admin',
          profile: {
            firstName: 'System',
            lastName: 'Admin'
          }
        };
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: mockUser,
            token: 'dev-token',
          },
        });
        return;
      }
      
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: 'LOGOUT' });
    }
  };

  const login = async (email, password) => {
    try {
      // Ensure base URL is set for this request
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });

      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      // For development: if server is not running, use mock login
      if (process.env.NODE_ENV === 'development' && (error.code === 'ECONNREFUSED' || error.message.includes('Network Error'))) {
        console.log('Server not running, using mock login for development');
        const mockUser = {
          id: 'dev-user-1',
          email: email || 'admin@school.com',
          role: 'admin',
          profile: {
            firstName: 'System',
            lastName: 'Admin'
          }
        };
        const mockToken = 'dev-token';
        
        localStorage.setItem('token', mockToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: mockUser, token: mockToken },
        });

        toast.success('Login successful! (Development Mode)');
        return { success: true };
      }
      
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });

      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/auth/profile', { profile: profileData });
      dispatch({
        type: 'UPDATE_USER',
        payload: response.data.user,
      });
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put('/api/auth/change-password', {
        currentPassword,
        newPassword,
      });
      toast.success('Password changed successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Password change failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
