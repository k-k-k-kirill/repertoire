import React from "react";
import "./FormBlock.scss";

const FormBlock: React.FC = ({ children }) => {
  return <div className="form-block">{children}</div>;
};

export default FormBlock;
