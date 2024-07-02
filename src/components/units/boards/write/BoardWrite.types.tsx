import React from 'react';
import { IQuery } from '../../../../commons/types/generated/types';

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, 'fetchBoard'>;
}

export interface IBoardWriteUIProps {
  formData: {
    writer: string;
    password: string;
    isComplete: boolean;
    saleType: string;
    category: string;
    title: string;
    contents: string;
    price: number;
    location: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isEdit: boolean;
  data?: Pick<IQuery, 'fetchBoard'>;
}
