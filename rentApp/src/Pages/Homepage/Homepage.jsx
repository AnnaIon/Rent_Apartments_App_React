import Flats from "../../Components/Flats/Flats";
import { Outlet, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SideBar from "../../Components/SideBar";

const Homepage = () => {
  // Access currentUser from the outlet context (usually provided by a parent route)
  const { currentUser } = useOutletContext();

  useEffect(() => {
    // Debugging current user on load
    console.log("current user", currentUser);
  }, []);

  // State to manage filter options for sorting and searching flats
  const [filter, setFilter] = useState({
    AZ: true,              // Alphabetical A-Z by title (default sort)
    ZA: false,             // Alphabetical Z-A
    minArea: false,
    maxArea: false,
    minPrice: false,
    maxPrice: false,
    city: "",              // Search by city name
    minPriceRange: 0,      // Price filter range (min)
    maxPriceRange: 0,      // Price filter range (max)
    minAreaRange: 0,       // Area filter range (min)
    maxAreaRange: 0,       // Area filter range (max)
  });

  // State to hold original and filtered flat listings
  const [flats, setFlats] = useState({
    originalFlats: {},     // Raw fetched data
    filteredFlats: {}      // After applying filters
  });

  return (
    <Box className="main" size={{ xs: 12, sm: 6 }}>
      {/* Sidebar with filter options */}
      <SideBar filter={filter} setFilter={setFilter} />

      {/* Flats component to render listings based on filter */}
      <Flats 
        isHomepage={true}
        filter={filter}
        flats={flats}
        setFlats={setFlats}
      />
    </Box>
  );
};

export default Homepage;
