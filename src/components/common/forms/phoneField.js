import { FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useEffect } from "react";
import countriesCodesConstants from "../../../utils/constants/countriesCodes.constants";

const PhoneField = ({
  register,
  label,
  id,
  validOpt,
  setValue,
  getValues,
  isEditMode,
  errors,
}) => {
  useEffect(() => {
    getValues("country_code");
  }, []);

  const handleSelectCode = ({ item }) => {
    setValue("country_code", item.value);
    console.log(item.value);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <HStack display={"flex"}>
        {isEditMode ? (
          <Input
            w={"18%"}
            {...(isEditMode && { border: "0px" })}
            readOnly={isEditMode}
            {...register("country_code", { ...validOpt })}
            type="text"
            placeholder="Code"
            color={isEditMode ? "grey" : ""}
          />
        ) : (
          <div>
            <AutoComplete
              style={{ width: "10px" }}
              openOnFocus
              isReadOnly={isEditMode}
              defaultValue={getValues("country_code")}
              onSelectOption={handleSelectCode}
              rollNavigation
            >
              <AutoCompleteInput
                {...(isEditMode && { border: "0px" })}
                width={"100px"}
                placeholder="Code"
              ></AutoCompleteInput>
              <AutoCompleteList width={"100px"}>
                {countriesCodesConstants.map((option, oid) => (
                  <AutoCompleteItem key={`option-${oid}`} value={option.value}>
                    {option.value}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </AutoComplete>
          </div>
        )}

        <Input
          {...(isEditMode && { border: "0px" })}
          readOnly={isEditMode}
          {...register(id, { ...validOpt })}
          type="text"
          placeholder="Enter phone number"
          color={isEditMode ? "grey" : ""}
        />
      </HStack>
      {errors && errors[id]?.message && (
        <div style={{ color: "red", width: "200px" }}>
          {errors[id]?.message}
        </div>
      )}
    </FormControl>
  );
};

export default PhoneField;
