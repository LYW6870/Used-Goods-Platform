import React, { FormEvent } from 'react';
import {
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { IQuery } from '../../../../commons/types/generated/types';

export interface IFormData {
  category: string;
  isComplete: string;
  title: string;
  price: number;
  contents: string;
  address?: string;
  addressDetail?: string;
  image?: string;
}

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, 'fetchBoard'>;
}

export interface IBoardWriteUIProps {
  onClickSubmit: (data: IFormData) => void;
  // handleSubmit: UseFormHandleSubmit<IFormData, any>;
  handleSubmit: UseFormHandleSubmit<IFormData>;
  onToggleModal: () => void;
  addressComplete: (data: any) => void;
  onChangeContents: (value: string) => void;
  formState: FormState<IFormData>;
  setValue: UseFormSetValue<IFormData>;
  register: UseFormRegister<IFormData>;
  isToggleModal: boolean;
  isEdit: boolean;
  data?: Pick<IQuery, 'fetchBoard'>;
}
