import React from "react";
import { fomatTime } from "../../utils/fomatTime";

const PostUser = ({ listPost }) => {
  return (
    <div className="flex justify-center items-center mt-5">
      <div className="max-w-lg w-full">
        {listPost?.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
            <div className="flex items-center mb-2">
              <img
                src={item?.Avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="text-gray-800 font-medium">
                {item?.Username}
              </span>
            </div>
            <div className="text-gray-600 text-sm mb-2">
              {fomatTime(item?.PostTime)}
            </div>
            <div className="mb-2">{item?.Title}</div>
            <div className="mb-2">{item?.Content}</div>
            <img
              src={item?.Photo}
              alt="Post"
              className="w-full rounded-md object-cover"
              style={{ maxHeight: "300px" }}
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Bình luận</h2>
              <div key={index} className="bg-gray-100 p-2 mb-2 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <img
                      src={item?.FirstComment?.Avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <span className="text-gray-800 font-medium">
                        <strong> {item?.FirstComment?.Username}</strong>
                        <span className="text-xs text-gray-500 ml-1">
                          {fomatTime(item?.FirstComment?.Time)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {item?.FirstComment?.Content}
                </div>
                <button
                  className="text-sm text-blue-500"
                  onClick={() => alert("MOre")}
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostUser;
