import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "../../../common";

const UserAdditionalInfo = ({ data, title, user, aboutMe }) => {
  const [odds, setOdds] = useState([]);
  const [evens, setEvens] = useState([]);

  useEffect(() => {
    const even = data?.filter((item, index) => index % 2 === 0);
    setEvens(even);
    const odd = data?.filter((item, index) => index % 2 === 1);
    setOdds(odd);
  }, [data]);

  const handleDownloadResume = () => {
    if (user?.resume) {
      fetch(user?.resume).then((res) => {
        res.blob().then((blob) => {
          const fileUrl = window.URL.createObjectURL(blob);
          let alink = document.createElement("a");
          alink.href = fileUrl;
          alink.download = user?.resumeFileName || "CV";
          alink.click();
        });
      });
    }
  };
  return (
    <div>
      {data?.length !== 0 ? (
        <Card title={title}>
          {user ? (
            <Box>
              <Button onClick={handleDownloadResume} type="button" mt={2}>
                Download resume
              </Button>
            </Box>
          ) : aboutMe ? (
            <Box>
              <Text fontSize={"16px"}>{aboutMe}</Text>
            </Box>
          ) : (
            <HStack
              flexWrap={"wrap"}
              justifyContent={"space-evenly"}
              alignItems={"center"}
            >
              <VStack flexGrow={1}>
                {evens?.map((item, index) => (
                  <Text fontSize={"18px"} key={index}>
                    {item}
                  </Text>
                ))}
              </VStack>
              <VStack flexGrow={1}>
                {odds?.map((item, index) => (
                  <Text fontSize={"18px"} key={index}>
                    {item}
                  </Text>
                ))}
              </VStack>
            </HStack>
          )}
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserAdditionalInfo;
