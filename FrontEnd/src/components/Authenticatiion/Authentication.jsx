import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { toast, ToastContainer } from "react-toastify";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    district: "",
    area: "", 
    preferredCategories: [],
    languagePreference: "english", 
    dateOfBirth: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (isLogin) {
      setLoginData({
        ...loginData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCategoryChange = (event) => {
    const { options } = event.target;
    const selectedCategories = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({
      ...formData,
      preferredCategories: selectedCategories,
    });
  };


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
        });

        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("preference", data.preference);
        sessionStorage.setItem("languages", data.languages);
        sessionStorage.setItem("district", data.district);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("email", data.email);

        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else {
        toast.error(`Login failed: ${data.message}`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleSubmit = isLogin
    ? handleLogin
    : async (event) => {
        event.preventDefault();

        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            toast.success(
              "Registration successful! Please log in to continue.",
              {
                position: "top-right",
                autoClose: 5000, 
              }
            );
            navigate("/auth");


            const emailResponse = await fetch(
              `${process.env.REACT_APP_BACKEND}/send-email`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: formData.email,
                  subject: "கணினி_X's செய்தி360 User Registration",
                  text: `Congratulations ${formData.name}! Your account has been successfully registered with செய்தி360.`,
                }),
              }
            );

            if (emailResponse.ok) {
              toast.info("A confirmation email has been sent.", {
                position: "top-right",
                autoClose: 5000,
              });
            } else {
              console.error("Failed to send email.");
              toast.warn(
                "Registration successful, but the confirmation email could not be sent.",
                {
                  position: "top-right",
                  autoClose: 5000,
                }
              );
            }

            setFormData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              mobile: "",
              district: "",
              area: "",
              preferredCategories: [],
              languagePreference: "english",
              dateOfBirth: "",
            });

            setIsLogin(true);
          } else {
            toast.error("Failed to register. Please try again.", {
              position: "top-right",
              autoClose: 5000,
            });
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("An error occurred. Please try again later.", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative flex justify-center items-center rounded-lg shadow-lg overflow-hidden bg-gray-50 p-4">
            <img
              alt="Branding"
              src="seithi360-logo-bg.png"
              className="w-full h-auto max-h-80 lg:max-h-[500px] object-contain"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-center bg-gradient-to-t from-black/50 via-transparent to-transparent p-6">
              <h1 className="text-white text-2xl font-bold mb-2">Seithi360</h1>
              <p className="text-white text-sm">Developed by கணினி_X team</p>
            </div>
          </div>

          <div className="flex justify-center items-center bg-white p-8 rounded-lg shadow-lg">
            <div className="w-full max-w-md">
              <h2 className="text-center text-2xl font-bold text-black mb-6">
                {isLogin ? "Sign in to your account" : "Create an account"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-black"
                    >
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={isLogin ? loginData.email : formData.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-black"
                    >
                      Mobile Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={isLogin ? loginData.password : formData.password}
                      onChange={handleInputChange}
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-2 text-base text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-black"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium text-black"
                    >
                      District
                    </label>
                    <div className="mt-2">
                      <input
                        id="district"
                        name="district"
                        type="text"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label
                      htmlFor="area"
                      className="block text-sm font-medium text-black"
                    >
                      Area
                    </label>
                    <div className="mt-2">
                      <input
                        id="area"
                        name="area"
                        type="text"
                        value={formData.area || ""}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label
                      htmlFor="preferredCategories"
                      className="block text-sm font-medium text-black"
                    >
                      Preferred Categories
                    </label>
                    <div className="mt-2 space-y-2">
                      {[
                        "Technology",
                        "Health",
                        "Business",
                        "Sports",
                        "Entertainment",
                      ].map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            id={`category-${category}`}
                            type="checkbox"
                            value={category}
                            checked={formData.preferredCategories.includes(
                              category
                            )}
                            onChange={(e) => {
                              const { checked, value } = e.target;
                              setFormData((prevData) => ({
                                ...prevData,
                                preferredCategories: checked
                                  ? [...prevData.preferredCategories, value]
                                  : prevData.preferredCategories.filter(
                                      (cat) => cat !== value
                                    ),
                              }));
                            }}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="ml-2 block text-sm text-black"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label
                      htmlFor="languagePreference"
                      className="block text-sm font-medium text-black"
                    >
                      Language Preference
                    </label>
                    <div className="mt-2">
                      <select
                        id="languagePreference"
                        name="languagePreference"
                        value={formData.languagePreference}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="english">English</option>
                        <option value="tamil">Tamil</option>
                      </select>
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-black"
                    >
                      Date of Birth
                    </label>
                    <div className="mt-2">
                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-2 text-base text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {isLogin ? "Sign in" : "Create Account"}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={toggleForm}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
