import { Images } from "lucide-react";
import { SendHorizontal } from "lucide-react";
import { X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useChatStore } from "../../Store/useChatStore";
import toast from "react-hot-toast";

const ChatGesture = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImageFromPreview = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      //clear Form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message : ", error);
      toast.error("Failed to send message :");
    }
  };

  return (
    <div className="">
      {imagePreview && (
        <div className="w-[30%] p-2 relative">
          <img className="w-full" src={imagePreview} alt="" />
          <button
            type="button"
            onClick={removeImageFromPreview}
            className="absolute -top-1 -right-2 bg-primary/40 active:bg-primary text-primary p-1 rounded-full"
          >
            <X className="size-5 cursor-pointer " />
          </button>
        </div>
      )}
      <div className="w-full flex h-15 ">
        <div className="w-full h-full p-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Messages"
            className="w-full h-full rounded-full ps-4 outline-none placeholder:text-lg border-none bg-primary/10 text-primary placeholder:text-primary "
          />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="flex w-[20%]  items-center text-primary gap-10 max-md:gap-4 justify-center gap- max-md:w-[30%]  h-full"
        >
          <label htmlFor="takeFile">
            <Images
              className={`size-5 ${imagePreview ? "text-emerald-500" : "text-zinc-400"
                }`}
            />
          </label>
          <input
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            type="file"
            name=""
            id="takeFile"
            className="hidden"
            disabled={imagePreview}
          />
          <button
            disabled={!text.trim() && !imagePreview}
            type="submit"
            className="disabled:opacity-30 cursor-pointer disabled:cursor-default"
          >
            {" "}
            <SendHorizontal className=" bg-primary/30 btn btn-circle p-1  size-8" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatGesture;
