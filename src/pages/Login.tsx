import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import { isSignInWithEmailLink } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // Default to Sign Up
  const [loading, setLoading] = useState(false);
  const { signInWithEmail, signUpWithEmail, completeMagicLinkSignIn, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If user is already logged in, redirect them
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  // Handle returning from magic link
  useEffect(() => {
    const handleEmailLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        setLoading(true);
        try {
          await completeMagicLinkSignIn(window.location.href);
          toast.success("Successfully signed in!");
          const from = (location.state as any)?.from?.pathname || "/";
          navigate(from, { replace: true });
        } catch (error: any) {
          toast.error("Error signing in: " + error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    handleEmailLink();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isSignUp && !name) {
      toast.error("Please enter your name");
      return;
    }
    
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name);
        toast.success("Account created successfully!");
      } else {
        await signInWithEmail(email, password);
        toast.success("Successfully signed in!");
      }
      
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Invalid email or password.";
      
      if (error.code === "auth/email-already-in-use") errorMessage = "An account with this email already exists.";
      else if (error.code === "auth/weak-password") errorMessage = "Password should be at least 6 characters.";
      else if (error.code === "auth/user-not-found") errorMessage = "No account found with this email.";
      else if (error.code === "auth/wrong-password") errorMessage = "Incorrect password.";
      else if (error.message) errorMessage = error.message;
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Successfully signed in!");
    } catch (error: any) {
      toast.error("Error signing in with Google: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-secondary/30 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-card rounded-2xl shadow-xl p-8 border"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp ? "Sign up to start ordering" : "Sign in to manage your orders"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {isSignUp && (
            <FloatingInput 
              type="text" 
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={isSignUp}
            />
          )}
          
          <FloatingInput 
            type="email" 
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <FloatingInput 
              type="password" 
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            {isSignUp && <p className="text-xs text-muted-foreground mt-1 ml-1">Must be at least 6 characters</p>}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <>{isSignUp ? "Sign Up" : "Sign In"} <ArrowRight className="h-4 w-4 ml-2" /></>
            )}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <button 
            type="button" 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline"
          >
            {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full bg-white text-black hover:bg-gray-50 border-gray-200" 
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </Button>
      </motion.div>
    </div>
  );
};

export default LoginPage;
