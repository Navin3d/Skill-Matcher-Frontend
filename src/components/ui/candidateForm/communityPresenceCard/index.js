import { Tooltip } from "@chakra-ui/react";
import { Card } from "../../../common";
import CommunityField from "./communityField";

const style = {
  display: "inline-block",
  backgroundColor: "#E1E7EF",
  width: "30px",
  borderRadius: "5px",
  textAlign: "center",
};

const CommunityPresence = ({ setValue, getValues, isEditMode, errors }) => {
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
      spacing={8}
    >
      <CommunityField id="blogs" {...{ setValue, getValues, isEditMode, errors }} />
    </Card>
  );
};

export default CommunityPresence;
