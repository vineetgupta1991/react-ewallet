import React from "react";

import AppLayout from "./AppLayout";

import {Grid} from "@material-ui/core";

export default function Wallet() {

    return (
      <div>
          <Grid container alignItems="flex-end">
              <Grid item xs={12} style={{ textAlign: "center" }}>
                  <h1>Welcome to admin page of e-wallet</h1>
              </Grid>
          </Grid>
        <AppLayout />
      </div>
    );
}
