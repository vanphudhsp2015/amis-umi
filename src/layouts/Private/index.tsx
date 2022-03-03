import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useHistory, useLocation } from 'umi';
import { isArray } from 'lodash';
import { useSelector, useDispatch } from 'dva';
import styles from './index.less';
import classnames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

const { Sider } = Layout;
const { SubMenu, Divider } = Menu;
const PrivateLayout: React.FC = (props) => {
  const history = useHistory();

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [{ isMobileView, isMenuCollapsed }] = useSelector(({ settings }: any) => [settings]);

  const [menuData, setMenuData] = useState([
    {
      title: 'Roles',
      key: 'roles',
      url: ['/roles'],
    },
    {
      title: 'Accounts',
      key: 'accounts',
      url: ['/accounts'],
    },
  ]);

  const [selectedKeys, updateSelectedKeys] = useState<any[] | []>([]);

  const onCollapse = (value: any, type: any) => {
    if (type === 'responsive' && isMenuCollapsed) {
      return;
    }

    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMenuCollapsed',
        value: !isMenuCollapsed,
      },
    });
  };

  const convertPathname = useMemo(() => {
    if (pathname) {
      const listItemPath = pathname.split('/');
      return listItemPath.map((item) => (Number.parseInt(item, 10) ? ':id' : item)).join('/');
    }
    return '';
  }, [pathname]);

  const flattenItems = (items: any, key: any) =>
    items.reduce((flattenedItems: any, item: any) => {
      flattenedItems.push(item);
      if (Array.isArray(item[key])) {
        return flattenedItems.concat(flattenItems(item[key], key));
      }
      return flattenedItems;
    }, []);

  const setSelectedKeys = () => {
    const selectedItem = flattenItems(menuData, 'children').find((item: any) => {
      if (isArray(item.url)) {
        return item.url.filter((itemChildren: any) => itemChildren === convertPathname)[0];
      }
      return item.url === pathname;
    });
    updateSelectedKeys(selectedItem ? [selectedItem.key] : []);
  };

  useEffect(() => {
    if (pathname) {
      setSelectedKeys();
    }
  }, [pathname]);

  const generateMenuItems = () => {
    const generateItem = (item: any) => {
      const { key, title, url, icon, disabled, pro } = item;
      if (item.divider) {
        return <Divider key={Math.random()} />;
      }
      if (item.url) {
        return (
          <Menu.Item
            className={classnames({
              [styles['menu-item-custom']]: !isMenuCollapsed,
            })}
            key={key}
            disabled={disabled}
          >
            {item.target ? (
              <a href={url} rel="noopener noreferrer" target={item.target}>
                {icon && <span className={`${icon} ${styles.icon} icon-collapsed-hidden`} />}
                <span className={styles.title}>{title}</span>
              </a>
            ) : (
              <Link to={isArray(url) ? url[0] : url}>
                {icon && <span className={`${icon} ${styles.icon} icon-collapsed-hidden`} />}
                <span className={styles.title}>{title}</span>
              </Link>
            )}
          </Menu.Item>
        );
      }
      return (
        <Menu.Item
          className={classnames({
            [styles['menu-item-custom']]: !isMenuCollapsed,
          })}
          key={key}
          disabled={disabled}
        >
          {icon && <span className={`${icon} ${styles.icon} icon-collapsed-hidden`} />}
          <span className={styles.title}>{title}</span>
        </Menu.Item>
      );
    };

    const generateSubmenu = (items: any) =>
      items.map((menuItem: any) => {
        if (menuItem.children) {
          const subMenuTitle = (
            <span key={menuItem.key}>
              {menuItem.icon && <span className={`${menuItem.icon} ${styles.icon}`} />}
              <span className={styles.title}>{menuItem.title}</span>
            </span>
          );
          return (
            <SubMenu key={menuItem.key} title={subMenuTitle}>
              {generateSubmenu(menuItem.children)}
            </SubMenu>
          );
        }
        return generateItem(menuItem);
      });

    return menuData.map((menuItem: any) => {
      if (menuItem.children) {
        const subMenuTitle = (
          <span key={menuItem.key}>
            {menuItem.icon && <span className={`${menuItem.icon} ${styles.icon}`} />}
            <span className={styles.title}>{menuItem.title}</span>
          </span>
        );
        return (
          <SubMenu key={menuItem.key} title={subMenuTitle}>
            {generateSubmenu(menuItem.children)}
          </SubMenu>
        );
      }
      return generateItem(menuItem);
    });
  };

  const menuSettings = isMobileView
    ? {
        width: 256,
        collapsible: false,
        collapsed: false,
        onCollapse: onCollapse,
      }
    : {
        width: 256,
        collapsible: true,
        collapsed: isMenuCollapsed,
        onCollapse: onCollapse,
      };

  return (
    <Layout className={styles.wrapper}>
      <Sider {...menuSettings} className={styles.sider}>
        <Link to="/" className={styles['logo-container']}>
          <img
            src="/logo.png"
            alt="logo"
            className={classnames(styles.logo, { [styles[`logo-collapsed`]]: isMenuCollapsed })}
          />
        </Link>
        <Scrollbars
          autoHeight
          autoHeightMax="calc(100vh - 100px)"
          className={isMobileView ? styles.scrollbarMobile : styles.scrollbarDesktop}
          renderThumbVertical={({ style, ...props }: any) => (
            <div
              {...props}
              style={{
                ...style,
                width: '4px',
                borderRadius: 'inherit',
                backgroundColor: '#c5cdd2',
                left: '1px',
              }}
            />
          )}
        >
          <Menu
            className={styles.navigation}
            mode="inline"
            selectedKeys={selectedKeys}
            theme="light"
            inlineIndent={15}
          >
            {generateMenuItems()}
          </Menu>
        </Scrollbars>
      </Sider>
      <Layout className={styles.layout}>
        <Layout.Header>header</Layout.Header>
        <Layout.Content>{props.children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
