import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";
import { Container, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Form from "../Components/Form";

const PROFILE_FIELDS = [
  { id: "emailInput", name: "email", label: "Email", variant: "standard" },

  {
    id: "firstName",
    name: "firstName",
    label: "First Name",
    variant: "standard",
  },
  { id: "lastName", name: "lastName", label: "Last Name", variant: "standard" },
  {
    id: "birthDate",
    name: "birthDate",
    label: "Date of Birth",
    variant: "standard",
  },
];
export default function User({
  firstName,
  lastName,
  email,
  dateOfBirth,
  id,
  userData,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [edit, setIsEdit] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <Box sx={{p:'1rem', display:'flex', justifyContent:'center'}}>
        <Grid2 >
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card sx={{ width: 250, p: "1rem", m: "1rem" }}>
              <Typography
                gutterBottom
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                User : {userData.firstName}
                <Box sx={{ fontWeight: "600", display: "inline" }}>{id}</Box>
              </Typography>
              <CardActions disableSpacing>
                <IconButton aria-label="info" onClick={handleFlip}>
                  <InfoIcon />
                </IconButton>
              </CardActions>
            </Card>
            <Card sx={{ width: 500, background: "grey" }}>
              {userData !== null || userData !== undefined ? (
                <Container>
                  <Form
                    buttonLabel={"Edit"}
                    fields={PROFILE_FIELDS}
                    icon={<EditIcon />}
                    fieldValues={userData}
                    isProfilePage={true}
                    userId={userData.id}
                  ></Form>
                </Container>
              ) : null}

              <CardActions disableSpacing sx={{ justifySelf: "center" }}>
                <IconButton aria-label="info" onClick={handleFlip}>
                  <InfoIcon />
                </IconButton>
              </CardActions>
            </Card>
          </ReactCardFlip>

        </Grid2>
      </Box>
    </>
  );
}
