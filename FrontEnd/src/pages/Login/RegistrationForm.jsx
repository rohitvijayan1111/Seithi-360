import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import avatar from "../../images/avatar.jpg";


const TamilNaduDistricts = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivagangai",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi (Tuticorin)",
  "Tiruchirappalli (Trichy)",
  "Tirunelveli",
  "Tirupattur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",
];

const RegistrationForm = () => {
  const [isRegistration, setIsRegistration] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    preferredCategories: [],
    languagePreference: "english",
    dateOfBirth: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => {
      const updatedCategories = checked
        ? [...prevData.preferredCategories, value]
        : prevData.preferredCategories.filter((category) => category !== value);
      return { ...prevData, preferredCategories: updatedCategories };
    });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Step 1: Register the user
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, district: selectedDistrict }),
      });

      if (response.ok) {
        alert("Registration successful!");

        // Step 2: Send a confirmation email
        const emailResponse = await fetch("http://localhost:5000/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: formData.email, // User's email address
            subject: "கணினி_X's செய்தி360 User Registration",
            text: "Congratulations! Your account has been successfully registered with செய்தி360. We are excited to bring you personalized and local news tailored to your preferences. Stay informed and connected with the stories that matter most to you. Welcome to the செய்தி360 community! ",
          }),
        });

        if (emailResponse.ok) {
          alert("A confirmation email has been sent.");
        } else {
          console.error("Failed to send email.");
          alert(
            "Registration successful, but the confirmation email could not be sent."
          );
        }

        // Reset form fields
        setFormData({
          name: "",
          email: "",
          password: "",
          mobile: "",
          preferredCategories: [],
          languagePreference: "english",
          dateOfBirth: "",
        });
        setSelectedDistrict("");
        navigate("/home");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("preference", data.preference);
        sessionStorage.setItem("languages", data.languages);
        sessionStorage.setItem("district", data.district);
        navigate("/home");
        // Handle success (e.g., redirect to dashboard or show success message)
      } else {
        console.error("Login failed:", data.message);
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        background: "linear-gradient(to bottom, #ffffff, #e6e6ff)",
        padding: 2,
      }}
    >
      <Grid item xs={12} md={4}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          bgcolor="#f3e5f5"
          p={3}
          borderRadius={4}
          boxShadow={3}
        >
          <Avatar src={avatar} sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" color="#6a1b9a">
            Welcome to செய்தி360
          </Typography>
          <Typography variant="body1" textAlign="center" color="#4a148c">
            Get personalized updates by registering with us.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper elevation={6} sx={{ borderRadius: 4, p: 4 }}>
          <Box
            component="form"
            onSubmit={isRegistration ? handleSubmit : handleLogin}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              color="#4a148c"
              mb={3}
            >
              {isRegistration ? "Register" : "Login"}
            </Typography>

            {isRegistration ? (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Mobile Number (Optional)"
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Location (District)</InputLabel>
                  <Select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                  >
                    {TamilNaduDistricts.map((district, index) => (
                      <MenuItem key={index} value={district}>
                        {district}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormGroup>
                  {["Politics", "Sports", "Technology", "Entertainment"].map(
                    (category) => (
                      <FormControlLabel
                        key={category}
                        control={
                          <Checkbox
                            value={category}
                            checked={formData.preferredCategories.includes(
                              category
                            )}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={category}
                      />
                    )
                  )}
                </FormGroup>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </>
            ) : (
              <>
                <div>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    margin="normal"
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                    <br />
                  <br />
                </div>
              </>
            )}

            <Box textAlign="center" mt={3}>
              {isRegistration ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ px: 5 }}
                >
                  Register
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ px: 5 }}
                >
                  Login
                </Button>
              )}
            </Box>

            <Box textAlign="center" mt={2}>
              <Button
                variant="text"
                onClick={() => setIsRegistration(!isRegistration)}
              >
                {isRegistration
                  ? "Already have an account? Login"
                  : "New user? Register"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
