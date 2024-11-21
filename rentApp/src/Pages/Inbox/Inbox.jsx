import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Person2Icon from "@mui/icons-material/Person2";
import { red } from "@mui/material/colors";
import { Button, Typography, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { getMessages, sendMessage } from "../../../firebase";

const Inbox = () => {
  const [message, setMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState({});

  useEffect(() => {
    const update = async () => {
      const userMessages = await getMessages();
      setMessages(userMessages);
    };
    update();
  }, []);

  const handleClick = () => {
    setMessage(!message); 
  };

  const handleChangeMessage = (e, flatId) => {
    const { value } = e.target;
    setMessageText((prev) => ({
      ...prev,
      [flatId]: value, // Update message  
    }));
  };

  const handleSendMessage = (flatId, userIdFrom, messageId) => {
    if (messageText[flatId]?.trim()) {
      console.log(userIdFrom);
      sendMessage(flatId, messageText[flatId], userIdFrom, messageId);
      setMessageText((prev) => ({
        ...prev,
        [flatId]: "", // Clear the message  
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
            <Box
              key={message.flatId}
              display="flex"
              justifyContent="space-around"
              alignItems='center'
            >
              <Person2Icon sx={{ color: red[300] }} />
              <Typography sx={{ color: red[300] }}>
                {message.userNameFrom}
              </Typography>
              <Typography sx={{ color: red[300], fontWeight:'600' }}>
                {message.message}
              </Typography>
              {message ? (
                <TextField
                  required
                  value={messageText[message.flatId]}
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
