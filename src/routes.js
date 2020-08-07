import VectorMap from "views/maps/VectorMap.jsx";
import GoogleMaps from "views/maps/GoogleMaps.jsx";
import FullScreenMap from "views/maps/FullScreenMap.jsx";
import ReactTables from "views/tables/ReactTables.jsx";
import RegularTables from "views/tables/RegularTables.jsx";
import ExtendedTables from "views/tables/ExtendedTables.jsx";
import Wizard from "views/forms/Wizard.jsx";
import ValidationForms from "views/forms/ValidationForms.jsx";
import ExtendedForms from "views/forms/ExtendedForms.jsx";
import RegularForms from "views/forms/RegularForms.jsx";
import Calendar from "views/Calendar.jsx";
import Widgets from "views/Widgets.jsx";
import Charts from "views/Charts.jsx";
import Dashboard from "views/Dashboard.jsx";
import Buttons from "views/components/Buttons.jsx";
import SweetAlert from "views/components/SweetAlert.jsx";
import Notifications from "views/components/Notifications.jsx";
import Grid from "views/components/Grid.jsx";
import Typography from "views/components/Typography.jsx";
import Panels from "views/components/Panels.jsx";
import Icons from "views/components/Icons.jsx";
import Pricing from "views/pages/Pricing.jsx";
import TimelineSchedule from "views/schedule/TimelineSchedule";
import User from "views/pages/User.jsx";
import Login from "views/login/Login.jsx";
import Register from "views/pages/Register.jsx";
import Rtl from "views/pages/Rtl.jsx";
import Lock from "views/pages/Lock.jsx";
import Schedule from "views/schedule/Schedule";
import TimeSheet from "views/schedule/TimeSheet";
import Download from "views/support/Download.jsx";

import BackOffice from "views/schedule/BackOffice";

import Execution from "views/schedule/Execution";

import Gallery from "views/gallery/Gallery";
import Profile from "views/user/Profile";


import Customer from "views/sales/Customer.jsx";
import Project from "views/sales/Project";
import FollowUp from "views/sales/FollowUp";
import TimeLine from "views/sales/Timeline";


const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Frequency",
    rtlName: "صفحات",
    icon: "tim-icons icon-calendar-60",
    state: "frequencyCollapse",
    invisible: true,
    views: [  
      {
        path: "/customer",
        name: "Customer",
        rtlName: "عالتسعير",
        mini: "CT",
        rtlMini: "ع",
        component: Customer,
        layout: "/admin",
        invisible: true,
      },   
      {
        path: "/backoffice",
        name: "BackOffice",
        rtlName: "عالتسعير",
        mini: "BK",
        rtlMini: "ع",
        component: BackOffice,
        layout: "/admin",
        invisible: true,
      },  
      {
        path: "/TimeSheet",
        name: "Time Sheet",
        rtlName: "عالتسعير",
        mini: "TS",
        rtlMini: "ع",
        component: TimeSheet,
        layout: "/admin"
      },   
      {
        path: "/execution",
        name: "Execution",
        rtlName: "عالتسعير",
        mini: "EX",
        rtlMini: "ع",
        component: Execution,
        layout: "/admin",
        invisible: true,
      }, 
      {
        path: "/shedule",
        name: "Panel",
        rtlName: "عالتسعير",
        mini: "PN",
        rtlMini: "ع",
        component: Schedule,
        layout: "/admin",
        invisible: true,
      }, 
    ]
  },
  {
    collapse: true,
    name: "Auth",
    rtlName: "صفحات",
    icon: "tim-icons icon-settings",
    state: "pagesCollapse",
    invisible: true,
    views: [    
      {
        path: "/Login",
        name: "Login",
        rtlName: "عالتسعير",
        mini: "LG",
        rtlMini: "ع",
        component: Login,
        layout: "/auth",
      },   
      {
        path: "/Register",
        name: "Register",
        rtlName: "عالتسعير",
        mini: "RE",
        rtlMini: "ع",
        component: Register,
        layout: "/auth"
      },  

    ]
  },


  {
    collapse: true,
    name: "Sales",
    rtlName: "صفحات",
    icon: "tim-icons icon-money-coins",
    state: "pagesCollapse",
    views: [    
      {
        path: "/Customer",
        name: "Customer",
        rtlName: "عالتسعير",
        mini: "CT",
        rtlMini: "ع",
        component: Customer,
        layout: "/admin",
      },   
      {
        path: "/Project",
        name: "Project",
        rtlName: "عالتسعير",
        mini: "PT",
        rtlMini: "ع",
        component: Project,
        layout: "/admin",
      }, 
      {
        path: "/FollowUp",
        name: "FollowUp",
        rtlName: "عالتسعير",
        mini: "FL",
        rtlMini: "ع",
        component: FollowUp,
        layout: "/admin",
      },
      {
        path: "/Timeline",
        name: "Timeline",
        rtlName: "عالتسعير",
        mini: "TL",
        rtlMini: "ع",
        component: TimeLine,
        layout: "/admin",
        invisible: true,
      },
    ]
  },





  {
    collapse: true,
    name: "Gallery",
    rtlName: "صفحات",
    icon: "tim-icons icon-camera-18",
    state: "pagesCollapse",
    invisible: true,
    views: [    
      {
        path: "/Gallery",
        name: "Pictures Deposit",
        rtlName: "عالتسعير",
        mini: "PD",
        rtlMini: "ع",
        component: Gallery,
        layout: "/admin",
      },   
    ]
  },
  {
    collapse: true,
    name: "Profile",
    rtlName: "صفحات",
    icon: "tim-icons icon-single-02",
    state: "pagesCollapse",
    invisible: true,
    views: [    
      {
        path: "/Profile",
        name: "My Profile",
        rtlName: "عالتسعير",
        mini: "PF",
        rtlMini: "ع",
        component: Profile,
        layout: "/admin",
      },   
    ]
  },


];


export default routes;
