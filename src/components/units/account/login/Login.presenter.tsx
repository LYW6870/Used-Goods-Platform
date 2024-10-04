import Image from 'next/image';
import * as S from './Login.styles';
import { ILoginUIProps } from './Login.types';

export default function LoginUI({
  formData,
  errors,
  handleChange,
  handleSubmit,
  handleEnterPress,
  onClickSignUp,
  onClickKakaoLogin,
}: ILoginUIProps) {
  return (
    <S.Wrapper>
      <S.LoginContainer>
        <S.LocalLoginContainer>
          <S.LoginTitle>로그인</S.LoginTitle>
          <S.Label>아이디와 비밀번호를 입력해주세요.</S.Label>
          <S.LocalLoginFormContainer>
            <S.Input
              name="id"
              placeholder="아이디"
              value={formData.id}
              onChange={handleChange}
            />
            {errors.id && <S.ErrorText>{errors.id}</S.ErrorText>}
            <S.Input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleEnterPress}
            />
            {errors.password && <S.ErrorText>{errors.password}</S.ErrorText>}
            <S.LoginButton onClick={handleSubmit}>로그인</S.LoginButton>
          </S.LocalLoginFormContainer>
          <S.SignUpLinkContainer>
            <S.Label>계정이 없으신가요?</S.Label>
            <S.SignUpLink onClick={onClickSignUp}>계정 생성</S.SignUpLink>
          </S.SignUpLinkContainer>
        </S.LocalLoginContainer>
        <S.Hr />
        <S.SocialLoginContainer>
          <S.Label>소셜 로그인</S.Label>
          <S.KakaoLoginButton onClick={onClickKakaoLogin}>
            <S.IconWrapper>
              <Image src="/kakao.png" alt="Kakao" width={25} height={25} />
            </S.IconWrapper>
            <span>Kakao로 로그인</span>
          </S.KakaoLoginButton>
        </S.SocialLoginContainer>
      </S.LoginContainer>
    </S.Wrapper>
  );
}
