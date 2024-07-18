import React from 'react';
// import { Modal } from 'antd';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
// import { useMutation } from '@apollo/client';
// import {
//   IMutation,
//   IMutationCreateBoardArgs,
//   IMutationUpdateBoardArgs,
//   IUpdateBoardInput,
// } from '../../../../commons/types/generated/types';
// import { CREATE_BOARD, UPDATE_BOARD } from './BoardWrite.queries';
// import BoardWriteUI from './BoardWrite.presenter';
import { IBoardWriteProps, IFormData } from './BoardWrite.types';
import * as S from './BoardWrite.styles';

// const ReactQuill = dynamic(async () => await import('react-quill'), {
//   ssr: false,
// });

const CustomQuillEditor = dynamic(
  () => import('../../../quill/customQuillEditor'),
  {
    ssr: false,
  },
);

// boardId?, userId, userName

// present꺼 가져옴
// prettier-ignore
const categoryList = [ '디지털기기', '취미/게임', '생활가전', '가구/인테리어', '의류', '화장품', '도서', '기타' ];

export default function BoardWrite({ isEdit, data }: IBoardWriteProps) {
  // const [createBoard] = useMutation<
  //   Pick<IMutation, 'createBoard'>,
  //   IMutationCreateBoardArgs
  // >(CREATE_BOARD);

  // const [updateBoard] = useMutation<
  //   Pick<IMutation, 'updateBoard'>,
  //   IMutationUpdateBoardArgs
  // >(UPDATE_BOARD);

  const { register, handleSubmit, setValue, formState, trigger } =
    useForm<IFormData>({
      mode: 'onChange', // 바뀔때마다
    });

  const onChangeContents = (value: string): void => {
    setValue('contents', value === '' ? '<p><br></p>' : value);
    trigger('contents');
  };

  const onClickSubmit = (formData: IFormData): void => {
    console.log(formData);
  };

  return (
    <>
      <S.Wrapper>
        <S.Title>게시글 {isEdit ? '수정' : '등록'}</S.Title>
        <S.Container>
          <form onSubmit={handleSubmit(onClickSubmit)}>
            <S.InlineFieldContainer>
              <S.FieldContainer style={{ flexDirection: 'row', flex: 1.3 }}>
                <S.Label style={{ flex: 0.2, marginTop: '6px' }}>
                  물건 종류
                </S.Label>
                <S.Select {...register('category')} style={{ flex: 0.8 }}>
                  {[...categoryList].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </S.Select>
              </S.FieldContainer>
              <S.FieldContainer style={{ flex: 0.7 }}>
                <S.Input
                  type="number"
                  placeholder="판매 가격"
                  max={9999999999}
                  {...register('price')}
                />
              </S.FieldContainer>
            </S.InlineFieldContainer>
            <S.FormField>
              <S.Input
                type="text"
                placeholder="제목"
                maxLength={40}
                {...register('title')}
              />
            </S.FormField>
            <S.FormField>
              <CustomQuillEditor
                placeholder="게시글 내용"
                onChange={onChangeContents}
              />
            </S.FormField>
            <S.FormField>
              <S.Button type="button">거래장소 선택</S.Button>
            </S.FormField>
            <S.FormField>
              <S.Input type="text" readOnly {...register('address')} />
            </S.FormField>
            <S.FormField>
              <S.Input
                type="text"
                placeholder="상세주소 입력"
                maxLength={80}
                {...register('addressDetail')}
              />
            </S.FormField>
            <S.FormField>
              <S.Button type="submit">제출</S.Button>
            </S.FormField>
          </form>
        </S.Container>
      </S.Wrapper>

      {/* <BoardWriteUI
        onClickSubmit={onClickSubmit}
        handleSubmit={handleSubmit}
        formState={formState}
        isEdit={isEdit}
        data={data}
        register={register}
      /> */}
    </>
  );
}
