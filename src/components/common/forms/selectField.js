import { Box, FormLabel, Input, Select, Text } from "@chakra-ui/react";

const SelectField = ({
  register,
  label,
  options,
  placeholder,
  getValues,
  id,
  validOpt,
  errors,
  hideLabel,
  isEditMode,
}) => {
  return (
    <Box w="100%">
      <FormLabel visibility={hideLabel ? "hidden" : ""}>{label}</FormLabel>
      <Select
        {...(isEditMode && { border: "0px", icon: "" })}
        disabled={isEditMode}
        placeholder={placeholder}
        {...register(id, { ...validOpt })}
      >
        {options?.map((item) => (
          <option key={item.value} value={item.value }>
            {item.label}
          </option>
        ))}
      </Select>
      {errors && errors[id]?.message && (
        <div style={{ color: "red", width: "250px" }}>
          {errors[id]?.message}
        </div>
      )}
    </Box>
  );
};

export default SelectField;
