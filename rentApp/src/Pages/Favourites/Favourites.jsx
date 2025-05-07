import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getFavouriteFlats } from "../../../firebase";
import Grid2 from "@mui/material/Grid2";
import Flat from "../../Components/Flat/Flat";

const Favourites = () => {
  const [flats, setFlats] = useState([]);
  const { currentUser } = useOutletContext();

  // Fetch the user's favorite flats on component mount
  useEffect(() => {
    const fetchFavourites = async () => {
      const res = await getFavouriteFlats(currentUser);
      if (res) setFlats(res);
    };
    fetchFavourites();
  }, [currentUser]);

  return (
    <>
      {flats.length > 0 ? (
        <Grid2 container spacing={4} columns={5}>
          {flats.map((flat) => (
            <Grid2 key={flat.id} xs={12} sm={6} md={4} lg={3}>
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
              />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          You don’t have any favourite flats yet.
        </p>
      )}
    </>
  );
};

export default Favourites;
