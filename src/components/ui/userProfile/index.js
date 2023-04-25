import { VStack } from "@chakra-ui/react";
import UserCard from "../searchCandidateForm/userCard";
import UserAdditionalInfo from "./userAdditionalInfo";

const UserProfile = ({ user }) => {
  return (
    <VStack align="stretch" spacing={10}>
      {user && <UserCard user={user} />}

      {user?.contentCreation && (
        <UserAdditionalInfo title={"Content Creation"} data={user?.contentCreation} />
      )}

      {user?.education && <UserAdditionalInfo title={"Education"} data={user?.education} />}

      {user?.certifications && (
        <UserAdditionalInfo title={"Certifications"} data={user?.certifications} />
      )}

      {user?.resume && <UserAdditionalInfo title={"Resume"} user={user} />}

      {user?.aboutMe && <UserAdditionalInfo title={"About me"} aboutMe={user?.aboutMe} />}
    </VStack>
  );
};

export default UserProfile;
