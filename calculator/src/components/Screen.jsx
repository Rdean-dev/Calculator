import "./Screen.css";

// Displays the current calculator value or error message
// Props:
// - value: current input, result, or error

const Screen = ({ value }) => {
    return (
        <div className="screen">
            {value}
        </div>
    );
};

export default Screen;