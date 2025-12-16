import React from "react";
import "./Wrapper.css";

// Main wrapper/container for the calculator
// Handles overall layout ant styling
// children: Screen + ButtonBox

const Wrapper = ({ children }) => {
    return <div className="wrapper">{children}</div>;
};

export default Wrapper;
