import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signInWithEmail, user, logout } = useAuth();
  const navigate = useNavigate();

  // If already logged in and an admin, redirect to admin dashboard
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminEmails = ["nagesh.amcec@gmail.com", "admin@ssgs.com"];
        const isHardcodedAdmin = user.email && adminEmails.includes(user.email.toLowerCase());
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const isFirestoreAdmin = userDoc.exists() && userDoc.data().role === "admin";
        
        if (isFirestoreAdmin || isHardcodedAdmin) {
          navigate("/admin");
        } else {
          // Log them out if they aren't an admin
          await logout();
          toast.error("Access Denied: You are not an administrator.");
          setLoading(false);
        }
      }
    };
    
    // Only check if we are not actively in the middle of a login submission
    // to prevent race conditions with AuthContext state updates.
    if (!loading && user) {
      checkAdminStatus();
    }
  }, [user, navigate, logout, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      // 1. Sign in the user
      await signInWithEmail(email, password);
      toast.success("Authenticating admin...");
      setLoading(false);
      // useEffect will handle the redirect once `user` state updates
    } catch (error: any) {
      console.error("Admin login error:", error);
      let errorMessage = "Invalid admin credentials.";
      if (error.code === "auth/invalid-credential") errorMessage = "Incorrect email or password.";
      else if (error.code === "auth/user-not-found") errorMessage = "No account found with this email.";
      else if (error.code === "auth/wrong-password") errorMessage = "Incorrect password.";
      
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-secondary/30 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-card/80 backdrop-blur-xl text-card-foreground rounded-3xl shadow-xl p-8 border border-border/50"
      >
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden mb-6 shadow-md border p-1 flex items-center justify-center">
            <img src="/favicon.jpg?v=3" alt="SSGS Logo" className="w-full h-full object-cover rounded-xl" loading="lazy" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground text-sm">Secure access for authorized personnel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingInput 
            type="email" 
            label="Administrator Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-14 bg-background/50 border-border/60 focus-within:bg-background"
          />

          <FloatingInput 
            type="password" 
            label="Security Key / Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-14 bg-background/50 border-border/60 focus-within:bg-background"
          />

          <Button 
            type="submit" 
            size="lg"
            className="w-full h-12 mt-4 font-semibold shadow-md hover:shadow-lg transition-all" 
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <><Lock className="h-5 w-5 mr-2" /> Authenticate</>
            )}
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 mx-auto mb-2 opacity-50" />
          <p>Protected by SSGS Security Protocol.</p>
          <a href="/login" className="text-primary hover:text-primary/80 font-medium hover:underline mt-3 inline-block transition-colors">
            Return to Customer Login
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
