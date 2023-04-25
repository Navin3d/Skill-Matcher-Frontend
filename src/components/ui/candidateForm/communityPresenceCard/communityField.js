import { useState, useEffect } from "react";
import Link from "next/link";
import { FormControl, FormLabel, Input, HStack, Button, Text } from "@chakra-ui/react";
import LinksList from "./linksList";
import { useSelector } from "react-redux";
import { getAccountData } from "../../../../store/account/account.selectors";

const CommunityField = ({ label, id, setValue, getValues, isEditMode, errors }) => {
  const [input, setInput] = useState("");
  const [links, setLinks] = useState([]);
  const [isEditMode1, setIsEditMode1] = useState(false);
  const [editModeLinks, setEditModeLinks] = useState(true);
  const accountData = useSelector(getAccountData());

  useEffect(() => {
    if (accountData?.communityPresence[id] && accountData?.communityPresence[id].length) {
      const newArray = accountData?.communityPresence[id]?.map((item, index) => ({
        id: index,
        label: item,
      }));
      setLinks(newArray);
    }
  }, [accountData]);

  useEffect(() => {
    if (links.length) {
      const prevValues = getValues("communityPresence");
      const linksText = links.map((item) => item.label);
      setValue("communityPresence", { ...prevValues, [id]: linksText });
    }
  }, [links]);

  const handleInputChange = (event) => setInput(event.target.value);

  const handleAddLink = () => {
    if (input) {
      setLinks((prev) => [...links, { label: input, id: Date.now() }]);
      setInput("");
    }
  };

  const handleRemoveLink = (linkId) => {
    setLinks((prev) => prev.filter((x) => x.id !== linkId));
  };

  const handleEditLink = (linkId) => {
    setIsEditMode1((prev) => !prev);
    if (editModeLinks.includes(linkId)) {
      setEditModeLinks((prev) => prev.filter((x) => x !== linkId));
    } else {
      setEditModeLinks((prev) => [...prev, linkId]);
    }
  };

  const handleLinksChange = (e, linkId) => {
    const newArr = links?.map((x) => {
      if (x.id === linkId) {
        return { ...x, label: e.target.value };
      } else {
        return x;
      }
    });
    setLinks(newArr);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <HStack>
        <Input
          readOnly={isEditMode}
          placeholder="Enter your content/website link"
          id={id}
          value={input}
          onChange={handleInputChange}
        />
        <Button type="button" size="md" onClick={handleAddLink}>
          Add link
        </Button>
      </HStack>
      <LinksList
        items={links}
        {...{
          handleRemoveLink,
          handleEditLink,
          handleLinksChange,
          editModeLinks,
          isEditMode,
        }}
      />
    </FormControl>
  );
};

export default CommunityField;
