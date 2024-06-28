import React from 'react';
import { Modal } from 'antd';
import { useMutation } from '@apollo/client';
import {
  IMutation,
  IMutationCreateBoardArgs,
} from '../../../../commons/types/generated/types';
import { CREATE_BOARD } from './BoardWrite.queries';
import BoardWriteUI from './BoardWrite.presenter';

export default function BoardWrite() {
  const [createBoard] = useMutation<
    Pick<IMutation, 'createBoard'>,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const [formData, setFormData] = React.useState({
    writer: '',
    password: '',
    isComplete: false,
    saleType: '판매',
    category: '디지털기기',
    title: '',
    contents: '',
    price: '',
    location: '',
  });

  const startMutation = async () => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: formData.writer,
            password: formData.password,
            isComplete: false,
            saleType: formData.saleType,
            category: formData.category,
            title: formData.title,
            contents: formData.contents,
            price: Number(formData.price),
            location: formData.location,
          },
        },
      });
      console.log(result.data?.createBoard);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Form 의 기분 동작인 새로 고침 및 페이지 이동 방지
    startMutation();
  };

  return (
    <BoardWriteUI
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
    />
  );
}
