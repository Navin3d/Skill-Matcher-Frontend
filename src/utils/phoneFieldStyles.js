const phoneFieldCustomStyles = ({
  controlBg,
  menuBg,
  menuItemHoverBg,
  borderBg,
  singleValueColor,
}) => {
  return {
    container: (provided) => ({
      ...provided,
      minWidth: "108px",
    }),
    input: (provided) => ({
      ...provided,
      color: singleValueColor,
    }),
    inputContainer: (provided) => ({
      ...provided,
    }),
    control: (provided) => ({
      ...provided,
      background: controlBg,
      border: "1px solid " + borderBg,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: singleValueColor,
    }),
    menu: (provided) => ({
      ...provided,
      background: menuBg,
    }),
    option: (provided, { isFocused }) => {
      return {
        ...provided,
        background: isFocused && menuItemHoverBg,
      };
    },
  };
};

export default phoneFieldCustomStyles;
