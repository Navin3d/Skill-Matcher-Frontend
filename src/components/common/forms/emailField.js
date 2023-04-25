import { FormControl, FormLabel, Input, border } from "@chakra-ui/react";

const EmailField = ({
  register,
  id,
  placeholder,
  showLabel,
  type,
  label,
  validOpt,
  isEditMode,
  component,
  errors,
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>
        {label} {component}
      </FormLabel>
      <Input
        pl={isEditMode ? "-10" : ""}
        {...(isEditMode
          ? { border: "0px", placeholder: "" }
          : { placeholder: placeholder })}
        {...register(id, { ...validOpt })}
        id={id}
        type={type || "text"}
        readOnly={true}
        color={'grey'}
      />
      {errors && errors[id]?.message && (
        <div style={{ color: "red", width: "250px" }}>
          {errors[id]?.message}
        </div>
      )}
    </FormControl>
  );
};

export default EmailField;
