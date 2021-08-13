import DashboardIcon from '@material-ui/icons/Dashboard';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ListIcon from '@material-ui/icons/List';
import ReceiptIcon from '@material-ui/icons/Receipt';

const sidebarLinks = [
    {id: 1, label: "Dashboard", classes:[], icon: <DashboardIcon/>, path:"/dashboard"},
    {id: 2, label: "Category", classes:[], icon: <CategoryIcon/>, path:"/categories"},
    {id: 3, label: "Users", classes:[], icon: <PeopleAltIcon/>, path:"/users"},
    {id: 4, label: "Products", classes:[], icon: <ListIcon/>, path:"/products"},
    {id: 5, label: "Transaction", classes:[], icon: <ReceiptIcon/>, path:"/transactions"},
    
]

export default sidebarLinks;