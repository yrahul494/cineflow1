import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET!); // Verify JWT token
        setAuthenticated(true);
      } catch (error) {
        console.log(error);
        setAuthenticated(false);
      }
    } else {
      setAuthenticated(false);
    }
    setLoading(false);  // Set loading to false after the check is complete
  }, []);

  // Removed the redirection logic from here and put it inside the layout component

  return { authenticated, loading };
};

export default useAuth;
