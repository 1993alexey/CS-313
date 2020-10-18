import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
} from "@material-ui/core";
import "./login.css";
import { login } from "./login-service";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("Alex");
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    login(username).then((res) => {
      if (res) history.push("/assignment4");
      else alert("Incorrect User Name!");
    });
  }

  return (
    <div>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            className="login-form"
          >
            <Paper
              variant="elevation"
              elevation={2}
              className="login-background"
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="Name"
                        fullWidth
                        name="username"
                        variant="outlined"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                        autoFocus
                      />
                    </Grid>
                    {/* <Grid item>
                        <TextField
                          type="password"
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={this.state.password}
                          onChange={(event) =>
                            this.setState({
                              [event.target.name]: event.target.value,
                            })
                          }
                          required
                        />
                      </Grid> */}
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              {/* <Grid item>
                  <Link href="#" variant="body2">
                    Forgot Password?
                  </Link>
                </Grid> */}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
