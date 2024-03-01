import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import { FaUpload } from "react-icons/fa";

function ModalMyGroups({ userId, isOpen, onClose }) {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [imagePost, setImagePost] = useState(null);
  const [avatarGroup, setAvatarGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "https://api.iudi.xyz/api/forum/group/all_group"
        );
        setGroups(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleAddNewGroup = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", avatarGroup);
      const responseImgbb = await axios.post(
        "https://api.imgbb.com/1/upload?key=58cc04b46a61758b8f45a2d7977af518",
        formData
      );
      const response = await axios.post(
        `https://api.iudi.xyz/api/forum/group/add_group/${userId}`,
        {
          GroupName: groupName,
          userNumber: 1,
          avatarLink: responseImgbb.data.data.url,
        }
      );

      if (response.data.status == 200) {
        setAvatarGroup(null);
        setImagePost(null);
        setGroupName("");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  const handleJoinGroup = () => {
    alert("Join");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatarGroup(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePost(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
          isOpen ? "" : "hidden"
        }`}
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white p-8 rounded-lg w-80">
          <h1 className="text-2xl font-bold mb-4">ADD GROUP</h1>
          <form onSubmit={handleAddNewGroup}>
            <div className="mb-4">
              <label
                htmlFor="group-name"
                className="block text-gray-700 font-bold mb-2"
              >
                Group Name
              </label>
              <input
                type="text"
                id="group-name"
                className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />

              <div className="mt-2">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <span className="hover:underline">
                    <FaUpload />
                  </span>
                </label>
              </div>

              {imagePost && (
                <div className="flex justify-center">
                  <img
                    src={imagePost}
                    alt="Preview"
                    className="w-32 h-32 rounded-full mt-2 cursor-pointer"
                    onClick={() => {
                      setImagePost(null);
                    }}
                  />
                </div>
              )}
            </div>

            {/* <div className="flex relative overflow-y-auto">
              {groups?.map((group, index) => (
                <div key={index} className="relative">
                  <div className="p-4 rounded-lg cursor-pointer">
                    <img
                      onClick={handleJoinGroup}
                      src={group?.avatarLink}
                      alt={group?.GroupName}
                      className="w-16 h-16 rounded-full mx-auto mb-2"
                    />
                  </div>
                </div>
              ))}
            </div> */}

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalMyGroups;
