import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa"; // Importing pen icon from react-icons
import Example from "../Feed/Header/Header";

const Profile = () => {
  const [modalData, setModalData] = useState({ field: "", value: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    preference: [],
    district: "Chennai", // Default value for district
  });

  // Fetch user data from session storage on component mount
  useEffect(() => {
    const storedUserData = {
      name: sessionStorage.getItem("name") || "John Doe",
      email: sessionStorage.getItem("email") || "john.doe@example.com",
      preference: JSON.parse(sessionStorage.getItem("preference")) || [
        "Technology News",
      ],
      district: "Chennai", // Optional: Fetch from session storage if available
    };
    setUserData(storedUserData);
  }, []);

  const openModal = (field, value) => {
    setModalData({ field, value });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const updatedData = { ...userData, [modalData.field]: modalData.value };
    setUserData(updatedData);
    sessionStorage.setItem(
      modalData.field,
      modalData.field === "preference"
        ? JSON.stringify(modalData.value.split(",")) // Store as array for preferences
        : modalData.value
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <Example />
      <div className="min-h-screen flex flex-col md:flex-row bg-white">
        {/* Left Side - Profile Section */}
        <div className="w-full md:w-1/3 bg-gray-100 flex flex-col items-center justify-center py-10">
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"
            alt="User Profile"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-gray-200 shadow-lg"
          />
          <h2 className="text-gray-800 text-2xl md:text-3xl font-bold mt-6">
            {userData.name}
          </h2>
          <button className="mt-6 md:mt-8 px-6 md:px-8 py-2 md:py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-gray-700">
            Edit Profile
          </button>
        </div>

        {/* Right Side - User Details Section */}
        <div className="w-full md:w-2/3 bg-white flex flex-col justify-center p-6 md:p-10">
          <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-800 border-b-2 border-gray-300 pb-2 md:pb-3">
            User Details
          </h3>
          <div className="space-y-4 md:space-y-6">
            {Object.entries(userData).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <div>
                  <label className="block text-gray-500 text-sm capitalize">
                    {key}:
                  </label>
                  {key === "preference" && Array.isArray(value) ? (
                    <ul className="list-disc pl-5">
                      {value.map((item, index) => (
                        <li
                          key={index}
                          className="text-xl md:text-2xl font-medium text-gray-800"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xl md:text-2xl font-medium text-gray-800">
                      {value}
                    </p>
                  )}
                </div>
                <button
                  onClick={() =>
                    openModal(
                      key,
                      Array.isArray(value) ? value.join(", ") : value
                    )
                  }
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FaPen className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Edit {modalData.field}
            </h2>
            <input
              type="text"
              value={modalData.value}
              onChange={(e) =>
                setModalData({ ...modalData, value: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              For multiple preferences, separate them with commas.
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg shadow hover:bg-gray-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
