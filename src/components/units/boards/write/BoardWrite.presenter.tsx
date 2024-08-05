import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import DaumPostcodeEmbed from 'react-daum-postcode';
import * as S from './BoardWrite.styles';
import { IBoardWriteUIProps } from './BoardWrite.types';

const CustomQuillEditor = dynamic(
  () => import('../../../quill/customQuillEditor'),
  {
    ssr: false,
  },
);

// prettier-ignore
const categoryList = [ '디지털기기', '취미/게임', '생활가전', '가구/인테리어', '의류', '화장품', '도서', '기타' ];

export default function BoardWriteUI({
  onClickSubmit,
  handleSubmit,
  onChangeContents,
  onToggleModal,
  addressComplete,
  setValue,
  register,
  formState,
  isToggleModal,
  isEdit,
  addDetailOn,
  setAddDetailOn,
  data,
}: IBoardWriteUIProps) {
  useEffect(() => {
    if (!isEdit) {
      setValue('isComplete', 'false');
    }
  }, [isEdit, setValue]);

  useEffect(() => {
    if (data && data.fetchBoard) {
      setValue('contents', data.fetchBoard.contents);
      setValue('title', data.fetchBoard.title);
      setValue('category', data.fetchBoard.category);
      setValue('price', data.fetchBoard.price);
      setValue('address', data.fetchBoard.address);
      setValue('addressDetail', data.fetchBoard.addressDetail);
      setValue('isComplete', String(data.fetchBoard.isComplete));
      setValue('images', data.fetchBoard.images);
      if (data.fetchBoard.address) {
        setAddDetailOn(true);
      }
    }
  }, [data]);

  return (
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
              {formState.errors.price && (
                <S.Error>{formState.errors.price.message}</S.Error>
              )}
            </S.FieldContainer>
          </S.InlineFieldContainer>
          <S.FormField>
            <S.Input
              type="text"
              placeholder="제목"
              maxLength={40}
              {...register('title')}
            />
            {formState.errors.title && (
              <S.Error>{formState.errors.title.message}</S.Error>
            )}
          </S.FormField>
          <S.FormField>
            <CustomQuillEditor
              placeholder="거래 상품 설명을 적어주세요"
              onChange={onChangeContents}
              propData={data?.fetchBoard.contents}
            />
            {formState.errors.contents && (
              <S.Error style={{ marginTop: -20 }}>
                {formState.errors.contents.message}
              </S.Error>
            )}
          </S.FormField>
          {isEdit ? (
            <S.FormField>
              <S.Select {...register('isComplete')}>
                <option value="false">거래중</option>
                <option value="true">거래완료</option>
              </S.Select>
            </S.FormField>
          ) : null}
          <S.FormField>
            <S.Button type="button" onClick={onToggleModal}>
              거래장소 선택
            </S.Button>
          </S.FormField>
          <S.FormField>
            <S.Input type="text" readOnly {...register('address')} />
          </S.FormField>
          <S.FormField>
            <S.Input
              type="text"
              placeholder="상세주소 입력"
              readOnly={!addDetailOn}
              maxLength={80}
              {...register('addressDetail')}
            />
          </S.FormField>
          <S.FormField>
            <S.Button type="submit">제출</S.Button>
          </S.FormField>
        </form>
      </S.Container>
      {isToggleModal && (
        <S.AddModal open onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={addressComplete} />
        </S.AddModal>
      )}
    </S.Wrapper>
  );
}
