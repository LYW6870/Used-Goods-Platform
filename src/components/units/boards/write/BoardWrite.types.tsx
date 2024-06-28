import React from 'react';

export interface IBoardWriteUIProps {
  formData: {
    writer: string;
    password: string;
    isComplete: boolean;
    saleType: string;
    category: string;
    title: string;
    contents: string;
    price: string;
    location: string;
  };
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleSubmit: (event: React.FormEvent) => void;
}
