import { useState, useEffect } from "react";
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
  const navigate = useNavigate();

  // Get the stored index from localStorage or default to 0
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = localStorage.getItem("activeIndex");
    return savedIndex !== null ? parseInt(savedIndex) : 0;
  });

  // This effect will run when activeIndex changes
  useEffect(() => {
    localStorage.setItem("activeIndex", activeIndex); // Save activeIndex to localStorage
  }, [activeIndex]);

  const handleItemClick = (index, path) => {
    setActiveIndex(index); // Update activeIndex state
    navigate(path); // Navigate to the corresponding path
  };

  // Handle logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");    // Hapus token
    localStorage.removeItem("role");     // Hapus role pengguna
    localStorage.removeItem("username"); // Hapus username
    localStorage.removeItem("activeIndex"); // Opsional, hapus sidebar activeIndex
    navigate("/login");                  // Redirect ke halaman login
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

        {/* List item untuk Logout */}
        <ListItem
          className="hover:bg-red-100 transition-colors duration-300 ease-in-out rounded-md flex items-center p-2"
          onClick={handleLogout} // Panggil handleLogout saat Logout di-klik
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
