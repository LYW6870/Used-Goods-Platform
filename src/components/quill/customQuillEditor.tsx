// 커스텀 ReactQuill 컴포넌트

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
import ErrorModal from '../commons/errorModal/errorModal';

interface CustomQuillEditorProps {
  placeholder: string;
  onChange: (content: string) => void;
}

const myPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const myAPIKEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const imageMaxSize = 1 * 1024 * 1024;

const CustomQuillEditor = forwardRef(
  ({ placeholder, onChange }: CustomQuillEditorProps, ref) => {
    const [editorContent, setEditorContent] = useState('');
    const quillRef = useRef<ReactQuill>(null);

    const [isErrModalOpen, setIsErrModalOpen] = useState(false);
    const [errModalMessage, setErrModalMessage] = useState('');

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
      // input.setAttribute('accept', 'image/*');
      input.setAttribute('accept', 'image/jpeg,image/png');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (file.size > imageMaxSize) {
          setErrModalMessage('이미지 파일 크기는 5MB를 초과할 수 없습니다.');
          setIsErrModalOpen(true);
          return;
        }
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
            ['link', 'image'],
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
      <>
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
        <ErrorModal
          isErrModalOpen={isErrModalOpen}
          message={errModalMessage}
          onClose={() => setIsErrModalOpen(false)}
        />
      </>
    );
  },
);

CustomQuillEditor.displayName = 'CustomQuillEditor';

export default CustomQuillEditor;
