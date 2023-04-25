import { useEffect } from "react";
import { Layout } from "../components/layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadUserById } from "../store/users/users.actions";
import { UserProfile } from "../components/ui";
import {
  getUserProfile,
  getUserProfileLoadingStatus,
} from "../store/users/users.selectors";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { Loading } from "../components/common";

export default function User() {
  const router = useRouter();
  const userId = router.query?.userId;
  const dispatch = useDispatch();
  const user = useSelector(getUserProfile());
  const userLoading = useSelector(getUserProfileLoadingStatus());

  useEffect(() => {
    if (userId) {
      dispatch(loadUserById(userId));
    }
  }, [userId]);

  return (
    <Layout>
      <Button
        mb={6}
        fontSize="18px"
        px={10}
        py={4}
        bg={useColorModeValue("#fff", "#1a202c")}
        onClick={() => router.back()}
      >
        Back
      </Button>
      {!userLoading ? <UserProfile user={user} /> : <Loading />}
    </Layout>
  );
}
