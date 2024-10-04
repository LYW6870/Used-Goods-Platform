import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1600px; // 400 * 4  + 패딩 100씩 200 + 여유분 200
  margin: 100px;
  padding: 100px;
  border: none;

  box-shadow: 0px 0px 10px gray;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin: 100px auto;
  padding: 50px;
  border: none;
  border: 1px solid #c6bdbd;
  background-color: white;
`;

// 공통 폼 컨테이너
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LocalLoginContainer = styled(FormContainer)`
  width: 100%;
  border: none;
`;

export const SocialLoginContainer = styled(FormContainer)`
  width: 100%;
  border: none;
`;

// 로그인 타이틀
export const LoginTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const Label = styled.label`
  margin-right: 15px;
`;

export const LocalLoginFormContainer = styled(FormContainer)`
  margin-top: 30px;
  width: 100%;
  border: none;
`;

// 이메일과 비밀번호 입력 필드
export const Input = styled.input`
  width: 100%;
  height: 50px;
  margin-bottom: 15px;
  padding: 0 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

// 로그인 버튼
export const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #31b971;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 15px;
  cursor: pointer;

  &:hover {
    background-color: #2d9e62;
  }
`;

// 계정 생성 안내 문구
export const SignUpLinkContainer = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;

export const SignUpLink = styled.a`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Hr = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

const SocialLoginButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #fee500;
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  position: relative;

  &:hover {
    background-color: #f9e000;
  }

  span {
    flex-grow: 1; // 텍스트를 가운데 정렬
    text-align: center;
  }
`;

// 카카오 로그인 버튼
export const KakaoLoginButton = styled(SocialLoginButton)`
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #fee500;
  color: #000000;

  &:hover {
    background-color: #f9e000;
  }
`;

// 소셜 아이콘
export const IconWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-40%);
`;

// 로그인 텍스트
export const ButtonText = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
`;
