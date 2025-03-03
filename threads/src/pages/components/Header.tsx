import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: "green", width: "100%", padding: "16px", position: "sticky", top: 0, left: 0 }}>
      <h1 
      style={{ fontSize: "48px", fontWeight: "bold", color: "white" }}
      onClick={() => navigate("/")}
      >
        掲示板
      </h1>
      <div style={{marginRight: "50px", textAlign: "right"}}>
          <Button
            type="button"
            onClick={() => navigate("/threads/new")}
            style={{ backgroundColor: "blue", color: "white", padding: "8px 16px" }}
          >
            スレッドを作成
          </Button>
        </div>
    </div>
  );
};

export default Header;