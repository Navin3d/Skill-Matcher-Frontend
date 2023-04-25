import UserCard from "./userCard";
import { Grid, GridItem } from "@chakra-ui/react";

const UsersList = ({ users }) => {
  return (
    <Grid
      // templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
      gap={{ base: 16, md: 4 }}
    >
      {users?.map((user) => (
        <GridItem key={user?.id}>
          <UserCard user={user} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default UsersList;
