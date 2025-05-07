import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { orange } from "@mui/material/colors";
import { useState } from "react";

// Placeholder cities array for potential autocomplete use
const citiesArray = [
  { label: "Bucharest" },
  { label: "Roma" },
  { label: "Idk" },
];

export default function AnchorTemporaryDrawer({ filter, setFilter, flats }) {
  const [state, setState] = useState({ left: false });

  // Updates filter state based on checkbox and input changes
  const handleChange = (event, newValue) => {
    const { name, value } = event.target;

    switch (name) {
      case "AZ":
        setFilter({ ...filter, AZ: newValue, ZA: false });
        break;
      case "ZA":
        setFilter({ ...filter, ZA: newValue, AZ: false });
        break;
      case "minArea":
        setFilter({ ...filter, minArea: newValue, maxArea: false });
        break;
      case "maxArea":
        setFilter({ ...filter, maxArea: newValue, minArea: false });
        break;
      case "minPrice":
        setFilter({ ...filter, minPrice: newValue, maxPrice: false });
        break;
      case "maxPrice":
        setFilter({ ...filter, maxPrice: newValue, minPrice: false });
        break;
      default:
        setFilter({ ...filter, [name]: value });
        break;
    }
  };

  // Opens or closes the drawer
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && ["Tab", "Shift"].includes(event.key)) return;
    setState({ ...state, [anchor]: open });
  };

  // Resets all filter values to their initial state
  const handleResetFilter = () => {
    setFilter({
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
  };

  // Drawer content layout
  const list = (anchor) => (
    <Box sx={{ width: anchor === "left" ? 300 : "auto" }} role="presentation">
      {/* Sorting section */}
      <List>
        <ListItemText primary="Sort By" />
        {["AZ", "ZA", "minArea", "maxArea", "minPrice", "maxPrice"].map((key) => (
          <ListItem key={key} disablePadding>
            <ListItemButton>
              <FormControlLabel
                control={
                  <Checkbox
                    name={key}
                    checked={filter[key]}
                    onChange={handleChange}
                  />
                }
                label={key.replace(/([A-Z])/g, " $1").toUpperCase()}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Filtering section */}
      <List>
        <ListItemText primary="Filter By" />

        {/* City Input */}
        <ListItem disablePadding>
          <ListItemButton>
            <TextField
              name="city"
              label="City"
              value={filter.city}
              onChange={handleChange}
              type="search"
              fullWidth
            />
          </ListItemButton>
        </ListItem>

        {/* Area Range */}
        <ListItemText primary="Area Range (m²)" />
        <ListItem disablePadding>
          <ListItemButton>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <InputLabel>Min</InputLabel>
              <Input
                name="minAreaRange"
                type="number"
                value={filter.minAreaRange}
                onChange={handleChange}
              />
              <InputLabel>Max</InputLabel>
              <Input
                name="maxAreaRange"
                type="number"
                value={filter.maxAreaRange}
                onChange={handleChange}
              />
            </Box>
          </ListItemButton>
        </ListItem>

        {/* Price Range */}
        <ListItemText primary="Price Range (€)" />
        <ListItem disablePadding>
          <ListItemButton>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <InputLabel>Min</InputLabel>
              <Input
                name="minPriceRange"
                type="number"
                value={filter.minPriceRange}
                onChange={handleChange}
              />
              <InputLabel>Max</InputLabel>
              <Input
                name="maxPriceRange"
                type="number"
                value={filter.maxPriceRange}
                onChange={handleChange}
              />
            </Box>
          </ListItemButton>
        </ListItem>

        {/* Reset Button */}
        <ListItem>
          <Button variant="outlined" color="warning" onClick={handleResetFilter}>
            Reset Filters
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer("left", true)} sx={{ color: orange[300] }}>
        <MenuIcon /> Filter
      </Button>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </>
  );
}
