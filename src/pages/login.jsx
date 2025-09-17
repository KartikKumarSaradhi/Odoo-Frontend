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
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
    db: "MainDB",
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (!login.email || !login.password || !login.db) {
        toast.error("Please fill in all fields");
        return;
      }

      const res = await axios.get("http://localhost:8069/odoo_connect", {

        headers: {
          "Content-Type": "application/json",
          db: login.db,
          login: login.email,
          password: login.password,
        },
      });

      console.log("Odoo response:", res.data);

      const data = res.data;

      toast.success("Login successful 🎉");

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      console.log("Stored user in localStorage:", data.user);

      setIsAnimating(true);
      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Login failed"
      );
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
                          // type="email"
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
