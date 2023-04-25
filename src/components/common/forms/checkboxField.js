import { Flex, FormControl } from "@chakra-ui/react";

const CheckboxField = ({ register, id, label, isEditMode, getValues }) => {
  return (
    <FormControl>
      <Flex alignItems={"center"} gap={"10px"}>
        <input
          disabled={isEditMode}
          style={{ width: "18px", height: "18px" }}
          {...register(id)}
          defaultChecked={getValues(id)}
          id={id}
          type="checkbox"
        />
        <label htmlFor={id}>{label}</label>
      </Flex>
    </FormControl>
  );
};

export default CheckboxField;
