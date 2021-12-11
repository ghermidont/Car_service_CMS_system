import React, { useEffect, useState } from "react";
import { Layout, Menu, Pagination} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    mongoDBGetAllUsersFunction,
    mongoDBGetUsersCountFunction,
    mongoDBDeleteUserFunction,
    mongoDBToggleUserAccessFunction
} from "../../functions/callsToAdminRoutes";
import Link from "react-router-dom/es/Link";

export default function AdminDashboard(){
    const { Content, Sider } = Layout;
    const [ selectedMenuItem, setSelectedMenuItem ]= useState( "1" );
    const [ page, setPage ] = useState( 1 );
    const [ usersCount, setUsersCount ] = useState( 0 );
    const [ loading, setLoading ] = useState( false );
    const [ mongoDbUsersList, setMongoDbUsersList ] = useState( [] );

    const { reduxStoreUser } = useSelector( ( state ) => ( { ...state } ) );

    const getUsersFromDb = () => {
        console.log( "getUsersFromDb() worked: " );
        setLoading( true );
        mongoDBGetAllUsersFunction("createdAt", "desc", page, reduxStoreUser.token )
            .then( ( res ) => {
                console.log( "res.data: ", res.data );
                setMongoDbUsersList( res.data );
                setLoading( false );
            })
            .catch( ( err ) => {
                setLoading( false );
                console.log( "mongoDBGetAllUsersFunction(): ", err );
            });
    };
    
    useEffect( () => {
        getUsersFromDb();
    }, [ page ] );

    useEffect( () => {
        mongoDBGetUsersCountFunction( reduxStoreUser.token )
            .then(
                ( res ) => setUsersCount( res.data )
            )
            .catch(( error ) => {
                toast.error( "Error loading users count: ", error );
                console.log( "Error loading users count: ", error );
            });
    }, [] );

    const toggleUserRole = ( userId, role ) => {
        mongoDBToggleUserAccessFunction( userId, role, reduxStoreUser.authToken )
            .then( ( res ) => {
                toast.success( "User role changed" );
            } )
            .catch( ( err ) => {
                toast.error( "Error changing user role: ", err );
            } );
    };
    
    const deleteUserFromDB = ( slug, company_name ) => {
        mongoDBDeleteUserFunction( slug, reduxStoreUser.token )
            .then( ()=>window.alert( `User ${ company_name } removed successfully.` ) )
            .catch( err=>window.alert( err ) );
    };

    const usersTable = () => (
        <main className='mb-12'>
            <h1>UsersListPage.js</h1>

            <div className="container mx-auto">
                <div className='py-20 rounded-3xl bg-grayL shadow-shadow  mt-16 mb-10'>
                    { loading ? (
                        <h4 className="text-danger"> Loading... </h4>
                    ) : (
                        <h4> Users List: </h4>
                    ) }
                    <table className='mx-auto mb-8'>
                        <thead>
                            <tr>
                                <th> </th>
                                <th> </th>
                                <th className='px-1 py-1.5 w-75 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    ID
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Ragione sociale
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Email
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    P. Iva
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Created At
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Role
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            { mongoDbUsersList.map( ( userInfo ) => (
                                <tr key={ userInfo.id }>
                                    <td>
                                        <button className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>
                                            <Link to={`admin/user/${userInfo.email}`}>
                                                Open
                                            </Link>
                                        </button>
                                    </td>
                                    <td className='pr-3'>
                                        <button
                                            className='w-75 h-8 m-1 bg-red flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'
                                            onClick={ ()=>deleteUserFromDB( userInfo.slug, userInfo.company_name ) }
                                        >
                                        Delete
                                        </button>
                                    </td>
                                    <td className='border border-border px-3'>{userInfo._id}</td>
                                    <td className='border border-border px-3'>{userInfo.company_name}</td>
                                    <td className='border border-border px-3'>{userInfo.email}</td>
                                    <td className='border border-border px-3'>{userInfo.fiscal_code}</td>
                                    <td className='border border-border px-3'>{userInfo.createdAt}</td>
                                    <td className='border border-border px-3'>{userInfo.role}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="row">
                        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                            <Pagination
                                current={ page }
                                total={ ( usersCount / 3 ) * 10 }
                                onChange={ ( value ) => setPage( value ) }
                            />
                        </nav>
                    </div>

                    {/*<ul className='flex justify-center items-center xl:text-lg'>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        /!* Back pagination arrow *!/*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">*/}
                    {/*            <svg className="w-6 h-6 p-0.5 border rounded-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"> </path>*/}
                    {/*            </svg>*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">1</a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">2</a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">3</a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">... </a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">24</a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        /!* Next pagination arrow *!/*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/"> he*/}
                    {/*            <svg className="w-6 h-6 p-0.5 border rounded-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"> </path>*/}
                    {/*            </svg>*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>
                <div className='flex justify-end mx-8'>
                    <div className='flex'>
                        <button
                            className='flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"> </path>
                            </svg>
                                Stampa Lista
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );

    const componentsSwitch = ( key ) => {
        switch ( key ) {
        case "1":
            return usersTable();
        case "2":
            return ( <h1> item2 </h1> );
        default:
            break;
        }
    };

    return(
        <>
            <center><h1 style={ { fontSize: 20, fontWeight: 700 } }> Admin dashboard </h1></center>
            <Layout>           
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={ broken => {
                        console.log( broken );
                    }}
                    onCollapse={ ( collapsed, type ) => {
                        console.log( collapsed, type );
                    }}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={ [ "1" ] }
                        onClick={
                            ( e ) => setSelectedMenuItem( e.key )
                        }
                    >
                        <Menu.Item key="1" icon={ <UserOutlined /> }>
                            Users List
                        </Menu.Item>
                        <Menu.Item key="2" >
                            &#128480; Statistics
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    {/*<Header className="site-layout-sub-header-background" style={{ padding: 0 }} />*/}
                    <Content style={ { margin: "24px 16px 0" } }>
                        <div className="site-layout-background" style={ { padding: 24, minHeight: 360 } }>
                            { componentsSwitch( selectedMenuItem ) }
                        </div>
                    </Content>
                    {/*<Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>*/}
                </Layout>
            </Layout>
        </>
    );
}