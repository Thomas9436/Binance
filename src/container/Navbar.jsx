// Navbar.js
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            KryptoNeat
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ color: "white", display: "block" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/crypto"
            sx={{ color: "white", display: "block" }}
          >
            Chart
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
