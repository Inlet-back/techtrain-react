import React from "react";

interface ButtonProps {
  type: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children, style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        flex: 1,
        padding: "12px",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: "bold",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;