import { Box, Button, Container, Toolbar } from '@mui/material';
import React,{ useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.scss';
import { ProtectedRoute } from '../router/ProtectedRoute';





const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className='bx bx-calendar'></i>,
        to: '/',
        section: ''
    },
    {
        display: 'Clientes',
        icon: <i class='bx bx-user-plus' ></i>,
        to: '/customers',
        section: 'customers'
    },
    {
        display: 'Productos',
        icon: <i class='bx bx-package'></i>,
        to: '/products',
        section: 'products'
    },
    {
        display: 'Categorias',
        icon: <i class='bx bx-category'></i>,
        to: '/category',
        section: 'category'
    },
    {
        display: 'Invernaderos',
        icon: <i class='bx bx-leaf' ></i>,
        to: '/invernadero',
        section: 'invernadero'
    },
    {
        display: 'Mesas',
        icon: <i class='bx bx-cabinet'></i>,
        to: '/mesa',
        section: 'mesa'
    },
    {
        display: 'Orders',
        icon: <i class='bx bx-detail'></i>,
        to: '/orden',
        section: 'orden'
    },
    {
        display: 'User',
        icon: <i class='bx bx-user-circle' ></i>,
        to: '/user',
        section: 'user'
    },
]


const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    const navigate = useNavigate();
   
    const handlelogout =() =>{

        localStorage.removeItem("acces");
        navigate('/login', { replace: true });

    };




    
    return <div className='sidebar'>

        <img src="logo-mediano.png" alt="logo" className="sidebar__logo" width= "200px" />

        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }


        </div>
            <div className="sidebar__button__container">

            <button  className="sidebar__button__container__logout__button" onClick={handlelogout}  >Logout</button>

            </div>
       

    </div>;
}

export default Sidebar;
