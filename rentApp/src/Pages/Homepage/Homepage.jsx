import Flats from "../../Components/Flats/Flats";
import { Outlet, useOutletContext, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import SideBar from "../../Components/SideBar";
import { useState } from "react";

const Homepage = () => {
  const { currentUser } = useOutletContext();
  useEffect(() => {
    console.log("current user", currentUser);
    console.log(currentUser);
  }, []);

  const [filter, setFilter] = useState({
    AZ: true,
    ZA: false,
    minArea: false,
    maxArea: false,
    minPrice: false,
    maxPrice: false,
    city: "",
    minPriceRange: 0,
    maxPriceRange: 0,
    minAreaRange: 0,
    maxAreaRange: 0,
  });

  const [flats, setFlats] = useState({
    originalFlats : {}, 
    filteredFlats : {}
  });
  return (
    <Box className="main" size={{ xs: 12, sm: 6 }}>
      <SideBar filter={filter} setFilter={setFilter}/>

      <Flats isHomepage={true} filter={filter} flats={flats} setFlats={setFlats}/>
    </Box>
  );
};

export default Homepage;
