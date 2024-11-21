import { useEffect, useState } from "react";
import {
  deleteFlat,
  fetchFlatsData,
  getFavouriteFlats,
} from "../../../firebase";
import Grid2 from "@mui/material/Grid2";
import { useOutletContext } from "react-router-dom";
import Flat from "../Flat/Flat";
import { Box } from "@mui/material";
import { applyFilter } from "../../Utils/InputsValidations";

const Flats = ({ isHomepage,filter,flats,setFlats,isMyFlatsPage }) => {

  
  const [favouriteFlats, setFavouriteFlats] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser } = useOutletContext();

  useEffect(() => {
    fetchFlatsData(currentUser, isHomepage).then((res) => {
      console.log(res);
      if (res) {
        setFlats({filteredFlats : res,originalFlats: res });
      }
    });
    getFavouriteFlats(currentUser).then((res) => {
      if (res) {
        setFavouriteFlats(res);
      }
    });
  }, []);

  useEffect(() =>{
    const newFlats = applyFilter(filter,flats.originalFlats);
    setFlats({...flats,['filteredFlats'] : newFlats})
  },[filter])

  function checkIsFavourite(flatId) {
    return favouriteFlats.some((flat) => flat.id === flatId);
  }

  const handleDeleteFlat = (userId,flatId) => {
    deleteFlat(userId, flatId).then((res) => setFlats({...flats,[userId] : res}))
  .then(res => {
    window.location.reload()
  });

  };

  return (
    <>
      {Object.keys(flats.filteredFlats).length > 0 ? (
        <Box sx={{ mt:'1rem' }}>
          <Grid2
            container
            spacing={15}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {Object.keys(flats.filteredFlats).map((user) =>
              flats.filteredFlats[user].map((flat) => (
                <Grid2
                  key={flat.id}
                  height={160}
                  width={160}
                  alignContent='center'
                  textAlign='center'
                >
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
                    handleDeleteFlat={() => handleDeleteFlat(user,flat.id)}
                    favourite={checkIsFavourite(flat.id)}
                    isHomepage={isHomepage}
                    isMyFlatsPage ={isMyFlatsPage}
                    isCurrentOwner={user === currentUser.uid}
                    flat={flat}
                  />
                </Grid2>
              ))
            )}
          </Grid2>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};
export default Flats;
