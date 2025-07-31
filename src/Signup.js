import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    setError("");
    const res = await fetch(
      "https://flipkart-backend-1-pjtm.onrender.com/auth/signup",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setError(data.error || "Signup failed");
    }
  };
  return (
    <Box maxWidth={400} mx="auto" p={2}>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      {error && (
        <Box color="red" my={1}>
          {error}
        </Box>
      )}
      <Button
        onClick={handleSignup}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>
      <Box mt={2} textAlign="center">
        Already have an account? <Link to="/login">Login</Link>
      </Box>
    </Box>
  );
}
export default Signup;
