import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'umi';
import PrivateLayout from './Private';
import PublicLayout from './Public';

const Layouts = {
  public: PublicLayout,
  private: PrivateLayout,
};

const BasicLayout: React.FC = ({ children }) => {
  const history = useHistory();

  const { pathname } = useLocation();

  // Layout Rendering
  const getLayout = useMemo(() => {
    if (/^\/login(?=\/|$)/i.test(pathname)) {
      return 'public';
    }
    return 'private';
  }, [pathname]);

  const Container = Layouts[getLayout];

  return <Container>{children}</Container>;
};

export default BasicLayout;
