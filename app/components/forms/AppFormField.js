import React from "react";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";
import TextInputField from "../input/TextInputField";

function AppFormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, touched, errors, values } =
    useFormikContext();
  return (
    <>
      <TextInputField
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        value={values[name] ? `${values[name]}` : ""}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
