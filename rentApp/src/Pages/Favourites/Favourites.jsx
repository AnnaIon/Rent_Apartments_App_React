import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getFavouriteFlats } from "../../../firebase";
import Grid2 from "@mui/material/Grid2";
import Flat from "../../Components/Flat/Flat";

const Favourites = () => {
  const [flats, setFlats] = useState([]);
  const { currentUser } = useOutletContext();

  useEffect(() => {
    getFavouriteFlats(currentUser).then((res) => {
      if (res) {
        setFlats(res);
      }
    });
  }, []);

  return (
    <>
      {flats.length > 0 ? (
        <Grid2 container spacing={4} columns={5}>
          <Grid2 size={3}>
            {flats.map((flat) => (
              <Flat
                city={flat.city}
                streetName={flat.streetName}
                streetNumber={flat.streetNumber}
                areaSize={flat.areaSize}
                hasAC={flat.hasAC}
                rentPrice={flat.rentPrice}
                title={flat.title}
                yearBuild={flat.yearBuild}
                flatId={flat.id}
                favourite={true}
                flat={flat}
              ></Flat>
            ))}
          </Grid2>
        </Grid2>
      ) : (
        ""
      )}
    </>
  );
};

export default Favourites;
