import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path

  // Menu item definitions
  const menuItems = [
    { label: "Dashboard", icon: <HomeIcon className="h-6 w-6" />, path: "/dashboard/admin" },
    { label: "User", icon: <UserCircleIcon className="h-6 w-6" />, path: "/dashboard/admin/pengguna" },
    { label: "Menu", icon: <ShoppingBagIcon className="h-6 w-6" />, path: "/dashboard/admin/menu" },
    { label: "Table", icon: <PresentationChartBarIcon className="h-6 w-6" />, path: "/dashboard/admin/meja" },
  ];

  // Find index from the current URL path or default to 0
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = menuItems.findIndex(item => item.path === location.pathname);
    return savedIndex !== -1 ? savedIndex : 0;
  });

  // Update activeIndex when the URL path changes
  useEffect(() => {
    const currentIndex = menuItems.findIndex(item => item.path === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname, menuItems]);

  const handleItemClick = (index, path) => {
    if (activeIndex === index) return; // If already active, do nothing
    setActiveIndex(index); // Update activeIndex state when a new item is clicked
    navigate(path); // Navigate to the corresponding path
  };

  const handleLogout = () => {
    localStorage.removeItem("id_user");    // Remove token
    localStorage.removeItem("token");    // Remove token
    localStorage.removeItem("role");     // Remove user role
    localStorage.removeItem("username"); // Remove username
    localStorage.removeItem("activeIndex"); // Optionally remove activeIndex
    navigate("/login");                  // Redirect to login page
  };

  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl bg-white border border-gray-200">
      <div className="mb-6 p-4 text-center">
        <Typography variant="h1" color="blue" className="font-bold text-3xl text-blue-600">
          Cafe Wikusama
        </Typography>
      </div>
      <List className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            className={`hover:bg-blue-100 transition-colors duration-300 ease-in-out rounded-md flex items-center p-2 ${activeIndex === index ? "bg-blue-100" : ""}`}
            onClick={() => handleItemClick(index, item.path)} // Call handleItemClick with index and path
          >
            <ListItemPrefix>
              <span className={`${activeIndex === index ? "text-blue-700" : "text-gray-700"} transition-colors duration-300 ease-in-out`}>
                {item.icon}
              </span>
            </ListItemPrefix>
            <span className={`ml-2 ${activeIndex === index ? "text-blue-700" : "text-gray-800"} transition-colors duration-300 ease-in-out`}>
              {item.label}
            </span>
          </ListItem>
        ))}

        {/* Logout list item */}
        <ListItem
          className="hover:bg-red-100 transition-colors duration-300 ease-in-out rounded-md flex items-center p-2"
          onClick={handleLogout} // Call handleLogout on click
        >
          <ListItemPrefix>
            <span className="text-red-700 transition-colors duration-300 ease-in-out">
              <PowerIcon className="h-6 w-6" />
            </span>
          </ListItemPrefix>
          <span className="ml-2 text-red-700 transition-colors duration-300 ease-in-out">
            Logout
          </span>
        </ListItem>
      </List>
    </Card>
  );
}
