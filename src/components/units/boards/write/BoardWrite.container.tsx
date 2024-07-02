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
    price: 0,
    location: '',
  });

  const CreateBoardMutation = async () => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            ...formData,
            price: Number(formData.price),
          },
        },
      });
      Modal.success({
        content: ` ${result.data?.createBoard}번 게시글이 등록되었습니다.`,
      });
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  // 변경 사항 확인 함수
  function hasChanges(initial, current) {
    // 두 객체에 공통적으로 존재하는 Key들을 배열로 추출
    const commonKeys = Object.keys(initial).filter((key) => key in current);
    return commonKeys.some((key) => {
      const initialValue = initial[key];
      const currentValue = current[key];
      return initialValue !== currentValue;
    });
  }

  const buildUpdateInput = (initial, current) => {
    const fieldsToUpdate = [
      'title',
      'contents',
      'price',
      'location',
      'category',
      'saleType',
      'isComplete',
    ];
    // 요부분 타입 불러와서 해당 타입에 맞게 할당하도록 가능한가..?
    return fieldsToUpdate.reduce((acc, key) => {
      if (key === 'price') {
        const initialPrice = Number(initial[key]);
        const currentPrice = Number(current[key]);
        if (initialPrice !== currentPrice) {
          acc[key] = currentPrice; // 숫자로 변환하여 업데이트
        }
      } else if (key === 'isComplete') {
        // 요부분 정상작동여부 확인해보기
        const initialPrice = Boolean(initial[key]);
        const currentPrice = Boolean(current[key]);
        if (initialPrice !== currentPrice) {
          acc[key] = currentPrice; // Boolean로 변환하여 업데이트
        }
      } else if (initial[key] !== current[key]) {
        acc[key] = current[key];
      }
      return acc;
    }, {});
  };

  const UpdateBoardMutation = async () => {
    if (!hasChanges(data.fetchBoard, formData)) {
      Modal.warning({
        content: '수정된 내용이 없습니다. 변경 사항을 입력해주세요.',
      });
      return;
    }
    if (!formData.password) {
      Modal.warning({
        content: '비밀번호를 입력해주세요.',
      });
      return;
    }

    const updateBoardInput: IUpdateBoardInput = buildUpdateInput(
      data.fetchBoard,
      formData,
    );

    try {
      await updateBoard({
        variables: {
          boardId: Number(data.fetchBoard._id),
          password: formData.password,
          updateBoardInput,
        },
      });

      Modal.success({
        content: '게시글 수정이 완료되었습니다.',
      });
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
    if (!isEdit) {
      CreateBoardMutation();
    } else {
      UpdateBoardMutation();
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
