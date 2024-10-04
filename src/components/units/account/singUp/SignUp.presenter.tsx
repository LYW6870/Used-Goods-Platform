import * as S from './SignUp.styles';
import { ISignUpUIProps } from './SignUp.types';

export default function SignUpUI({
  register,
  handleSubmit,
  errors,
  checkId,
  password,
}: ISignUpUIProps) {
  return (
    <S.Wrapper>
      <S.SignUpContainer>
        <S.SignUpTitle>회원가입</S.SignUpTitle>

        <S.Input
          placeholder="아이디"
          {...register('id', {
            required: '아이디를 입력해주세요.',
            minLength: {
              value: 6,
              message: '아이디는 최소 6자리 이상이어야 합니다.',
            },
            onBlur: (e) => checkId(e.target.value),
          })}
        />
        {errors.id && <S.ErrorText>{errors.id.message}</S.ErrorText>}

        <S.Input
          type="password"
          placeholder="비밀번호"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자리 이상이어야 합니다.',
            },
          })}
        />
        {errors.password && (
          <S.ErrorText>{errors.password.message}</S.ErrorText>
        )}

        <S.Input
          type="password"
          placeholder="비밀번호 확인"
          {...register('confirmPassword', {
            required: '비밀번호를 확인해주세요.',
            validate: (value) =>
              value === password || '비밀번호가 일치하지 않습니다.',
          })}
        />
        {errors.confirmPassword && (
          <S.ErrorText>{errors.confirmPassword.message}</S.ErrorText>
        )}

        <S.Input
          placeholder="이름"
          {...register('name', {
            required: '이름을 입력해주세요.',
          })}
        />
        {errors.name && <S.ErrorText>{errors.name.message}</S.ErrorText>}

        <S.SignUpButton onClick={handleSubmit}>회원가입</S.SignUpButton>
      </S.SignUpContainer>
    </S.Wrapper>
  );
}
