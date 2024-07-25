import React from 'react';
import { Modal } from 'antd';

interface IErrorModalProps {
  isErrModalOpen: boolean;
  message: string;
  onClose: () => void;
}

export default function ErrorModal({
  isErrModalOpen,
  message,
  onClose,
}: IErrorModalProps): JSX.Element {
  return (
    <Modal title="오류" open={isErrModalOpen} onOk={onClose} onCancel={onClose}>
      <p>{message}</p>
    </Modal>
  );
}

// 사용법 : 사용하는 곳에서 아래 코드들로 사용

// const [isErrModalOpen, setIsErrModalOpen] = useState(false);
// const [errModalMessage, setErrModalMessage] = useState('');

// <ErrorModal
// isErrModalOpen={isErrModalOpen}
// message={errModalMessage}
// onClose={() => setIsErrModalOpen(false)}
// />
