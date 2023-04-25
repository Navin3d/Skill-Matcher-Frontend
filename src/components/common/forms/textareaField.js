import { Textarea, FormLabel, FormControl, Text } from "@chakra-ui/react";

const TextareaField = ({
  label,
  register,
  id,
  validOpt,
  isEditMode,
  errors,
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Textarea
        {...(isEditMode
          ? { border: "0px", resize: "none", placeholder: "No data provided" }
          : {
              placeholder:
                "Enter any specific message which you want to convey to recruiters",
            })}
        readOnly={isEditMode}
        {...register(id, { ...validOpt })}
        color={isEditMode ? "grey" : ""}
        id={id}
      />
      {errors && errors[id]?.message && (
        <div style={{ color: "red", width: "200px" }}>
          {errors[id]?.message}
        </div>
      )}
    </FormControl>
  );
};

export default TextareaField;
