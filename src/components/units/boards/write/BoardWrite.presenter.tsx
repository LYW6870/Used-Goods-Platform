import React from 'react';
import * as S from './BoardWrite.styles';
import { IBoardWriteUIProps } from './BoardWrite.types';

export default function BoardWriteUI({
  formData,
  handleChange,
  handleSubmit,
}: IBoardWriteUIProps) {
  return (
    <S.Container>
      <form onSubmit={handleSubmit}>
        <S.InlineFieldContainer>
          <S.FieldContainer>
            <S.Label htmlFor="writer">작성자</S.Label>
            <S.Input
              type="text"
              id="writer"
              name="writer"
              value={formData.writer}
              onChange={handleChange}
              maxLength={10}
            />
          </S.FieldContainer>
          <S.FieldContainer>
            <S.Label htmlFor="password">비밀번호</S.Label>
            <S.Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              maxLength={10}
            />
          </S.FieldContainer>
        </S.InlineFieldContainer>
        <S.FormField>
          <S.Label htmlFor="category">물건 종류</S.Label>
          <S.Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {[
              '디지털기기',
              '취미/게임',
              '생활가전',
              '가구/인테리어',
              '의류',
              '화장품',
              '도서',
              '기타',
            ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </S.Select>
        </S.FormField>
        <S.FormField>
          <S.Label>거래방식</S.Label>
          <S.RadioGroup>
            <S.RadioLabel>
              <S.RadioButton
                type="radio"
                name="saleType"
                value="판매"
                checked={formData.saleType === '판매'}
                onChange={handleChange}
              />
              판매
            </S.RadioLabel>
            <S.RadioLabel>
              <S.RadioButton
                type="radio"
                name="saleType"
                value="구매"
                checked={formData.saleType === '구매'}
                onChange={handleChange}
              />
              구매
            </S.RadioLabel>
          </S.RadioGroup>
        </S.FormField>
        <S.FormField>
          <S.Label htmlFor="title">제목</S.Label>
          <S.Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={30}
          />
        </S.FormField>
        <S.FormField>
          <S.Label htmlFor="contents">내용</S.Label>
          <S.Textarea
            id="contents"
            name="contents"
            value={formData.contents}
            onChange={handleChange}
          />
        </S.FormField>
        <S.FormField>
          <S.Label htmlFor="price">판매가격</S.Label>
          <S.Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            maxLength={8}
          />
        </S.FormField>
        <S.FormField>
          <S.Label htmlFor="location">거래 희망 장소</S.Label>
          <S.Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </S.FormField>
        <S.ButtonContainer>
          <S.Button type="submit">등록하기</S.Button>
        </S.ButtonContainer>
      </form>
    </S.Container>
  );
}
