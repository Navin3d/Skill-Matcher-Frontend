import { Flex } from "@chakra-ui/react";
import Carousel from "better-react-carousel";

const Gallery = ({ data }) => {
  const containerStyle = {
    paddingBlock: "7px",
  };
  const responsive = [
    {
      breakpoint: 935,
      cols: 2,
      rows: data?.length <= 4 && 2,
    },
    {
      breakpoint: 1115,
      cols: 3,
    },
  ];
  return (
    <div style={{ width: "90%" }}>
      <Carousel
        hideArrow={data?.length <= 4}
        responsiveLayout={responsive}
        containerStyle={containerStyle}
        mobileBreakpoint={610}
        cols={4}
        rows={1}
        gap={"10px"}
        loop
      >
        {data?.map((item, index) => (
          <Carousel.Item key={index}>
            <Flex
              style={{
                height: "35px",
                backgroundColor: "#E4EBE4",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px",
                paddingInline: "10px",
                fontSize: "16px",
                color: "#000",
                fontWeight: "500",
              }}
            >
              {item}
            </Flex>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
