import styles from '../MyFlats/MyFlats.module.css';
import Header from '../../Components/Header/Headers';
import AddFlat from '../../Components/AddFlat/AddFlat';
import Flats from '../../Components/Flats/Flats';
import { useState } from 'react';

const MyFlats = () => {
  // State to manage user's flats, including both original and filtered versions
  const [flats, setFlats] = useState({
    originalFlats: {},   // All flats owned by the user
    filteredFlats: {}    // Flats after applying filters (if any)
  });

  return (
    <div className={styles.main}>
      {/* Component to add a new flat */}
      <AddFlat />

      {/* Reusable Flats component configured for "My Flats" page */}
      <Flats 
        isHomepage={false}           // Indicates this is not the homepage
        flats={flats}                // Pass the flats data
        setFlats={setFlats}          // Function to update flat state
        isMyFlatsPage={true}         // Enables user-specific features (e.g. delete button)
      />
    </div>
  );
};

export default MyFlats;
