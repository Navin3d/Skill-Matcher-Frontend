import { HStack, Flex, Button } from "@chakra-ui/react";
import _ from "lodash";
import { useEffect } from "react";

const Pagination = ({ pagesCount, onPageChange, currentPage }) => {
  const pages = _.range(1, pagesCount + 1);

  // useEffect(() => {
  //   console.log(pages);
  // }, [pages]);

  const getButtonStyles = (pageIndex) => {
    return currentPage !== pageIndex ? { variant: "outline" } : null;
  };

  if (pagesCount === 1) return null;

  return (
    <HStack>
      {pages?.map((page) => (
        <Button
          {...getButtonStyles(page)}
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
    </HStack>
  );
};

export default Pagination;
