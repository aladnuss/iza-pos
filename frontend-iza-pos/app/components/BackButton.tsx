import React from "react";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = "" }) => (
  <button
    onClick={onClick}
    style={{
      background: "var(--color-dark)",
      color: "var(--color-white)",
      transition: "background 0.2s",
      width: 40,
      height: 40,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      padding: 0,
    }}
    className={`font-semibold hover:opacity-90 ${className}`}
    aria-label="Back"
  >
    <span style={{ position: "relative", top: "-1px" }}>←</span>
  </button>
);

export default BackButton; 