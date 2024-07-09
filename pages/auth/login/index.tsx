import Image from 'next/image';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();

  const loginWithKakao = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    router.push(kakaoAuthUrl);
  };

  return (
    <>
      <div>로그인 페이지</div>
      <button
        onClick={loginWithKakao}
        style={{ border: 'none', background: 'none', padding: 0 }}
      >
        <Image
          src="/kakao_login_medium_narrow.png"
          alt="카카오 로그인 버튼"
          width={183}
          height={45}
        />
      </button>
    </>
  );
}
