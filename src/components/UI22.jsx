import React, { useRef, useState } from "react";
import axios from "axios";

const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.current.value;
    if (!loading && text) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("audio", text);

        const response = await axios.post("/recognize-speech", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setResult(response.data.text || response.data.error);
      } catch (error) {
        console.error("Error recognizing speech:", error);
        setResult("Error recognizing speech");
      } finally {
        setLoading(false);
      }
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">NIC HOLDING</h1>
          <p>ARTIFICIAL INTELLIGENCE BOT</p>
        </div>
        <div className="w-full flex flex-col items-end justify-center gap-4">
          {/* Other buttons */}
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
            placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            disabled={loading}
            onClick={sendMessage}
            className={`bg-pink-500 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default UI;
