import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

function FormPost({ groupId }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [imagePreviewPost, setImagePreviewPost] = useState(null);
  const [imagePost, setImagePost] = useState(null);
  const [content, setContent] = useState("");

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagePost(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewPost(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imagePost);
      const responseImgbb = await axios.post(
        "https://api.imgbb.com/1/upload?key=58cc04b46a61758b8f45a2d7977af518",
        formData
      );

      const response = await axios.post(
        `https://api.iudi.xyz/api/forum/add_comment/${profileData?.Users[0].UserID}/${groupId}`,
        {
          Content: content,
          PhotoURL: [responseImgbb.data.data.url],
        }
      );

      if (response.data.status == 200) {
        setContent("");
        setImagePost(null);
        setImagePreviewPost(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 mt-10">
        <div className="flex justify-center items-center">
          <div>
            <div className="flex items-center my-4">
              <img
                src={profileData?.Users[0].avatarLink}
                alt=""
                className="w-10 h-10 rounded-full mr-2"
              />
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                type="text"
                placeholder="Bạn đang nghĩ gì ?"
                className="border border-gray-300 px-4 py-2 rounded-md flex-grow mr-2 focus:outline-none"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="text-white hover:underline">
                  <FaUpload />
                </span>
              </label>
              <button
                style={{ marginLeft: "10px" }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-1"
                onClick={handleAddPost}
              >
                Đăng bài
              </button>
            </div>
            {imagePreviewPost && (
              <div className="flex justify-center">
                <img
                  src={imagePreviewPost}
                  alt="Preview"
                  className="max-w-xs mt-2 cursor-pointer"
                  onClick={() => {
                    setImagePreviewPost(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPost;
