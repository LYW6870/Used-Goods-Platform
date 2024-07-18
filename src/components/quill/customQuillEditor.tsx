import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

interface CustomQuillEditorProps {
  placeholder: string;
  onChange: (content: string) => void;
}

const myPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const myAPIKEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

const CustomQuillEditor = forwardRef(
  ({ placeholder, onChange }: CustomQuillEditorProps, ref) => {
    const [editorContent, setEditorContent] = useState('');
    const quillRef = useRef<ReactQuill>(null);

    useImperativeHandle(ref, () => ({
      getEditor: () => {
        if (quillRef.current) {
          return quillRef.current.getEditor();
        }
        return null;
      },
    }));

    const handleImageUpload = useCallback(async () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', myPreset);
        formData.append('api_key', myAPIKEY);
        formData.append('timestamp', String(Math.floor(Date.now() / 1000))); // 문자열로 변환

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${myPreset}/image/upload`,
            formData,
            {
              headers: { 'X-Requested-With': 'XMLHttpRequest' },
            },
          );
          const url = response.data.secure_url;
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', url);
        } catch (error) {
          console.error('이미지 업로드 에러:', error);
        }
      };
    }, []);

    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'], // 비디오 지우기
            ['clean'],
          ],
          handlers: {
            image: handleImageUpload,
          },
        },
      }),
      [handleImageUpload],
    );

    const formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'link',
      'image',
    ];

    const handleChange = (content: string) => {
      setEditorContent(content);
      onChange(content);
    };

    return (
      <ReactQuill
        style={{ height: 400, marginBottom: 65 }}
        ref={quillRef}
        value={editorContent}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder={placeholder}
      />
    );
  },
);

CustomQuillEditor.displayName = 'CustomQuillEditor';

export default CustomQuillEditor;
