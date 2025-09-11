import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent } from "../components/ui/tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (!login.email || !login.password) {
        toast.error("Please fill in all fields");
        return;
      }

      if (!validateEmail(login.email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(login),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save user info to localStorage
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success("Login successful 🎉");
      setIsAnimating(true);

      setTimeout(() => {
        navigate("/home"); 
      }, 1200);
    } catch (error) {
      toast.error(error.message);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://aashdit.com/assets/img/slider/slider2.jpeg')",
      }}
    >
      <AnimatePresence>
        {!isAnimating && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ x: 800, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-[400px] mr-[500px]"
          >
            <Tabs defaultValue="login" className="w-full">
              <TabsContent value="login">
                <Card className="backdrop-blur-md bg-opacity-40 shadow-2xl border border-white/30 rounded-xl text-white">
                  <CardHeader>
                    <CardTitle className="font-sans md:font-serif text-3xl">
                      <strong>Aashdit Technologies</strong>
                    </CardTitle>
                    <CardDescription>
                      Login your password here. After signup, you'll be logged
                      in.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                      }}
                    >
                      <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          value={login.email}
                          onChange={changeInputHandler}
                          placeholder="Eg. patel@gmail.com"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          type="password"
                          name="password"
                          value={login.password}
                          onChange={changeInputHandler}
                          placeholder="Eg. xyz"
                          required
                        />
                      </div>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
