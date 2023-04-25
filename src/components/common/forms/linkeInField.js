import { FormControl, FormLabel, Input, border } from "@chakra-ui/react";

const LinkedInField = ({
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
  accountData,
}) => {
  // console.log(accountData);
  return (
    <FormControl>
      <FormLabel htmlFor={id}>
        {label} {component}
      </FormLabel>
      {isEditMode ? (
        <a
          href={accountData ? accountData.linkedIn : ""}
          target="_blank"
          rel="noreferrer"
          style={{ width: "100%" }}
        >
          <Input
            width={"100%"}
            color={"blue"}
            cursor="pointer"
            {...(isEditMode
              ? { border: "0px", placeholder: "" }
              : { placeholder: placeholder })}
            {...register(id, { ...validOpt })}
            id={id}
            type={type || "text"}
            readOnly={isEditMode}
            pl={isEditMode ? "-10" : ""}
          />
        </a>
      ) : (
        <Input
          {...(isEditMode
            ? { border: "0px", placeholder: "" }
            : { placeholder: placeholder })}
          {...register(id, { ...validOpt })}
          id={id}
          type={type || "text"}
          readOnly={isEditMode}
        />
      )}
      {errors && errors[id]?.message && (
        <div style={{ color: "red", width: "250px" }}>
          {errors[id]?.message}
        </div>
      )}
    </FormControl>
  );
};

export default LinkedInField;
