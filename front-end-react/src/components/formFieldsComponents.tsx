import { useField } from "formik";
import React, { ReactNode } from "react";

interface MyTextInputPropsType {
  label: string;
  name: string;
  type?: string;
  servererrormessage?: string;
  placeholder?: string;
}

interface MyCheckBoxInputPropsType {
  children: ReactNode;

  name: string;
  label: string;
}

export const MyTextInput: React.FC<MyTextInputPropsType> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input className="" {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : props.servererrormessage ? (
        <div className="error">{props.servererrormessage}</div>
      ) : null}
    </>
  );
};

export const MyCheckbox: React.FC<MyCheckBoxInputPropsType> = ({
  children,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className="">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};
