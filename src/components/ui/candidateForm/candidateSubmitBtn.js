import { Button, Flex } from "@chakra-ui/react";

const CandidateSubmitBtn = ({ isEditMode }) => {
  return (
    <Flex w="100%" justifyContent="end">
      {!isEditMode && (
        <Button type="submit" colorScheme="blue" size="lg">
          Save
        </Button>
      )}
    </Flex>
  );
};

export default CandidateSubmitBtn;
