import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { Card } from "../../common";
import Carousel from "../../common/carousel";

export const candidatesTypes = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
};

const UserCard = ({ user }) => {
  return (
    <Card customStyles={{ height: "100%" }}>
      <HStack flexWrap={"wrap"} gap={"20px"} align="start">
        <HStack
          w={{ base: "100%", lg: "unset" }}
          justifyContent={{ base: "center", lg: "unset" }}
          // backgroundColor={"red"}
        >
          <Link href={user?.id}>
            {user?.photo ? (
              <Image src={user?.photo} borderRadius="6px" width="250px" h="260px" />
            ) : (
              <AiOutlineUser
                style={{
                  width: "250px",
                  fontSize: "260px",
                }}
              />
            )}
          </Link>
        </HStack>
        <VStack
          // backgroundColor={"yellow.600"}
          width={{ base: "100%", lg: "unset" }}
          flexWrap={"wrap"}
          gap={"30px"}
        >
          <HStack
            flexWrap={"wrap"}
            // backgroundColor={"twitter.400"}
            gap={"15px"}
            marginLeft={{ base: "unset", lg: "6px" }}
            w="100%"
          >
            <Box flexGrow={1} width={"100%"}>
              <Link href={user?.id}>
                <Text
                  textAlign={{ base: "center", lg: "unset" }}
                  color={"blue.600"}
                  fontSize="20px"
                >
                  {user?.fullName}
                </Text>
              </Link>
            </Box>

            {user?.contentCreation?.length && (
              <HStack justifyContent={{ base: "center", lg: "unset" }} flexGrow={1}>
                <img width={"30px"} src="/blue_diamond.png" alt="gemPng" />
                <Text fontSize="20px" fontWeight={500}>
                  Content Creator
                </Text>
              </HStack>
            )}

            {user?.certifications?.length && (
              <HStack justifyContent={{ base: "center", lg: "unset" }} flexGrow={1}>
                <img width={"30px"} src="/red_diamond.png" alt="gemPng" />
                <Text fontSize="20px" fontWeight={500}>
                  Certified
                </Text>
              </HStack>
            )}
          </HStack>
          <HStack
            justifyContent={{ base: "unset", md: "center", lg: "unset" }}
            flexWrap={"wrap"}
            // backgroundColor={"telegram.500"}
            gap={"20px"}
            w={"100%"}
          >
            <VStack marginLeft={"8px"}>
              <InfoField label="Experience" value={user?.experience} />
              <InfoField label="City" value={user?.city} />
              <InfoField label="Trainer type" value={candidatesTypes[user?.candidateType]} />
              <InfoField label="Open to travel" value={user?.openToTravel ? "Yes" : "No"} />
            </VStack>
            <VStack>
              <InfoField
                label="Mobile"
                value={user?.mobile?.country_code + user?.mobile?.phoneNumber}
              />
              <InfoField label="Email" value={user?.email} />
              {user?.linkedIn && (
                <HStack w="100%">
                  <Text fontWeight="500" fontSize="18px">
                    LinkedIn:
                  </Text>
                  <Link target="_blank" href={user?.linkedIn}>
                    <Text color={"blue.600"} textDecoration={"underline"} fontSize="18px">
                      {user?.linkedIn}
                    </Text>
                  </Link>
                </HStack>
              )}
              <InfoField label="Expected Commercials" value={user?.expectedCommercials} />
            </VStack>
          </HStack>
        </VStack>
      </HStack>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HStack justifyContent={"center"} width={"80vw"}>
          <Carousel data={user?.skills} />
        </HStack>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HStack justifyContent={"center"} width={"80vw"}>
          <Carousel data={user?.clients} />
        </HStack>
      </div>
    </Card>
  );
};

const InfoField = ({ label, value }) => {
  return (
    <HStack w="100%">
      <Text fontWeight="500" fontSize="18px">
        {label}:
      </Text>
      <Text fontSize="18px">{value}</Text>
    </HStack>
  );
};

export default UserCard;
