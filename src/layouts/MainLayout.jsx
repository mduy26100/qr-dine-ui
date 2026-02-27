import React, { useState, useEffect } from 'react';
import { Layout, Grid, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { AppHeader, AppSider } from './components';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = () => {
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const _isMobile = !screens.lg;
    setIsMobile(_isMobile);
    
    if (!_isMobile) {
      setMobileDrawerOpen(false);
    } else {
        setCollapsed(false);
    }
  }, [screens]);

  const marginLeft = isMobile ? 0 : collapsed ? 80 : 260;

  return (
    <Layout className="min-h-screen bg-gray-50">
      <AppSider 
        collapsed={collapsed} 
        isMobile={isMobile}
        isOpen={mobileDrawerOpen}
        setIsOpen={setMobileDrawerOpen}
      />

      <Layout 
        className="transition-all duration-300 ease-in-out bg-transparent"
        style={{ marginLeft }} 
      >
        <AppHeader 
            collapsed={collapsed} 
            setCollapsed={setCollapsed} 
            isMobile={isMobile}
            setIsOpen={setMobileDrawerOpen}
        />

        <Content className="m-4 md:m-6 overflow-initial">
            <div
                className="p-6 shadow-sm min-h-[calc(100vh-120px)] border border-gray-100"
                style={{
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Outlet />
            </div>
        </Content>

        <Layout.Footer className="text-center text-gray-400 py-4 text-xs bg-transparent">
           Hệ thống quản lý QRDine ©{new Date().getFullYear()}
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;