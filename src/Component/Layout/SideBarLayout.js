import {Outlet} from "react-router-dom"
import Sidebar from "../sidebar/Sidebar";
import style from './sidebarLayout.module.scss'

function SideBarLayout() {
    const { contentArea } = style;
    return (  
        <div className={contentArea}>
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default SideBarLayout;