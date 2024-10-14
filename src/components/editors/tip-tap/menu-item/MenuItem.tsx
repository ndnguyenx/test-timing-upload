import './style.scss';

import React from 'react';

interface IProps {
  icon?: React.ReactNode;
  title?: string;
  action?: () => void;
  isActive?: () => boolean;
}

export const MenuItem = ({ icon, title, action, isActive }: IProps) => (
  <div
    className={`menu-item ${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    {icon}
  </div>
);
