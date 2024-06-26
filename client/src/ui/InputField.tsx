import { useField } from "formik";
import React from "react";
import { Input } from "./Input";
import { InputErrorMsg } from "./InputErrorMsg";

export const InputField: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    name: string;
    border?: boolean;
    rounded?: boolean;
    errorMsg?: string;
    label?: string;
    textarea?: boolean;
    altErrorMsg?: string;
    rows?: number;
  }
> = ({ border=true, rounded=false, label, textarea, errorMsg, ref: _, className, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={`h-full w-full block ${className} `}>
      {label ? (
        <div className={`flex mb-2 text-primary-300`}>{label}</div>
      ) : null}
      <Input className={`${border ? "border-b-[1px] border-primary": ""} placeholder-primary ${rounded ? "rounded-lg" : ""}`}  error={meta.error} textarea={textarea} {...field} {...props} />
      {meta.error && meta.touched ? (
        <div className={`flex mt-1`}>
          <InputErrorMsg>{errorMsg || meta.error}</InputErrorMsg>
        </div>
      ) : null}
    </div>
  );
};