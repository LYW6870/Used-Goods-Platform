import React, { useEffect } from 'react';
import * as S from './BoardWrite.styles';
import { IBoardWriteUIProps } from './BoardWrite.types';
import { genPlaceholderStyle } from 'antd/es/input/style';

export default function BoardWriteUI({
  onClickSubmit,
  handleSubmit,
  register,
  formState,
  isEdit,
  data,
}: IBoardWriteUIProps) {
  // prettier-ignore
  const categoryList = [ '디지털기기', '취미/게임', '생활가전', '가구/인테리어', '의류', '화장품', '도서', '기타' ];

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
          {/* <S.FormField>
            <S.Textarea placeholder="내용" {...register('contents')} />
          </S.FormField> */}
        </form>
      </S.Container>
    </S.Wrapper>
  );
}
