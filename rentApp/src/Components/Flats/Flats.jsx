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

/**
 * Flats Component - Responsible for displaying flats either on the homepage or user-specific pages.
 * It handles filtering, favorite status, and deletion logic.
 *
 * Props:
 * @param {boolean} isHomepage - Determines if user is on the homepage.
 * @param {object} filter - The filter object used to filter flat listings.
 * @param {object} flats - Contains original and filtered flat listings.
 * @param {function} setFlats - Setter for updating flats state.
 * @param {boolean} isMyFlatsPage - Flag to indicate if we're on the 'My Flats' page.
 */

const Flats = ({ isHomepage, filter, flats, setFlats, isMyFlatsPage }) => {
  const [favouriteFlats, setFavouriteFlats] = useState([]);
  const { currentUser } = useOutletContext();

  // Fetch all flats (depending on page) and favorites when component mounts
  useEffect(() => {
    fetchFlatsData(currentUser, isHomepage).then((res) => {
      if (res) {
        // Store both filtered and original flats for filtering logic
        setFlats({ filteredFlats: res, originalFlats: res });
      }
    });

    // Fetch favourite flats for current user
    getFavouriteFlats(currentUser).then((res) => {
      if (res) setFavouriteFlats(res);
    });
  }, []);

  // Apply filters whenever the filter object changes
  useEffect(() => {
    const newFlats = applyFilter(filter, flats.originalFlats);
    setFlats({ ...flats, filteredFlats: newFlats });
  }, [filter]);

  // Check if a given flat is marked as favorite
  const checkIsFavourite = (flatId) => {
    return favouriteFlats.some((flat) => flat.id === flatId);
  };

  // Delete a flat and refresh data
  const handleDeleteFlat = (userId, flatId) => {
    deleteFlat(userId, flatId)
      .then((res) => setFlats({ ...flats, [userId]: res }))
      .then(() => {
        window.location.reload(); // Force refresh - consider optimizing this
      });
  };

  return (
    <>
      {Object.keys(flats.filteredFlats).length > 0 ? (
        <Box sx={{ mt: '1rem' }}>
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
                  alignContent="center"
                  textAlign="center"
                >
                  <Flat
                    // Flat props
                    city={flat.city}
                    streetName={flat.streetName}
                    streetNumber={flat.streetNumber}
                    areaSize={flat.areaSize}
                    hasAC={flat.hasAC}
                    rentPrice={flat.rentPrice}
                    title={flat.title}
                    yearBuild={flat.yearBuild}
                    flatId={flat.id}
                    flat={flat}

                    // Functional props
                    handleDeleteFlat={() => handleDeleteFlat(user, flat.id)}
                    favourite={checkIsFavourite(flat.id)}
                    isHomepage={isHomepage}
                    isMyFlatsPage={isMyFlatsPage}
                    isCurrentOwner={user === currentUser.uid}
                  />
                </Grid2>
              ))
            )}
          </Grid2>
        </Box>
      ) : (
        "" // Could replace with empty state UI
      )}
    </>
  );
};

export default Flats;
