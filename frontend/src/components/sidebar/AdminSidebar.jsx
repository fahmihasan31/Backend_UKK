import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [activeIndex, setActiveIndex] = useState(0); // Default to Dashboard

  const handleItemClick = (index, path) => {
    setActiveIndex(index);
    navigate(path); // Navigate to the corresponding path
  };

  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl bg-white border border-gray-200">
      <div className="mb-6 p-4 text-center">
        <Typography variant="h1" color="blue" className="font-bold text-3xl text-blue-600">
          Cafe Wikusama
        </Typography>
      </div>
      <List className="flex flex-col space-y-2">
        {[
          { label: "Dashboard", icon: <HomeIcon className="h-6 w-6" />, path: "/dashboard/admin" },
          { label: "Pengguna", icon: <UserCircleIcon className="h-6 w-6" />, path: "/dashboard/admin/pengguna" },
          { label: "Menu", icon: <ShoppingBagIcon className="h-6 w-6" />, path: "/dashboard/admin/menu" },
          { label: "Meja", icon: <PresentationChartBarIcon className="h-6 w-6" />, path: "/dashboard/admin/meja" },
          { label: "Logout", icon: <PowerIcon className="h-6 w-6" />, path: "/login" },
        ].map((item, index) => (
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
      </List>
    </Card>
  );
}
