import React, { FC, MouseEventHandler } from 'react';
import './Button.css';

type ButtonProps = {
  disabled?: boolean;
  children: any;
  onClick: MouseEventHandler;
}

export const Button: FC<ButtonProps> = ({children, onClick, disabled}) => (
  <button className="Button" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);