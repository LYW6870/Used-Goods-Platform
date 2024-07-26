import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import DOMPurify from 'dompurify';
import { Modal } from 'antd';
import type { Address } from 'react-daum-postcode';
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
  IUpdateBoardInput,
} from '../../../../commons/types/generated/types';
import { CREATE_BOARD, UPDATE_BOARD } from './BoardWrite.queries';
import { schema } from './BoardWrite.schema';
import BoardWriteUI from './BoardWrite.presenter';
import { IBoardWriteProps, IFormData } from './BoardWrite.types';

// boardId?, userId, userName

export default function BoardWrite({ isEdit, data }: IBoardWriteProps) {
  const [createBoard] = useMutation<
    Pick<IMutation, 'createBoard'>,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const [updateBoard] = useMutation<
    Pick<IMutation, 'updateBoard'>,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

  const [isToggleModal, setIsToggleModal] = useState(false);
  const [isErrModalOpen, setIsErrModalOpen] = useState(false);
  const [errModalMessage, setErrModalMessage] = useState('');
  const [addDetailOn, setAddDetailOn] = useState(false);

  // userId, userName 받아오게 만들어야함.
  const userId = 2;
  const userName = '이연우';

  let hasChanges = 0;

  const { register, handleSubmit, setValue, formState, trigger } =
    useForm<IFormData>({
      resolver: yupResolver(schema) as any,
      mode: 'onChange', // 바뀔때마다
    });

  const onChangeContents = (value: string): void => {
    setValue('contents', value === '' ? '<p><br></p>' : value);
    trigger('contents');
  };

  const CreateBoardMutation = async (formData: IFormData): Promise<void> => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            ...formData,
            isComplete: formData.isComplete === 'true',
            price: Number(formData.price),
            userId,
            userName,
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

  const buildUpdateInput = (initial, current) => {
    const fieldsToUpdate = [
      'category',
      'isComplete',
      'title',
      'price',
      'contents',
      'address',
      'addressDetail',
    ];
    return fieldsToUpdate.reduce((acc, key) => {
      if (key === 'price') {
        const initialPrice = Number(initial[key]);
        const currentPrice = Number(current[key]);
        if (initialPrice !== currentPrice) {
          acc[key] = currentPrice;
          hasChanges += 1;
        }
      } else if (key === 'isComplete') {
        const initialIsComplete = initial[key];
        const currentIsComplete = current[key] === 'true';
        if (initialIsComplete !== currentIsComplete) {
          acc[key] = currentIsComplete;
          hasChanges += 1;
        }
      } else if (initial[key] !== current[key]) {
        acc[key] = current[key];
        hasChanges += 1;
      }
      return acc;
    }, {});
  };

  const updateBoardMutation = async (formData: IFormData): Promise<void> => {
    const updateBoardInput: IUpdateBoardInput = buildUpdateInput(
      data.fetchBoard,
      formData,
    );

    if (hasChanges === 0) {
      Modal.error({ content: '수정된 항목이 없습니다.' });
      return;
    }

    try {
      await updateBoard({
        variables: {
          boardId: Number(data.fetchBoard.id),
          userId: Number(userId),
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

  // contents에서 이미지를 추출하여 저장하는 함수
  const extractUrls = (content: string): string[] => {
    const srcRegex = /src="([^">]+)"/;
    return content.split('<img').reduce<string[]>((acc, segment) => {
      const match = segment.match(srcRegex);
      if (match && match[1]) {
        acc.push(match[1]);
      }
      return acc;
    }, []);
  };

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const onClickSubmit = (formData: IFormData): void => {
    const images = extractUrls(formData.contents);
    if (images.length > 3) {
      setErrModalMessage('이미지는 최대 3개까지만 넣을 수 있습니다.');
      setIsErrModalOpen(true);
      return;
    }

    const decodedHtml = decodeHtml(formData.contents);
    const safeContents = DOMPurify.sanitize(decodedHtml);

    const remakeFormData = {
      ...formData,
      contents: safeContents,
      images,
    };

    if (isEdit) {
      updateBoardMutation(remakeFormData);
    } else if (!isEdit) {
      CreateBoardMutation(remakeFormData);
    }
  };

  const onToggleModal = (): void => {
    setIsToggleModal((prev) => !prev);
  };

  const addressComplete = (addData: Address): void => {
    setValue('address', addData.address);
    setAddDetailOn(true);
    onToggleModal();
  };

  return (
    <>
      <BoardWriteUI
        onClickSubmit={onClickSubmit}
        handleSubmit={handleSubmit}
        onChangeContents={onChangeContents}
        formState={formState}
        onToggleModal={onToggleModal}
        addressComplete={addressComplete}
        isEdit={isEdit}
        isToggleModal={isToggleModal}
        isErrModalOpen={isErrModalOpen}
        addDetailOn={addDetailOn}
        setAddDetailOn={setAddDetailOn}
        data={data}
        setValue={setValue}
        register={register}
        setIsErrModalOpen={setIsErrModalOpen}
        errModalMessage={errModalMessage}
      />
    </>
  );
}
