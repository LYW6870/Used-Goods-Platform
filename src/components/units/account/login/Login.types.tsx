export interface ILoginUIProps {
  formData: {
    id: string;
    password: string;
  };
  errors: {
    id: string;
    password: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleEnterPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClickSignUp: () => void;
  onClickKakaoLogin: () => void;
}
