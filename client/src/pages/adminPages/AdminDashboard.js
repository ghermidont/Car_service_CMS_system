import React, {useState} from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
const { Content, Sider } = Layout;

export default function AdminDashboard(){
    const [selectedMenuItem, setSelectedMenuItem]= useState("1");

    const componentsSwitch = (key) => {
        switch (key) {
        case "1":
            return (<h1>item1</h1>);
        case "2":
            return (<h1>item2</h1>);
        default:
            break;
        }
    };

    return(
        <>
            <center><h1 style={{fontSize: 20, fontWeight: 700}}>Admin dashboard</h1></center>
            <Layout>           
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} onClick={(e) =>
                        setSelectedMenuItem(e.key)}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            Users List
                        </Menu.Item>
                        <Menu.Item key="2" >
                            &#128480; Statistics
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    {/*<Header className="site-layout-sub-header-background" style={{ padding: 0 }} />*/}
                    <Content style={{ margin: "24px 16px 0" }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {componentsSwitch(selectedMenuItem)}
                        </div>
                    </Content>
                    {/*<Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>*/}
                </Layout>
            </Layout>
        </>
    );
}