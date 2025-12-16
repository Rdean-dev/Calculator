import "./Button.css";

// Reusable button component for the calculator
// Props:
// - className: optional styling
// - value: text to display on the button
// - onClick: handler for button presses

const Button = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
