import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { Container, Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import { TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import { sendMessage ,updateFlatData,favouriteFlat} from "../../../firebase";
import DoneIcon from "@mui/icons-material/Done";


export default function Flat({
  city,
  streetName,
  streetNumber,
  areaSize,
  hasAC,
  yearBuild,
  rentPrice,
  title,
  flatId,
  favourite,
  handleDeleteFlat,
  isHomepage,
  isCurrentOwner,
  flat,
  isMyFlatsPage
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavourite, setIsFavourite] = useState(favourite);
  const { currentUser } = useOutletContext();
  const [message, setMessage] = useState(false);
  const [send, setSend] = useState("");
  const [messageText, setMessageText] = useState("");
  const [edit, setEdit] = useState(false);
  const [flatData, setFlatData] = useState(flat);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  useEffect(() => {
    const update = async () => {
      console.log(flat);
      await favouriteFlat(currentUser, flat, isFavourite);
    };
    update();
  }, [isFavourite]);

  const handleMessage = () => {
    setMessage(!message);
  };

  const handleSendMessage = () => {
    console.log(flatId);
    console.log(messageText);

    sendMessage(flatId, messageText);
  };
  const handleChangeMessage = (e) => {
    const { value } = e.target;
    setMessageText(value);
  };

    const handleChange = (e) =>{
      const {name,value} = e.target;
      flatData[name] = value;
      setFlatData({...flatData,[name] : value})
    }

    const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (isMyFlatsPage) {
      await updateFlatData(currentUser, flatData); 
      return;
    }


  };

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <Card>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14, fontWeight: "bold" }}
          >
            {title}
          </Typography>

          <CardActions disableSpacing>
            <IconButton aria-label="info" onClick={handleFlip}>
              <InfoIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Card sx={{ width: 260, pt: "1rem" }}>
          <Container sx={{ width: 250 }}>
            {isHomepage ? (
              <>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  City:
                  <Box sx={{ fontWeight: "600", display: "inline" }}>
                    {city}
                  </Box>
                </Typography>

                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Str. Name:
                  <Box sx={{ fontWeight: "600", display: "inline" }}>
                    {streetName}
                  </Box>
                </Typography>

                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Str. No.:
                  <Box sx={{ fontWeight: "600", display: "inline" }}>
                    {streetNumber}
                  </Box>
                </Typography>

                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Area Size:
                  <Box sx={{ fontWeight: "600", display: "inline" }}>
                    {areaSize}
                  </Box>
                </Typography>

                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Has AC:
                  <Box sx={{ fontWeight: "600", display: "inline" }}>
                    {hasAC ? 'Yes' : 'No '}
                  </Box>
                </Typography>

                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Year Build:
                  <Box sx={{ fontWeight: "600", display: "inline" }}>
                    {yearBuild}
                  </Box>
                </Typography>

                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Rent Price:
                  <Box sx={{ fontWeight: "600", display: "inline" }}>
                    {rentPrice}
                  </Box>
                </Typography>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    City :
                  </Typography>
                  <TextField
                    id="standard-basic"
                    name="city"
                    variant="standard"
                    value={flatData.city}
                    sx={{
                      width: "40%",
                      justifySelf: "center",
                      alignSelf: "center",
                    }}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Str. Name :
                  </Typography>
                  <TextField
                    id="standard-basic"
                    name="streetName"
                    variant="standard"
                    value={flatData.streetName}
                    sx={{
                      width: "40%",
                      justifySelf: "center",
                      alignSelf: "center",
                    }}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Str. No. :
                  </Typography>
                  <TextField
                    id="standard-basic"
                    name="streetNumber"
                    variant="standard"
                    value={flatData.streetNumber}
                    sx={{
                      width: "40%",
                      justifySelf: "center",
                      alignSelf: "center",
                    }}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Area Size :
                  </Typography>
                  <TextField
                    id="standard-basic"
                    name="areaSize"
                    variant="standard"
                    value={flatData.areaSize}
                    sx={{
                      width: "40%",
                      justifySelf: "center",
                      alignSelf: "center",
                    }}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Has AC:
                  </Typography>
                  <TextField
                    id="standard-basic"
                    name="hasAC"
                    variant="standard"
                    value={flatData.hasAC ? "Yes" : "No"}
                    sx={{
                      width: "40%",
                      justifySelf: "center",
                      alignSelf: "center",
                    }}
                     onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Year Build :
                  </Typography>
                  <TextField
                    id="standard-basic"
                    name="yearBuild"
                    variant="standard"
                    value={flatData.yearBuild}
                    sx={{
                      width: "40%",
                      justifySelf: "center",
                      alignSelf: "center",
                    }}
                    onChange={handleChange}
                  />
                </Box>

                <Box
                  sx={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Rent Price :
                  </Typography>
                  <TextField
                    id="standard-basic"
                    name="rentPrice"
                    variant="standard"
                    value={flatData.rentPrice}
                    sx={{
                      width: "40%",
                      justifySelf: "center",
                      alignSelf: "center",
                    }}
                    onChange={handleChange}
                  />
                </Box>
              </>
            )}
            {!isHomepage ? (
              <Button
                startIcon={<DoneIcon />}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ fontWeight: "bold", width: "50%", mt: "2rem" }}
              >
                Save
              </Button>
            ) : null}
            {message ? (
              <TextField
                key="messageId"
                id="messageId"
                name="message"
                variant="outlined"
                onChange={handleChangeMessage}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      variant="contained"
                      sx={{ backgroundColor: red[300] }}
                      onClick={handleSendMessage}
                    >
                      <SendIcon />
                    </IconButton>
                  ),
                }}
              />
            ) : null}
          </Container>

          <CardActions disableSpacing sx={{ justifySelf: "center" }}>
            <IconButton aria-label="favourite" onClick={handleFavourite}>
              {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDeleteFlat(flatId)}
            >
              <DeleteIcon />
            </IconButton>


            {isCurrentOwner ? (
              " "
            ) : (
              <IconButton aria-label="message">
                <MessageIcon onClick={handleMessage} />
              </IconButton>
            )}

            <IconButton aria-label="info" onClick={handleFlip}>
              <InfoIcon />
            </IconButton>
          </CardActions>
        </Card>
      </ReactCardFlip>
    </>
  );
}
