import React, { useState } from 'react';
// import { Modal } from 'antd';
// import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useMutation } from '@apollo/client';
// import {
//   IMutation,
//   IMutationCreateBoardArgs,
//   IMutationUpdateBoardArgs,
//   IUpdateBoardInput,
// } from '../../../../commons/types/generated/types';
// import { CREATE_BOARD, UPDATE_BOARD } from './BoardWrite.queries';
import DOMPurify from 'dompurify';
import type { Address } from 'react-daum-postcode';
import { schema } from './BoardWrite.schema';
import BoardWriteUI from './BoardWrite.presenter';
import { IBoardWriteProps, IFormData } from './BoardWrite.types';
import ErrorModal from '../../../commons/errorModal/errorModal';

// boardId?, userId, userName

export default function BoardWrite({ isEdit, data }: IBoardWriteProps) {
  // const [createBoard] = useMutation<
  //   Pick<IMutation, 'createBoard'>,
  //   IMutationCreateBoardArgs
  // >(CREATE_BOARD);

  // const [updateBoard] = useMutation<
  //   Pick<IMutation, 'updateBoard'>,
  //   IMutationUpdateBoardArgs
  // >(UPDATE_BOARD);

  // isComplete string에서 boolean로 변환해줘야함!

  const [isToggleModal, setIsToggleModal] = useState(false);
  const [isErrModalOpen, setIsErrModalOpen] = useState(false);
  const [errModalMessage, setErrModalMessage] = useState('');

  const { register, handleSubmit, setValue, formState, trigger } =
    useForm<IFormData>({
      resolver: yupResolver(schema) as any,
      mode: 'onChange', // 바뀔때마다
    });

  const onChangeContents = (value: string): void => {
    setValue('contents', value === '' ? '<p><br></p>' : value);
    trigger('contents');
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

  // const testString =
  //   " XSS 공격 테스트 <script>alert('위험한 script 코드');</script> ";

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const onClickSubmit = (formData: IFormData): void => {
    const images = extractUrls(formData.contents);
    console.log('이미지 갯수', images.length);
    if (images.length > 4) {
      setErrModalMessage('이미지는 최대 3개까지만 넣을 수 있습니다.');
      setIsErrModalOpen(true);
      return;
    }

    const decodedHtml = decodeHtml(formData.contents);
    console.log('전', decodedHtml);
    const safeContents = DOMPurify.sanitize(decodedHtml);

    const remakeFormData = {
      ...formData,
      isComplete: formData.isComplete === 'true',
      contents: safeContents,
      images,
    };

    console.log('후', remakeFormData.contents);
  };

  const onToggleModal = (): void => {
    setIsToggleModal((prev) => !prev);
  };

  const addressComplete = (addData: Address): void => {
    setValue('address', addData.address);
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
        isToggleModal={isToggleModal}
        isEdit={isEdit}
        data={data}
        setValue={setValue}
        register={register}
      />
      <ErrorModal
        isErrModalOpen={isErrModalOpen}
        message={errModalMessage}
        onClose={() => setIsErrModalOpen(false)}
      />
    </>
  );
}
