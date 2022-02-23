import MainLayout from "./layout/mainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import ProductAdd from "./pages/Product/Form";
import ProductEdit from "./pages/Product/Edit";
import ProductList from "./pages/Product/List";
import ProductDetail from "./pages/Product/Show";
import Profile from "./pages/Profile";
import ProfileLayout from "./layout/profileLayout";
import ProfileEdit from "./pages/ProfileEdit";
import MessageList from "./pages/Message/List";
import MessageDetail from "./pages/Message/Detail";
import SellBuyLists from "./pages/Product/List";
import ResetInfo from "./pages/ResetInfo";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";

const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <Home />},
        ]
    },
    {
        path: '/login',
        element: <MainLayout />,
        children: [
            { path: '', element: <Login />},
        ]
    },
    {
        path: '/register',
        element: <MainLayout />,
        children: [
            { path: '', element: <Register />},
        ]
    },
    {
        path: '/verify/:params',
        element: <MainLayout />,
        children: [
            { path: '', element: <Verify />},
        ]
    },
    {
        path: '/product/add',
        element: <MainLayout />,
        children: [
            { path: '', element: <ProductAdd />},
        ]
    },
    {
        path: '/product/edit/:productId',
        element: <MainLayout />,
        children: [
            { path: '', element: <ProductEdit />},
        ]
    },
    {
        path: '/product/list',
        element: <MainLayout />,
        children: [
            { path: '', element: <ProductList />},
        ]
    },    
    {
        path: '/product/:productId',
        element: <MainLayout />,
        children: [
            { path: '', element: <ProductDetail /> },
        ]
    },
    {
        path: '/profile',
        element: <ProfileLayout />,
        children: [
            { path: '', element: <Profile />},
        ]
    },
    {
        path: '/profileEdit',
        element: <ProfileLayout />,
        children: [
            { path: '', element: <ProfileEdit /> },
        ]
    },
    {
        path: '/message',
        element: <ProfileLayout />,
        children: [
            { path: '', element: <MessageList /> },
        ]
    },
    {
        path: '/message/:roomId',
        element: <ProfileLayout />,
        children: [
            { path: '', element: <MessageDetail /> },
        ]
    },
    {
        path: '/selllists',
        element: <ProfileLayout />,
        children: [
            { path: '', element: <SellBuyLists /> },
        ]
    },
    {
        path: '/resetpassword',
        element: <ProfileLayout />,
        children: [
            { path: '', element: <ResetInfo /> },
        ]
    },
    {
        path: '/privacy',
        element: <MainLayout />,
        children: [
            { path: '', element: <Privacy /> },
        ]
    },
    {
        path: '/contact',
        element: <MainLayout />,
        children: [
            { path: '', element: <Contact /> },
        ]
    },
  ];
  
  export default routes;