import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@material-ui/core";

import styled from 'styled-components';
import AccountServices from "./AccountServices";
import CustomerServices from "./CustomerServices";
import WalletServices from "./WalletServices";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 600,
    minHeight: 600,
  },
  subcard: {
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  layout: {
    marginTop: "20px",
  },
}));

export default function AppLayout() {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WalletCard />
        </Grid>
      </Grid>
    </div>
  );
}

const WalletCard = () => {
  const classes = useStyles();
    const [accountService, setAccountService] = useState(false);
    const [customerService, setCustomerService] = useState(false);
    const [walletService, setWalletService] = useState(false);

    const renderService = (accountService, customerService ,walletService) => {
        if (accountService) {
            return <AccountServices />
        } else if (customerService){
            return <CustomerServices />
        } else if (walletService) {
            return <WalletServices />
        } else {
          return <></>
        }
    }


    const setServiceAction = (accountAction, customerAction, walletAction) => {
        setAccountService(accountAction)
        setCustomerService(customerAction)
        setWalletService(walletAction)
    }

  return (
    <Card className={classes.card}>
      <CardHeader
        title="Services Offered below :"
        style={{ textAlign: "center" }}
      />
      <CardContent>
       <CardHover onClick={() => {
           setServiceAction(true, false, false)
       }}> <Card className={classes.subcard}>Account Services</Card></CardHover>
          <CardHover onClick={() => {
              setServiceAction(false, true, false)
          }}> <Card className={classes.subcard}>Customer Services</Card></CardHover>
          <CardHover onClick={() => {
              setServiceAction(false, false, true)
          }}> <Card className={classes.subcard}>Wallet Services</Card></CardHover>
        <Divider variant="middle" style={{ marginTop: "50px" }} />
          { renderService(accountService, customerService, walletService) }
      </CardContent>
    </Card>
  );
};

const CardHover = styled.div`
:hover {
cursor: pointer;
}
`;
