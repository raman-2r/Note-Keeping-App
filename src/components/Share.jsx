import React from "react";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const Share = ({ pasteId }) => {
  const shareUrl = `${window.location.origin}/viewPaste/${pasteId}`;

  return (
    <div className="ml-10 mt-7 p-5 flex flex-col gap-5 border border-gray-600 rounded-2xl bg-gray-800 text-white shadow-lg w-[380px]">
      {/* Copy Input */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="text-white border border-gray-600 bg-gray-900 px-3 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          className="text-green-400 text-xl hover:text-green-300 hover:scale-110 transition-all"
          onClick={() => {
            navigator.clipboard.writeText(shareUrl);
            toast.success("Copied!", {
              position: "top-right",
              autoClose: 3000,
              theme: "dark",
            });
          }}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>

      {/* Social Share Buttons */}
      <div className="flex justify-between px-2">
        <FacebookMessengerShareButton
          url={shareUrl}
          appId="YOUR_FACEBOOK_APP_ID"
        >
          <FacebookMessengerIcon
            size={45}
            round
            className="hover:scale-110 transition-all"
          />
        </FacebookMessengerShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon
            size={45}
            round
            className="hover:scale-110 transition-all"
          />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon
            size={45}
            round
            className="hover:scale-110 transition-all"
          />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default Share;
