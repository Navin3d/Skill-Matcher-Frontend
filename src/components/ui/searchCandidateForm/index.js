import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, SelectField, Pagination, Card } from "../../common";
import { HStack, VStack, Button, Flex, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers, loadAllUsers } from "../../../store/users/users.actions";
import {
  getUsers,
  getUsersLoadingStatus,
} from "../../../store/users/users.selectors";
import UsersList from "./usersList";
import MoreFilters from "./moreFilters";
import { Loading } from "../../common";

const SearchCandidateForm = () => {
  const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
  const [isMoreFilters, setIsMoreFilters] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(getUsers());
  const usersLoading = useSelector(getUsersLoadingStatus());
  const searchLoadingStatus = useSelector(getUsersLoadingStatus());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(loadAllUsers(0));
  }, []);

  useEffect(() => {
    // console.log(users?.profileResponseList);
    // console.log(users);
    setPageCount(Math.ceil(users?.size / 10));
  }, [users]);

  const handleSearch = (data) => {
    setCurrentPage(1);
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });
    if (data.openToTravel) {
      data.openToTravel = Number(data.openToTravel);
    } else if (isMoreFilters) {
      data.openToTravel = Number(data.openToTravel);
    } else {
      delete data.openToTravel;
    }

    if (data.experienceTo) {
      data.experienceTo =
        Number(new Date().getFullYear()) - Number(data.experienceTo);
    } else {
      delete data.experienceTo;
    }
    if (data.experienceFrom) {
      data.experienceFrom =
        Number(new Date().getFullYear()) - Number(data.experienceFrom);
    } else {
      delete data.experienceFrom;
    }
    if (Object.keys(data).length) {
      console.log(data);
      dispatch(searchUsers(data));
    } else {
      dispatch(searchUsers());
    }
  };

  const handleAddMoreFilters = () => {};

  const handlePageChange = (pageIndex) => {
    console.log(pageIndex);
    const values = getValues();
    console.log("valules: ", values);
    if (values?.skills) {
      dispatch(searchUsers(values));
    } else {
      dispatch(loadAllUsers(pageIndex - 1));
    }
    setCurrentPage(pageIndex);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSearch)}>
        <Card>
          <VStack align="stretch" spacing={8}>
            <HStack gap={"10px"} flexWrap={{ base: "wrap", md: "nowrap" }}>
              <Box
                display={"flex"}
                flexGrow={1}
                width={{ base: "60%", md: "100%" }}
              >
                <TextField
                  {...{ register,errors }}
                  id="skills"
                  name="skills"
                  placeholder="Search by skills"
                  validOpt={{
                    required: "Search is required",
                    pattern: {
                      // value:  /[a-zA-Z]/,
                      message: "Search is required",
                    },
                  }}
                />
              </Box>
              <Button
                margin={0}
                flexGrow={1}
                width={"120px"}
                px={10}
                type="submit"
              >
                Search
              </Button>
              <Button
                margin={0}
                flexGrow={1}
                px={10}
                type="button"
                onClick={() => setIsMoreFilters((prev) => !prev)}
              >
                {isMoreFilters ? "Hide filters" : "Add more filters"}
              </Button>
            </HStack>
            {isMoreFilters ? (
              <MoreFilters {...{ register, getValues, setValue }} />
            ) : null}
          </VStack>
        </Card>
      </form>
      {!searchLoadingStatus ? (
        users?.profileResponseList?.length ? (
          <UsersList users={users?.profileResponseList} />
        ) : null
      ) : (
        <Loading />
      )}
      <Flex w="100%" justifyContent="end">
        <Pagination
          itemsCount={users?.profileResponseList?.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          pagesCount={pageCount}
        />
      </Flex>
    </>
  );
};

export default SearchCandidateForm;
