import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  UnorderedList,
  Button,
  VStack,
  Flex,
  StackDivider,
  Input,
  Box,
} from "@chakra-ui/react";
import { GrFormClose } from "react-icons/gr";

const LinksList = ({
  items,
  handleRemoveLink,
  handleEditLink,
  editModeLinks,
  handleLinksChange,
  isEditMode,
}) => {
  const [values, setValues] = useState({});

  // useEffect(() => {
  //   console.log("values: ", values);
  // }, [values]);

  useEffect(() => {
    items?.forEach((item) =>
      setValues((prev) => ({ ...prev, [item?.id]: item.label }))
    );
  }, []);

  const getValue = (linkId) => {
    const obj = items.find((x) => x.id === linkId);
    return obj.label;
  };

  const handleChange = (event, valueId) => {
    setValues((prev) => ({ ...prev, [valueId]: event.target.value }));
    handleLinksChange(event, valueId);
  };

  return (
    <VStack mt={5} divider={<StackDivider />}>
      <Flex w="100%" px={1} gap={2} alignItems="center" flexWrap={"wrap"}>
        {items?.map((item) => {
          return (
            <Box key={item.id}>
              {editModeLinks ? (
                  <Input
                    readOnly={isEditMode}
                    value={getValue(item?.id)}
                    onChange={(e) => handleChange(e, item.id)}
                    h="32px"
                    minW={"100px"}
                  />
              ) : (
                item?.label
              )}
              <ControlBtns
                linkId={item?.id}
                {...{ handleRemoveLink, handleEditLink, editModeLinks }}
              />
            </Box>
          );
        })}
      </Flex>
    </VStack>
  );
};

const ControlBtns = ({
  linkId,
  handleRemoveLink,
  handleEditLink,
  editModeLinks,
}) => {
  return null;
};

export default LinksList;
