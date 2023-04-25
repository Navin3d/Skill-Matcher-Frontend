import { TextareaField, Card } from "../../common";

const AboutMeCard = ({ register, isEditMode, errors }) => {
  return (
    <Card title="About me">
      <TextareaField
        validOpt={{ maxLength: { value: 1000, message: "Text is too long" } }}
        id="aboutMe"
        {...{ register, isEditMode, errors }}
      />
    </Card>
  );
};

export default AboutMeCard;
