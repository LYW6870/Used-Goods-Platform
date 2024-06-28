import React from 'react';
import { Modal } from 'antd';
import { useMutation } from '@apollo/client';
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
  IUpdateBoardInput,
} from '../../../../commons/types/generated/types';
import { CREATE_BOARD, UPDATE_BOARD } from './BoardWrite.queries';
import BoardWriteUI from './BoardWrite.presenter';
import { IBoardWriteProps } from './BoardWrite.types';

export default function BoardWrite({ isEdit, data }: IBoardWriteProps) {
  const [createBoard] = useMutation<
    Pick<IMutation, 'createBoard'>,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const [updateBoard] = useMutation<
    Pick<IMutation, 'updateBoard'>,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

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

  const startCreateBoardMutation = async () => {
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

  // saleType: "판매",

  const startUpdateBoardMutation = async () => {
    if (
      data.fetchBoard.title === formData.title &&
      data.fetchBoard.contents === formData.contents &&
      data.fetchBoard.price === Number(formData.price) &&
      data.fetchBoard.location === formData.location &&
      data.fetchBoard.category === formData.category &&
      data.fetchBoard.saleType === formData.saleType
    ) {
      alert('수정한 내용이 없습니다.');
      return;
    }
    if (!formData.password) {
      alert('비밀번호를 입력해주세요');
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    if (data.fetchBoard.title !== formData.title)
      updateBoardInput.title = formData.title;
    if (data.fetchBoard.contents === formData.contents)
      updateBoardInput.contents = formData.contents;
    if (data.fetchBoard.price !== Number(formData.price))
      updateBoardInput.price = Number(formData.price);
    if (data.fetchBoard.location !== formData.location)
      updateBoardInput.location = formData.location;
    if (data.fetchBoard.category !== formData.category)
      updateBoardInput.category = formData.category;
    if (data.fetchBoard.saleType !== formData.saleType)
      updateBoardInput.saleType = formData.saleType;

    try {
      await updateBoard({
        variables: {
          boardId: Number(data.fetchBoard._id),
          password: formData.password,
          updateBoardInput,
        },
      });

      alert('수정 완료');
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  // 공백 입력 차단
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.currentTarget.name === 'writer' ||
        e.currentTarget.name === 'password') &&
      e.key === ' '
    ) {
      e.preventDefault(); // 기본동작(키입력) 차단
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
    e.preventDefault(); // Form 의 기본 동작인 새로 고침 및 페이지 이동 방지
    if (isEdit === false) {
      startCreateBoardMutation();
    } else {
      startUpdateBoardMutation();
    }
  };

  return (
    <BoardWriteUI
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleKeyDown={handleKeyDown}
      formData={formData}
      setFormData={setFormData}
      isEdit={isEdit}
      data={data}
    />
  );
}
