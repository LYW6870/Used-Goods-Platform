import React, { FormEvent } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { IQuery } from '../../../../commons/types/generated/types';

export interface IFormData {
  category: string;
  isComplete: boolean;
  title: string;
  price: number;
  contents: string;
  // location?: string;
  address?: string;
  addressDetail?: string;
  images?: string[];
}

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, 'fetchBoard'>;
}

export interface IBoardWriteUIProps {
  onClickSubmit: (data: IFormData) => void;
  // handleSubmit: (event: UseFormHandleSubmit<IFormData, undefined>) => void;
  // handleSubmit: (event: UseFormHandleSubmit<IFormData, any>) => void;
  handleSubmit: UseFormHandleSubmit<IFormData, any>;
  formState: any;
  register: any;
  isEdit: boolean;
  data?: Pick<IQuery, 'fetchBoard'>;
}
