import { Button, HStack, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAccountData } from "../../../store/account/account.selectors";
import { Card } from "../../common";

const CertificationsCard = ({
  register,
  certificateFields,
  certificateAppend,
  certificateRemove,
  isEditMode,
  errors,
}) => {
  const accountData = useSelector(getAccountData());

  useEffect(() => {
    if (accountData !== null && isEditMode === false) {
      accountData["certifications"]?.map((item) => certificateAppend({ certificate: item }));
    }
  }, [accountData, isEditMode]);

  return (
    <Card title="Certifications">
      {isEditMode ? (
        <div>
          {accountData &&
            accountData?.certifications &&
            accountData?.certifications.length !==0 ? accountData?.certifications?.map((item, index) => (
              <Input
                readOnly
                border={0}
                marginTop={"10px"}
                key={index}
                defaultValue={item}
                type={"text"}
              ></Input>
            )): <p style={{color: 'grey'}}>No data provided</p>}
        </div>
      ) : (
        certificateFields?.map((field, index) => (
          <div key={field.id}>
            <HStack gap={"10px"}>
              <Input
                {...(isEditMode
                  ? { border: "0px", placeholder: "" }
                  : { placeholder: "Enter any certifications that you might have" })}
                readOnly={isEditMode}
                {...register(`certifications.${index}.certificate`, {
                  maxLength: { value: 500, message: "Text is too long" },
                })}
              />
              {!isEditMode && (
                <Button type="button" onClick={() => certificateRemove(index)}>
                  delete
                </Button>
              )}
            </HStack>
            {errors &&
              errors.certifications &&
              errors.certifications[index]?.certificate?.message && (
                <div style={{ color: "red", width: "200px" }}>
                  {errors.certifications[index]?.certificate?.message}
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
              certificateAppend({ certificate: "" });
            }}
          >
            Add field
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CertificationsCard;
