import "./ButtonBox.css";

// Container for all calculator buttons
// Handles layout and spacing of buttons
// children are Button components passed from parent

const ButtonBox = ({ children }) => {
  return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;