/* eslint-disable react/no-unescaped-entities */
import { FormLabel, Input, Stack } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import React, { useState } from "react";
import { citiesConstants } from "../../../utils/constants";

export default function CitiesAutocomplete({
  isEditMode,
  label,
  id,
  validOpt,
  errors,
  register,
  setValue,
  getValues,
  maxLength,
}) {
  const [options, setOptions] = useState(citiesConstants);

  const onSelect = ({ item }) => {
    console.log(item);
    if (!options.includes(item.value)) {
      setOptions([...options, item.value]);
    }
    setValue(id, item.value);
  };

  return (
    <Stack direction="column">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {isEditMode ? (
        <Input
          pl={"-10"}
          w={"25%"}
          {...(isEditMode && { border: "0px" })}
          readOnly={isEditMode}
          {...register(id, { ...validOpt })}
          type="text"
          placeholder="Search for city"
          maxLength={maxLength ? maxLength : ""}
          color={isEditMode ? "grey" : ""}
        />
      ) : (
        <AutoComplete
          defaultValue={getValues(id)}
          onSelectOption={onSelect}
          rollNavigation
          creatable
        >
          <AutoCompleteInput
            {...(isEditMode && { border: "0px" })}
            {...register(id, { ...validOpt })}
            id={id}
            placeholder="Search for city"
          ></AutoCompleteInput>
          <AutoCompleteList>
            {options.map((option, oid) => (
              <AutoCompleteItem key={`option-${oid}`} value={option}>
                {option}
              </AutoCompleteItem>
            ))}
            <AutoCompleteCreatable>
              {({ value }) => <span>Add "{value}" to List</span>}
            </AutoCompleteCreatable>
          </AutoCompleteList>
        </AutoComplete>
      )}

      {errors && errors[id]?.message && (
        <div style={{ color: "red", width: "200px" }}>{errors[id]?.message}</div>
      )}
    </Stack>
  );
}
