import { FormControl, FormLabel, Input, Link, border } from "@chakra-ui/react";
import { useEffect } from "react";

const TextField = ({
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
  maxLength,
}) => {
  // useEffect(() => {
  //   if (getValues) {
  //     console.log(getValues(id));
  //   }
  // }, [getValues]);

  return (
    <FormControl display={showLabel ? "flex" : ""} alignItems={showLabel ? "end" : ""}>
      <FormLabel htmlFor={id}>
        {label} {component}
      </FormLabel>
      {/* <Link></Link> */}
      <Input
        pl={isEditMode ? "-10" : ""}
        {...(isEditMode ? { border: "0px", placeholder: "" } : { placeholder: placeholder })}
        {...register(id, { ...validOpt })}
        id={id}
        type={type || "text"}
        readOnly={isEditMode}
        maxLength={maxLength ? maxLength : ""}
        color={isEditMode ? "grey" : ""}
      />
      {errors && errors[id]?.message && (
        <div style={{ color: "red", width: "250px" }}>{errors[id]?.message}</div>
      )}
    </FormControl>
  );
};

export default TextField;
