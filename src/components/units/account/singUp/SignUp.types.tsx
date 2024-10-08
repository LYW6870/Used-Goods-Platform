import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface ISignUpUIProps {
  register: UseFormRegister<any>;
  handleSubmit: () => void;
  errors: FieldErrors<any>;
  checkId: (id: string) => void;
  password: string;
}
