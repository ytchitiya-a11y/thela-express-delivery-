import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import { syncDeliveryPartner } from '../api/client';
import { joinPartnerRoom } from '../socket';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        try {
          const { data } = await syncDeliveryPartner({});
          setPartner(data.partner);
          joinPartnerRoom(data.partner.id); // start listening for new_order events
        } catch (err) {
          console.error('Failed to sync delivery partner', err);
        }
      } else {
        setPartner(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signup = async (email, password, name, vehicle_type) => {
    await createUserWithEmailAndPassword(auth, email, password);
    const { data } = await syncDeliveryPartner({ name, vehicle_type });
    setPartner(data.partner);
    joinPartnerRoom(data.partner.id);
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ firebaseUser, partner, setPartner, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
