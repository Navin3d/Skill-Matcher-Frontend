import { useState, useEffect } from "react";
import { getAccountData } from "../../../store/account/account.selectors";
import { citiesConstants } from "../../../utils/constants";
import SelectField from "./selectField";
import TextField from "./textField";
import { useSelector } from "react-redux";

export default function CitiesField({ register, id, getValues, watch, isEditMode }) {
  const [inputType, setInputType] = useState("select");
  const accountData = useSelector(getAccountData());

  useEffect(() => {
    if (accountData?.city) {
      const existsCity = citiesConstants.find((x) => x.value === accountData?.city);
      if (!existsCity) {
        setInputType("input");
      }
    }
  }, [accountData]);

  useEffect(() => {
    const cityValue = getValues("city");
    if (cityValue === "other") {
      setInputType("input");
    }
  }, [watch("city")]);

  return (
    <>
      {inputType === "select" ? (
        <SelectField
          {...{ register, isEditMode }}
          id={id}
          options={citiesConstants}
          label="City"
          validOpt={{ required: true }}
          placeholder="Choose a city"
        />
      ) : inputType === "input" ? (
        <TextField
          {...{ register, isEditMode }}
          id="city"
          type="text"
          label="City"
          validOpt={{ required: true }}
        />
      ) : null}
    </>
  );
}
