import styles from '../MyFlats/MyFlats.module.css';
import Header from '../../Components/Header/Headers';
import AddFlat from '../../Components/AddFlat/AddFlat';
import Flats from '../../Components/Flats/Flats';
import { useState } from 'react';

const MyFlats = () => {
  const [flats, setFlats] = useState({
    originalFlats : {}, 
    filteredFlats : {}
  });

  return (
    <div className={styles.main}>
     <AddFlat/>
     <Flats isHomepage={false} flats={flats} setFlats={setFlats} isMyFlatsPage ={true}/>
    </div>
  )
}

export default MyFlats