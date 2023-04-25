import { useState, useEffect } from "react";
import { VStack, Flex } from "@chakra-ui/react";
import { SelectField, CheckboxField, TextField } from "../../common";
import CitiesAutocompletes from "./citeAutocomplates";

const MoreFilters = ({ register, getValues, setValue }) => {
  const [experienceInterval, setExperienceInterval] = useState([]);

  useEffect(() => {
    const intervalArray = [];
    for (let i = 0; i <= 40; i++) {
      intervalArray.push({ value: i, label: i });
    }
    setExperienceInterval(intervalArray);
  }, []);

  return (
    <VStack align="strech" spacing={2}>
      <Flex gap={2}>
        <SelectField
          register={register}
          label="Exerience from"
          options={experienceInterval}
          id="experienceFrom"
          placeholder="Choose experience"
        />
        <SelectField
          register={register}
          options={experienceInterval}
          label="Exerience to"
          // hideLabel={true}
          id="experienceTo"
          placeholder="Choose experience"
        />
      </Flex>
      <SelectField
        register={register}
        label="Candidate type"
        options={[
          {
            value: "FULL_TIME",
            label: "Full time",
          },
          {
            value: "PART_TIME",
            label: "Part time",
          },
        ]}
        id="candidateType"
        placeholder="Choose a type"
      />
      {/* <TextField register={register} id="city" name="city" label="City" /> */}
      <CitiesAutocompletes
        id="city"
        label="City"
        validOpt={{
          required: `City is required`,
          pattern: {
            value: /^[A-Z][a-z]{3,6}$/,
            message: "City is invalid",
          },
        }}
        {...{ register, getValues, setValue }}
        maxLength="60"
      />
      <CheckboxField
        getValues={getValues}
        register={register}
        id="openToTravel"
        label="Open to travel"
      />
    </VStack>
  );
};

export default MoreFilters;
