import React, { useMemo } from 'react';
import { useHistory, useLocation, Redirect } from 'umi';
import { useDispatch, useSelector } from 'dva';
import PrivateLayout from './Private';
import PublicLayout from './Public';

const Layouts = {
  public: PublicLayout,
  private: PrivateLayout,
};

const BasicLayout: React.FC = ({ children }) => {
  const history = useHistory();

  const { pathname, query, search }: any = useLocation();

  const [{ authorized }] = useSelector(({ user }: any) => [user]);

  // Layout Rendering
  const getLayout = useMemo(() => {
    if (/^\/login(?=\/|$)/i.test(pathname)) {
      return 'public';
    }
    return 'private';
  }, [pathname]);

  const isLoginLayout = getLayout === 'public';

  const Container = Layouts[getLayout];

  if (!isLoginLayout && !authorized) {
    return <Redirect to={{ pathname: '/login', query: { redirect: `${pathname}?${search}` } }} />;
  }
  if (isLoginLayout && authorized) {
    if (query.redirect === '/') {
      return <Redirect to="/trang-chu" />;
    }
    if (query.redirect) {
      return <Redirect to={query.redirect} />;
    }
    return <Redirect to="/" />;
  }

  return <Container>{children}</Container>;
};

export default BasicLayout;
