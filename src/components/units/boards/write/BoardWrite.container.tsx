import React, { useEffect, useState } from 'react';
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

export default function BoardWrite({ isEdit, data }: IBoardWriteProps) {
  const [token, setToken] = useState<string | null>(null);
  const [myName, setMyName] = useState<string | null>(null);

  const [createBoard] = useMutation<
    Pick<IMutation, 'createBoard'>,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const [updateBoard] = useMutation<
    Pick<IMutation, 'updateBoard'>,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

  const [isToggleModal, setIsToggleModal] = useState(false);
  const [addDetailOn, setAddDetailOn] = useState(false);

  // useEffect로 localStorage에서 userToken과 userData 가져오기
  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    // 엑세스 토큰 설정
    if (storedToken) {
      setToken(storedToken);
    }

    // 유저 데이터가 있으면 myId 설정
    if (storedUserData) {
      setMyName(storedUserData.name);
    }
  }, []);

  // 만약에 로그인이 안되어있거나, 게시글 작성자가 아니면 이전페이지로 보내버리기
  let isDataChange = 0;

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
          token,
          createBoardInput: {
            ...formData,
            isComplete: formData.isComplete === 'true',
            price: Number(formData.price),
            userName: myName,
          },
        },
      });
      Modal.success({
        content: ` 결과값: ${result.data?.createBoard}`,
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
          isDataChange += 1;
        }
      } else if (key === 'isComplete') {
        const initialIsComplete = initial[key];
        const currentIsComplete = current[key] === 'true';
        if (initialIsComplete !== currentIsComplete) {
          acc[key] = currentIsComplete;
          isDataChange += 1;
        }
      } else if (initial[key] !== current[key]) {
        acc[key] = current[key];
        isDataChange += 1;
      }
      return acc;
    }, {});
  };

  const updateBoardMutation = async (formData: IFormData): Promise<void> => {
    const updateBoardInput: IUpdateBoardInput = buildUpdateInput(
      data.fetchBoard,
      formData,
    );

    if (isDataChange === 0) {
      Modal.error({ content: '수정된 항목이 없습니다.' });
      return;
    }

    try {
      const result = await updateBoard({
        variables: {
          boardId: Number(data.fetchBoard.id),
          token,
          updateBoardInput,
        },
      });

      if (result.data?.updateBoard) {
        Modal.success({
          content: '게시글 수정이 완료되었습니다.',
        });
      } else {
        Modal.error({ content: result.data?.updateBoard });
      }
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  /** contents에서 이미지를 추출하여 저장하는 함수 */
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
      Modal.error({ content: '이미지는 최대 3개까지만 넣을 수 있습니다.' });
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
        addDetailOn={addDetailOn}
        setAddDetailOn={setAddDetailOn}
        data={data}
        setValue={setValue}
        register={register}
      />
    </>
  );
}
