import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputLabel, Input } from "@mui/material";
import { orange } from "@mui/material/colors";
import { BreakfastDiningOutlined } from "@mui/icons-material";

const citiesArray = [
  {
    label: "Bucharest",
  },
  {
    label: "Roma",
  },
  {
    label: "Idk",
  },
];
export default function AnchorTemporaryDrawer({ filter, setFilter, flats }) {
  const [check, setCheck] = useState(false);

  const [state, setState] = React.useState({
    left: false,
  });

  function valuetext(value) {
    return `${value}`;
  }

  const handleChangeCheckbox = (event) => {
    setCheck(event.target.checked);
    console.log(check); // Retrieve checked value
  };

  const handleChange = (event, newValue) => {
    const { name,value } = event.target;
    switch (name) {
      case "AZ":
        setFilter({
          ...filter,
          [name]: newValue,
          ["ZA"]: false,
        });
        break;
      case "ZA":
        setFilter({
          ...filter,
          [name]: newValue,
          ["AZ"]: false,
        });
        break;
      case "minArea":
        setFilter({
          ...filter,
          [name]: newValue,
          ["maxArea"]: false,
        });
        break;
      case "maxArea":
        setFilter({
          ...filter,
          [name]: newValue,
          ["minArea"]: false,
        });
        break;
      case "minPrice":
        setFilter({
          ...filter,
          [name]: newValue,
          ["maxPrice"]: false,
        });
        break;
      case "maxPrice":
        setFilter({
          ...filter,
          [name]: newValue,
          ["minPrice"]: false,
        });
        break;
    //   case "city":
    //     setFilter({
    //       ...filter,
    //       [name]: value,
    //     });
    //     break;
      default:
        setFilter({
          ...filter,
          [name]: value,
        });
        break;
    }
    console.log(newValue)
  };

  const toggleDrawer = (anchor, open) => (event) => {
    console.log(anchor, open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleResetFilter = () =>{
     setFilter(
        {
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
          }
     )
  }
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List sx={{ display: "flex", flexDirection: "column" }}>
        <ListItemText disablePadding> Sort </ListItemText>
        <ListItemText disablePadding> City : </ListItemText>

        <ListItem disablePadding>
          <ListItemButton>
            <FormControlLabel
              control={
                <Checkbox
                  name="AZ"
                  checked={filter["AZ"]}
                  onChange={handleChange}
                />
              }
              label="A-Z"
            />
            <ListItemText />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <FormControlLabel
              control={
                <Checkbox
                  name="ZA"
                  checked={filter["ZA"]}
                  onChange={handleChange}
                />
              }
              label="Z-A"
            />
            <ListItemText />
          </ListItemButton>
        </ListItem>

        <ListItemText> Area size : </ListItemText>

        <ListItem disablePadding>
          <ListItemButton>
            <FormControlLabel
              control={
                <Checkbox
                  name="minArea"
                  checked={filter["minArea"]}
                  onChange={handleChange}
                />
              }
              label="min"
            />
            <ListItemText />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <FormControlLabel
              control={
                <Checkbox
                  name="maxArea"
                  checked={filter["maxArea"]}
                  onChange={handleChange}
                />
              }
              label="max"
            />
            <ListItemText />
          </ListItemButton>
        </ListItem>

        <ListItemText disablePadding> Price : </ListItemText>

        <ListItem disablePadding>
          <ListItemButton>
            <FormControlLabel
              control={
                <Checkbox
                  name="minPrice"
                  checked={filter["minPrice"]}
                  onChange={handleChange}
                />
              }
              label="min"
            />
            <ListItemText />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <FormControlLabel
              control={
                <Checkbox
                  name="maxPrice"
                  checked={filter["maxPrice"]}
                  onChange={handleChange}
                />
              }
              label="max"
            />
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      <List sx={{ display: "flex", flexDirection: "column" }}>
        <ListItemText disablePadding> Filter </ListItemText>
        <ListItemText disablePadding> City : </ListItemText>

        <ListItem disablePadding>
          <ListItemButton>
            <TextField
              name="city"
              onChange={handleChange}
              label="Search input"
              slotProps={{
                input: {
                  type: "search"
                },
              }}
            />
            <ListItemText />
          </ListItemButton>
        </ListItem>

        <ListItemText disablePadding> Area Range: </ListItemText>
        <ListItem disablePadding>
          <ListItemButton>
            <Box
              sx={{
                width: 200,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <InputLabel>min</InputLabel>
              <Input
                name="minAreaRange"
                value={filter.minAreaRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                type="number"
                sx={{ width: "25%" }}
              />
              <InputLabel>max</InputLabel>
              <Input
                name="maxAreaRange"
                value={filter.maxAreaRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                type="number"
                sx={{ width: "25%" }}
              />
            </Box>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItemText disablePadding> Price Range: </ListItemText>
        <ListItem disablePadding>
          <ListItemButton>
            <Box
              sx={{
                width: 200,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <InputLabel>min</InputLabel>
              <Input
                name="minPriceRange"
                value={filter.minPriceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                type="number"
                sx={{ width: "25%" }}
              />
              <InputLabel>max</InputLabel>
              <Input
                name="maxPriceRange"
                value={filter.maxPriceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                type="number"
                sx={{ width: "25%" }}
              />
            </Box>

            <ListItemText />
          </ListItemButton>
        </ListItem>

        <Button onClick={handleResetFilter}>Reset filters</Button>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer("left", true)} sx={{ color: orange[300] }}>
          <MenuIcon sx={{ color: orange[300] }}/>Filter
        </Button>
        <Drawer
          left="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
