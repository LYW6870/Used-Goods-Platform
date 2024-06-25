import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Modal } from 'antd';

const Container = styled.div`
  width: 100%;
  max-width: 700px; // 최대 너비 제한
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const RadioLabel = styled.label`
  margin-right: 20px;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
`;

const RadioButton = styled.input`
  margin-right: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const InlineFieldContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 20px; // 오른쪽 필드와의 간격

  &:last-child {
    margin-right: 0; // 마지막 필드는 오른쪽 간격 제거
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  text-align: center; // 버튼을 중앙으로 정렬
  margin-top: 20px; // 버튼 위에 약간의 공간을 추가
`;

// type Props = {};

// 스타일 end

export const Error = styled(Modal)``;

export default function BoardsNewPage() {
  const [formData, setFormData] = useState({
    writer: '',
    password: '',
    category: '디지털기기',
    transactionType: '판매',
    title: '',
    content: '',
    price: '',
    location: '',
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Form 의 기분 동작인 새로 고침 및 페이지 이동 방지
    console.log(formData);
    // 서버 만들면 서버 로직 추가할 곳
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InlineFieldContainer>
          <FieldContainer>
            <Label htmlFor="writer">작성자</Label>
            <Input
              type="text"
              id="writer"
              name="writer"
              value={formData.writer}
              onChange={handleChange}
            />
          </FieldContainer>
          <FieldContainer>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FieldContainer>
        </InlineFieldContainer>
        <FormField>
          <Label htmlFor="category">물건 종류</Label>
          <Select
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
          </Select>
        </FormField>
        <FormField>
          <Label>거래방식</Label>
          <RadioGroup>
            <RadioLabel>
              <RadioButton
                type="radio"
                name="transactionType"
                value="판매"
                checked={formData.transactionType === '판매'}
                onChange={handleChange}
              />
              판매
            </RadioLabel>
            <RadioLabel>
              <RadioButton
                type="radio"
                name="transactionType"
                value="구매"
                checked={formData.transactionType === '구매'}
                onChange={handleChange}
              />
              구매
            </RadioLabel>
          </RadioGroup>
        </FormField>
        <FormField>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label htmlFor="content">내용</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label htmlFor="price">판매가격</Label>
          <Input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label htmlFor="location">거래 희망 장소</Label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </FormField>
        <ButtonContainer>
          <Button type="submit">등록하기</Button>
        </ButtonContainer>
      </form>
    </Container>
  );
}
