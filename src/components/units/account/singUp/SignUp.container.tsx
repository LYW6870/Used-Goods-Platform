import { useForm } from 'react-hook-form';
import { useMutation, useLazyQuery } from '@apollo/client';
import { Modal } from 'antd';
import { CREATE_LOCAL_USER, CHECK_ID_DUPLICATION } from './SignUp.queries';
import SignUpUI from './SignUp.presenter';

// 특수문자 필터링 함수
function hasSpecialChars(value: string): boolean {
  const regex = /[!@#$%^&*(),.?":{}|<>`'"]/g; // 허용하지 않을 특수문자
  return regex.test(value);
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm();

  const [createLocalUser] = useMutation(CREATE_LOCAL_USER);
  const [checkIdDuplication] = useLazyQuery(CHECK_ID_DUPLICATION);

  const password = watch('password');

  // 아이디 중복 확인 함수
  const checkId = async (id: string) => {
    try {
      const { data } = await checkIdDuplication({
        variables: { localUserId: id },
      });
      if (data.checkIdDuplication) {
        setError('id', {
          type: 'manual',
          message: '이미 사용 중인 아이디입니다.',
        });
      } else {
        clearErrors('id');
      }
    } catch {
      Modal.error({ content: '아이디 중복 검사 오류.' });
    }
  };

  // 폼 제출 시 특수문자 검증 및 회원가입 처리
  const onSubmit = async (formData: any) => {
    const { id, name } = formData;

    // 모든 필드에서 특수문자 필터링
    if (
      hasSpecialChars(id) ||
      hasSpecialChars(password) ||
      hasSpecialChars(name)
    ) {
      Modal.error({
        content: '허용하지 않는 특수문자가 포함되어 있습니다.',
      });
      return;
    }

    try {
      const { data } = await createLocalUser({
        variables: {
          createUserInput: {
            localUserId: id,
            password,
            name,
          },
        },
      });

      if (data.createLocalUser) {
        Modal.success({ content: '회원가입 성공.' });
      }
    } catch {
      Modal.error({ content: '회원가입 오류.' });
    }
  };

  return (
    <SignUpUI
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      checkId={checkId}
      password={password}
    />
  );
}
