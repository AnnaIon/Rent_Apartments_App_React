import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Person2Icon from "@mui/icons-material/Person2";
import { red } from "@mui/material/colors";
import { Button, Typography, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { getMessages, sendMessage } from "../../../firebase";

const Inbox = () => {
  // State to toggle message input visibility
  const [message, setMessage] = useState(false);

  // List of messages fetched from Firestore
  const [messages, setMessages] = useState([]);

  // Tracks input text for each flat (keyed by flatId)
  const [messageText, setMessageText] = useState({});

  // Fetch messages when the component mounts
  useEffect(() => {
    const update = async () => {
      const userMessages = await getMessages();
      setMessages(userMessages);
    };
    update();
  }, []);

  // Toggle message input visibility
  const handleClick = () => {
    setMessage((prev) => !prev);
  };

  // Handle text change for a specific flat's input
  const handleChangeMessage = (e, flatId) => {
    const { value } = e.target;
    setMessageText((prev) => ({
      ...prev,
      [flatId]: value,
    }));
  };

  // Handle sending message for specific flat/user
  const handleSendMessage = (flatId, userIdFrom, messageId) => {
    const text = messageText[flatId]?.trim();
    if (text) {
      sendMessage(flatId, text, userIdFrom, messageId);

      // Clear the input field after sending
      setMessageText((prev) => ({
        ...prev,
        [flatId]: "",
      }));
    }
  };

  return (
    <Box>
      {messages.length > 0 ? (
        messages.map((message) => (
          <Container
            key={message.flatId}
            sx={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              p: 1,
              m: 1,
              borderRadius: 1,
            }}
          >
            {/* Message Header and Input */}
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Person2Icon sx={{ color: red[300] }} />
              <Typography sx={{ color: red[300] }}>
                {message.userNameFrom}
              </Typography>
              <Typography sx={{ color: red[300], fontWeight: "600" }}>
                {message.message}
              </Typography>

              {/* Show input if toggled, otherwise show a button */}
              {message ? (
                <TextField
                  required
                  value={messageText[message.flatId] || ""}
                  onChange={(e) => handleChangeMessage(e, message.flatId)}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: red[300] }}
                        onClick={() =>
                          handleSendMessage(
                            message.flatId,
                            message.userIdFrom,
                            message.id
                          )
                        }
                      >
                        <SendIcon />
                      </Button>
                    ),
                  }}
                />
              ) : (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: red[300] }}
                  onClick={handleClick}
                >
                  Write a message
                </Button>
              )}
            </Box>
          </Container>
        ))
      ) : (
        <Typography>No messages available.</Typography>
      )}
    </Box>
  );
};

export default Inbox;
