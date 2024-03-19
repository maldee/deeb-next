import { FC, ReactNode } from 'react';

import styles from "./layout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className={styles.dform}>{children}</div>;
};

export default AuthLayout;
