import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "./ui/button";

export default function CreatePostEditor() {
  return (
    <div className="flex flex-col gap-3 h-fit">
      <ReactQuill
        onChange={(e) => {
          console.dir(e);
        }}
        placeholder="Share your thoughts with the world..."
        className="h-fit w-[full]"
        theme="snow"
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        }}
      />
      <Button className="w-full bg-[#7ac655] hover:bg-[#6cae4b] cursor-pointer duration-300]">
        <i className="fa-solid fa-paper-plane"></i>
        Publish post
      </Button>
    </div>
  );
}
