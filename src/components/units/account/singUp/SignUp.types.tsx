// export interface ISignUpUIProps {
//   formData: {
//     id: string;
//     password: string;
//     confirmPassword: string;
//     name: string;
//   };
//   errors: {
//     id: string;
//     password: string;
//     name: string;
//     confirmPassword: string;
//   };
//   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   handleSubmit: () => void;
// }

import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface ISignUpUIProps {
  register: UseFormRegister<any>;
  handleSubmit: () => void;
  errors: FieldErrors<any>;
  checkId: (id: string) => void;
  password: string;
}
