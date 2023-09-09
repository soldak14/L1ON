import { ReactNode } from "react";

import Styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  onClick?: any;
  isConnected?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
}

export const Button = ({children, onClick, type}: ButtonProps) => (
  <button
    className={Styles.button}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);
