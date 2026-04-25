import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  sendMagicLink: (email: string) => Promise<void>;
  completeMagicLinkSignIn: (url: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if user exists in Firestore, if not create
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        let role = "customer";
        const adminEmails = ["nagesh.amcec@gmail.com", "admin@ssgs.com"];
        const isHardcodedAdmin = currentUser.email && adminEmails.includes(currentUser.email.toLowerCase());
        
        if (!userDoc.exists()) {
          role = isHardcodedAdmin ? "admin" : "customer";
          await setDoc(userDocRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || "",
            role: role,
            createdAt: new Date().toISOString()
          });
        } else {
          role = userDoc.data().role || "customer";
        }
        
        setIsAdmin(role === "admin" || isHardcodedAdmin);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const sendMagicLink = async (email: string) => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain must be in the authorized domains list in the Firebase Console.
      url: window.location.origin + "/login",
      handleCodeInApp: true,
    };
    
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  };

  const completeMagicLinkSignIn = async (url: string) => {
    if (isSignInWithEmailLink(auth, url)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation attacks, ask for the email again.
        email = window.prompt('Please provide your email for confirmation');
      }
      
      if (email) {
        await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem('emailForSignIn');
      }
    }
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    
    // Create the user profile in Firestore immediately
    const userDocRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userDocRef, {
      uid: userCredential.user.uid,
      email: email,
      displayName: name,
      role: "customer",
      createdAt: new Date().toISOString()
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, sendMagicLink, completeMagicLinkSignIn, signInWithGoogle, signInWithEmail, signUpWithEmail, logout, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
