import { Button, HStack, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAccountData } from "../../../store/account/account.selectors";
import { Card } from "../../common";

const EducationCard = ({
  register,
  educationFields,
  educationAppend,
  educationRemove,
  isEditMode,
  errors,
}) => {
  const accountData = useSelector(getAccountData());

  useEffect(() => {
    if (accountData !== null && isEditMode === false) {
      accountData["education"]?.map((item) => educationAppend({ study: item }));
    }
  }, [accountData, isEditMode]);

  return (
    <Card title="Education">
      {isEditMode ? (
        <div>
          {accountData && accountData?.education && accountData?.education.length !== 0 ? (
            accountData?.education?.map((item, index) => (
              <Input
                readOnly
                border={0}
                marginTop={"10px"}
                key={index}
                defaultValue={item}
                type={"text"}
                // color={isEditMode ? "grey" : ""}
                style={{ color: "grey" }}
              ></Input>
            ))
          ) : (
            <p style={{ color: "grey" }}>No data provided</p>
          )}
        </div>
      ) : (
        educationFields?.map((field, index) => (
          <div key={field.id}>
            <HStack gap={"10px"}>
              <Input
                {...(isEditMode
                  ? { border: "0px", placeholder: "" }
                  : { placeholder: "Enter educational details" })}
                readOnly={isEditMode}
                {...register(`education.${index}.study`, {
                  maxLength: { value: 500, message: "Text is too long" },
                })}
              />
              {!isEditMode && (
                <Button type="button" onClick={() => educationRemove(index)}>
                  delete
                </Button>
              )}
            </HStack>
            {errors && errors.education && errors.education[index]?.study?.message && (
              <div style={{ color: "red", width: "200px" }}>
                {errors.education[index]?.study?.message}
              </div>
            )}
          </div>
        ))
      )}

      <div style={{ marginTop: "18px" }}>
        {!isEditMode && (
          <Button
            w={"25%"}
            minW={"100px"}
            type="button"
            onClick={() => {
              educationAppend({ study: "" });
            }}
          >
            Add field
          </Button>
        )}
      </div>
    </Card>
  );
};

export default EducationCard;
