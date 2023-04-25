import { Button, HStack, Input, Tooltip } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAccountData } from "../../../store/account/account.selectors";
import { Card } from "../../common";

const style = {
  display: "inline-block",
  backgroundColor: "#E1E7EF",
  width: "30px",
  borderRadius: "5px",
  textAlign: "center",
};

const ContentCreation = ({
  register,
  contentCreationFields,
  contentCreationAppend,
  contentCreationRemove,
  isEditMode,
  errors,
}) => {
  const accountData = useSelector(getAccountData());

  useEffect(() => {
    if (accountData !== null && isEditMode === false) {
      accountData["contentCreation"]?.map((item) => contentCreationAppend({ link: item }));
    }
  }, [accountData, isEditMode]);
  // console.log(accountData?.contentCreation);

  return (
    <Card
      component={
        <Tooltip
          hasArrow
          label="If you are a content creator, enter their urls. (e.g: Urls for Udemy, Teachable, Blogs, Youtube, Website, etc)"
          bg="gray.300"
          color="black"
        >
          <span style={style}>?</span>
        </Tooltip>
      }
      title="Content Creation"
    >
      {isEditMode ? (
        <div>
          {accountData &&
          accountData?.contentCreation &&
          accountData?.contentCreation.length !== 0 ? (
            accountData?.contentCreation?.map((item, index) => (
              <a
                href={"https://" + accountData?.contentCreation[index]}
                key={index}
                target="_blank"
                style={{ color: "blue" }}
                rel="noreferrer"
              >
                <Input readOnly border={0} marginTop={"10px"} defaultValue={item} type={"text"} />
              </a>
            ))
          ) : (
            <p style={{ color: "grey" }}>No data provided</p>
          )}
        </div>
      ) : (
        contentCreationFields?.map((field, index) => (
          <div key={field.id}>
            <HStack gap={"10px"}>
              <Input
                {...(isEditMode
                  ? { border: "0px", placeholder: "" }
                  : { placeholder: "Enter your content link" })}
                readOnly={isEditMode}
                {...register(`contentCreation.${index}.link`, {
                  pattern: {
                    value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                    message: "Input is invalid",
                  },
                  maxLength: { value: 500, message: "Text is too long" },
                })}
                // /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
              />
              {!isEditMode && (
                <Button type="button" onClick={() => contentCreationRemove(index)}>
                  delete
                </Button>
              )}
            </HStack>
            {errors && errors.contentCreation && errors.contentCreation[index]?.link?.message && (
              <div style={{ color: "red", width: "200px" }}>
                {errors.contentCreation[index]?.link?.message}
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
              contentCreationAppend({ link: "" });
            }}
          >
            Add field
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ContentCreation;
