import React, { useEffect } from 'react';
import * as S from './BoardWrite.styles';
import { IBoardWriteUIProps } from './BoardWrite.types';

export default function BoardWriteUI({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  handleKeyDown,
  isEdit,
  data,
}: IBoardWriteUIProps) {
  // 페이지 로딩 시 한 번만 실행되어 formData를 초기화합니다.
  useEffect(() => {
    if (data && data.fetchBoard) {
      setFormData({
        writer: data.fetchBoard.writer || '',
        category: data.fetchBoard.category || '전체',
        saleType: data.fetchBoard.saleType || '판매',
        title: data.fetchBoard.title || '',
        contents: data.fetchBoard.contents || '',
        price: data.fetchBoard.price || 0,
        location: data.fetchBoard.location || '',
        isComplete: data.fetchBoard.isComplete || false,
        password: '',
      });
    }
  }, []);

  // prettier-ignore
  const categoryList = [ '디지털기기', '취미/게임', '생활가전', '가구/인테리어', '의류', '화장품', '도서', '기타' ];

  return (
    <S.Wrapper>
      <S.Title>게시글 {isEdit ? '수정' : '등록'}</S.Title>
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
                onKeyDown={handleKeyDown}
                maxLength={10}
                readOnly={isEdit}
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
                onKeyDown={handleKeyDown}
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
              {[...categoryList].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </S.Select>
          </S.FormField>
          {/* ㄴㄴ */}
          <S.InlineFieldContainer>
            <S.FieldContainer>
              <S.Label htmlFor="saleType">거래 방식</S.Label>
              <S.Select
                id="saleType"
                name="saleType"
                value={formData.saleType}
                onChange={handleChange}
              >
                {['판매', '구매'].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </S.Select>
            </S.FieldContainer>
            <S.FieldContainer>
              {isEdit && (
                <>
                  <S.Label htmlFor="isComplete">진행 여부</S.Label>
                  <S.Select
                    id="isComplete"
                    name="isComplete"
                    value={String(formData.isComplete)}
                    onChange={handleChange}
                  >
                    <option value="false">판매중</option>
                    <option value="true">판매완료</option>
                  </S.Select>
                </>
              )}
            </S.FieldContainer>
          </S.InlineFieldContainer>
          {/* ss */}

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
            <S.Button type="submit">{isEdit ? '수정' : '등록'}하기</S.Button>
          </S.ButtonContainer>
        </form>
      </S.Container>
    </S.Wrapper>
  );
}
