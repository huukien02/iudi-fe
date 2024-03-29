import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import NotFound from "../NotFound/NotFound";
import Footer from "../Footer/Footer";
import ModalChangePassWord from "../Modal/ModalChangePassWord";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import {
  FaUser,
  FaMale,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import ModalMyGroups from "../Modal/ModalMyGroups";

function Profile() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpenChangePass, setIsModalOpenChangePass] = useState(false);
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
  useEffect(() => {
    const storedData = localStorage.getItem("IuDiToken");
    const userNameIuDi = localStorage.getItem("UserNameIuDi");
    setUserName(userNameIuDi);
    if (storedData) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `https://api.iudi.xyz/api/profile/${userName}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userName]);

  const openModal = () => {
    setIsModalOpenChangePass(true);
  };

  const closeModal = () => {
    setIsModalOpenChangePass(false);
  };

  const openModalGroup = () => {
    setIsModalOpenGroup(true);
  };

  const closeModalGroup = () => {
    setIsModalOpenGroup(false);
  };

  return (
    <>
      {!isLogin ? (
        <NotFound />
      ) : (
        //<div className="min-h-screen bg-gradient-to-b from-green-500 via-green-400 to-green-300">
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(29,120,36,1) 0%, rgba(44,186,55,0.8127626050420168) 90%, rgba(0,255,68,1) 100%)",
            minHeight: "100vh",
          }}
        >
          <Header />

          <div className="flex justify-center items-center mt-10">
            <Card className="rounded-md w-96">
              <CardHeader
                floated={false}
                className="h-36 flex justify-center items-center pb-3"
              >
                <img
                  src={profileData?.Users[0].avatarLink}
                  alt="profile-picture"
                  className="rounded-full h-32 w-32"
                />
              </CardHeader>
              <CardBody className="text-center flex flex-col justify-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Lê Hữu Kiên
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center justify-center w-max"
                  textGradient
                >
                  <FaUser className="mr-3" /> {profileData?.Users[0].Username}
                </Typography>

                <Typography
                  color="blue-gray"
                  className="flex items-center justify-center w-max"
                  textGradient
                >
                  <FaPhone className="mr-3" />
                  {profileData?.Users[0].Phone
                    ? profileData?.Users[0].Phone
                    : "null"}
                </Typography>

                <Typography
                  color="blue-gray"
                  className="flex items-center justify-center w-max"
                  textGradient
                >
                  <FaEnvelope className="mr-3" />
                  {profileData?.Users[0].Email}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center justify-center w-max"
                  textGradient
                >
                  <FaMale className="mr-3" />
                  {profileData?.Users[0].Gender
                    ? profileData?.Users[0].Gender
                    : "null"}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center justify-center w-max"
                  textGradient
                >
                  <FaCalendarAlt className="mr-3" />
                  27-07-2002
                </Typography>
              </CardBody>

              <CardFooter className="flex justify-center gap-7 pt-2">
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={openModal}
                >
                  Change Password
                </button>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={openModalGroup}
                >
                  Groups
                </button>
              </CardFooter>
            </Card>
          </div>

          <ModalChangePassWord
            userId={profileData?.Users[0].UserID}
            isOpen={isModalOpenChangePass}
            onClose={closeModal}
          />

          <ModalMyGroups
            userId={profileData?.Users[0].UserID}
            isOpen={isModalOpenGroup}
            onClose={closeModalGroup}
          />

          <Footer />
        </div>
      )}
    </>
  );
}

export default Profile;
