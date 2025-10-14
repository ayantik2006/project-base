import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

export default function CreatePostEditor() {
  
  return <ReactQuill placeholder="Share your thoughts with the world..." className="h-[19.8rem] w-[full]" theme="snow" modules = {{
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike','code-block'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image','video'],
      
    ],
    // syntax: { hljs },
  }}/>;
}
