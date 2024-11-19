import { Form, Input } from 'antd';
import React from 'react';

export default function FormInput(props: any) {
  const { Component = Input, componentProps = {}, label, name, ...rest } = props || {};
  return (
    <Form.Item label={label} name={name} {...rest}>
      <Component {...componentProps} />
    </Form.Item>
  );
}
