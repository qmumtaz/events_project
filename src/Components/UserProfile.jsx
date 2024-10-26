import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../firebase'; 
import { useAuth } from '../../AuthContext';

const UserProfile = () => {
  const { user } = useAuth(); 
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(firestore, `users/${user.uid}`);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserInfo(userSnap.data());
        } else {
          console.error('No such user data!');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [user]);

  return { userInfo, loading, error };
};

export default UserProfile;
