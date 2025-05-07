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
import { Container, Box, TextField, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import MessageIcon from "@mui/icons-material/Message";
import DoneIcon from "@mui/icons-material/Done";
import { useOutletContext } from "react-router-dom";
import {
  sendMessage,
  updateFlatData,
  favouriteFlat
} from "../../../firebase";

/**
 * Flat Component - Displays individual flat card with editable or read-only views,
 * favorite toggle, message sending, and flip view for extra info or edit form.
 */
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
  // Card flipping state (front/back)
  const [isFlipped, setIsFlipped] = useState(false);

  // Favorite state based on initial prop
  const [isFavourite, setIsFavourite] = useState(favourite);

  // Message sending state
  const [message, setMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  // Editable flat state
  const [flatData, setFlatData] = useState(flat);

  const { currentUser } = useOutletContext();

  // Flip card view
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Toggle favorite icon and trigger DB update
  const handleFavourite = () => {
    setIsFavourite((prev) => !prev);
  };

  // Update favorite status in Firebase whenever toggled
  useEffect(() => {
    const update = async () => {
      await favouriteFlat(currentUser, flat, isFavourite);
    };
    update();
  }, [isFavourite]);

  // Toggle message field
  const handleMessage = () => {
    setMessage(!message);
  };

  // Send message to flat owner
  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(flatId, messageText);
      setMessageText("");
    }
  };

  // Handle text change for message
  const handleChangeMessage = (e) => {
    setMessageText(e.target.value);
  };

  // Handle text changes for flat details (editing)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlatData({ ...flatData, [name]: value });
  };

  // Submit edited flat data to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isMyFlatsPage) {
      await updateFlatData(currentUser, flatData);
    }
  };

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* --- Front Side of Card --- */}
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

        {/* --- Back Side of Card --- */}
        <Card sx={{ width: 260, pt: "1rem" }}>
          <Container sx={{ width: 250 }}>
            {/* If on homepage, show read-only flat details */}
            {isHomepage ? (
              <>
                {[
                  ["City", city],
                  ["Str. Name", streetName],
                  ["Str. No.", streetNumber],
                  ["Area Size", areaSize],
                  ["Has AC", hasAC ? "Yes" : "No"],
                  ["Year Build", yearBuild],
                  ["Rent Price", rentPrice],
                ].map(([label, value]) => (
                  <Typography
                    key={label}
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {label}: <Box sx={{ fontWeight: "600", display: "inline" }}>{value}</Box>
                  </Typography>
                ))}
              </>
            ) : (
              // If not on homepage, show editable fields
              <>
                {[
                  ["city", "City"],
                  ["streetName", "Str. Name"],
                  ["streetNumber", "Str. No."],
                  ["areaSize", "Area Size"],
                  ["hasAC", "Has AC"],
                  ["yearBuild", "Year Build"],
                  ["rentPrice", "Rent Price"],
                ].map(([name, label]) => (
                  <Box
                    key={name}
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
                      {label}:
                    </Typography>
                    <TextField
                      id="standard-basic"
                      name={name}
                      variant="standard"
                      value={flatData[name]}
                      sx={{
                        width: "40%",
                        justifySelf: "center",
                        alignSelf: "center",
                      }}
                      onChange={handleChange}
                    />
                  </Box>
                ))}
              </>
            )}

            {/* Save button for editing (only if not on homepage) */}
            {!isHomepage && (
              <Button
                startIcon={<DoneIcon />}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ fontWeight: "bold", width: "50%", mt: "2rem" }}
              >
                Save
              </Button>
            )}

            {/* Message box for sending inquiries */}
            {message && (
              <TextField
                key="messageId"
                id="messageId"
                name="message"
                variant="outlined"
                value={messageText}
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
            )}
          </Container>

          {/* Action buttons: favorite, delete, message, flip */}
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

            {!isCurrentOwner && (
              <IconButton aria-label="message" onClick={handleMessage}>
                <MessageIcon />
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
