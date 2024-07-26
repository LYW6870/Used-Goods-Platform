import * as yup from 'yup';

export const schema = yup.object().shape({
  category: yup.string().required('카테고리 입력란이 비어있습니다.'),
  isComplete: yup.string().required('거래완료 여부를 선택해주세요.'),
  title: yup.string().required('게시글 제목이 비어있습니다.'),
  price: yup
    .number()
    .typeError('숫자만 입력 가능합니다')
    .required('가격 입력란이 비어있습니다.'),
  contents: yup.string().required('상품 설명이 비어있습니다.'),
  address: yup.string().nullable().default(null),
  addressDetail: yup.string().nullable().default(null),
  images: yup.array().of(yup.string()).nullable().default(null),
});
