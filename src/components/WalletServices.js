import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import styled from "styled-components";
import { Card } from "@material-ui/core";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  div: {
    display: "grid",
    gridRowGap: "4px",
    borderRadius: "5px",
    backgroundColor: "#f2f2f2",
    padding: "20px"
  },
  subcard: {
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px"
  },
  table: {
    marginTop: "5px",
    border: "1px solid black",
    borderCollapse: "collapse"
  },
  row: {
    padding: "5px",
  }
}));

export default function WalletServices() {
  const classes = useStyles();
  const [createWallet, setCreateWallet] = useState(false);
  const [transferAmount, setTransferAmount] = useState(false);
  const [accountBalance, setAccountBalance] = useState(false);
  const [depositOrWithdrawAmount, setDepositOrWithdrawAmount] = useState(false);
  const [bankStatement, setBankStatement] = useState(false);


  const [customerId, setCustomerId] = useState(0);
  const [isFailure, setFailure] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [responseWallet, setResponseWallet] = useState(null);

  const [amount, setAmount] = useState(0);
  const [fromWalletId, setFromWalletId] = useState(0);
  const [fromAccountId, setFromAccountId] = useState(0);
  const [toWalletId, setToWalletId] = useState(0);
  const [toAccountId, setToAccountId] = useState(0);
  const [n, setN] = useState(0);
  const [errorResponse, setErrorResponse] = useState(null);

  const [action, setAction] = useState('deposit');

  function handleWalletResponse(response) {
    if (response.status === 200) {
      setSuccess(true)
      setResponseWallet(response.data);
      return response;
    } else {
      setFailure(true);
      throw new Error("Error: " + response.statusText);
    }
  }

  if (isFailure) {
    if (errorResponse !== null) {
      return(<div>
        <h4>
          {errorResponse}
        </h4>
      </div>);
    }
    return (
      <div>
        <h4>
          Request processing failed!.
        </h4>
      </div>
    );
  } else {

    if (createWallet) {

      const createWalletApi = customerId => {
        let url = `${process.env.REACT_APP_API_URL}/api/wallet/`+customerId
        return axios.post(url)
          .then(response => handleWalletResponse(response)).catch((error) => {
            setErrorResponse(error.response.data.description)
            setFailure(true);
          });
      };

      if (isSuccess && responseWallet !== null) {
        return (
          <div>
            <h3>
              Wallet Created Successfully with details :
            </h3>
            <h4>
              WalletId : {responseWallet.walletId} <br/>
            </h4>
          </div>
        )
      }

      return (
        <div>
          <h1>
            Create Wallet :
          </h1>
          <form className={classes.div}>
            <label htmlFor="userId">Enter customer ID</label>
            <input type="number" id="customerId" name="userid" placeholder="Customer customerId.." onChange={(e) => setCustomerId(e.target.value)} />
            <br />

            <button type="button" value="Submit" onClick={() => createWalletApi(customerId)}> Submit</button>
          </form>
        </div>
      );
    } else if (transferAmount) {

      const transferAmountApi = (amount, fromWalletId, fromAccountId, toWalletId, toAccountId) => {
        let url = `${process.env.REACT_APP_API_URL}/api/wallet/${fromWalletId}/account/${fromAccountId}/transfer/wallet/${toWalletId}/account/${toAccountId}/amount/${amount}`
        return axios.post(url)
          .then(response => {
            if (response.status === 200) {
              setSuccess(true)
            } else {
              setFailure(true)
            }
          }).catch((error) => {
            setErrorResponse(error.response.data.description)
            setFailure(true);
          });
      };

      if (isSuccess) {
        return (
          <div>
            <h3>
              Amount transferred Successfully
            </h3>
          </div>
        )
      }
      return (
        <div>
          <h1>
            Transfer Amount :
          </h1>
          <form className={classes.div}>
            <label htmlFor="amount">Enter Amount</label>
            <input type="number" id="amount" name="amount" placeholder="amount.." onChange={(e) => setAmount(e.target.value)} />
            <br />
            <h3>From : </h3> <br/>
            <label htmlFor="fromWalletId"> Wallet Id</label>
            <input type="number" id="fromWalletId" name="fromWalletId" placeholder="Customer wallet ID.." onChange={(e) => setFromWalletId(e.target.value)} />
            <br />

            <label htmlFor="fromAccountId">Account Id</label>
            <input type="number" id="fromAccountId" name="fromAccountId" placeholder="Customer account ID.." onChange={(e) => setFromAccountId(e.target.value)} />
            <br />
            <h3>To : </h3> <br/>
            <label htmlFor="toWalletId"> Wallet Id</label>
            <input type="number" id="toWalletId" name="toWalletId" placeholder="Customer customerId.." onChange={(e) => setToWalletId(e.target.value)} />
            <br />

            <label htmlFor="toAccountId">Account Id</label>
            <input type="number" id="toAccountId" name="toAccountId" placeholder="Customer customerId.." onChange={(e) => setToAccountId(e.target.value)} />
            <br />

            <button type="button" value="Submit" onClick={() => transferAmountApi(amount, fromWalletId, fromAccountId, toWalletId, toAccountId)}> Submit</button>
          </form>
        </div>
      );
    } else if (accountBalance) {

      const checkBalanceApi = (accountId, walletId) => {
        let url = `${process.env.REACT_APP_API_URL}/api/wallet/${walletId}/account/${accountId}/balance`
        return axios.get(url)
          .then(response => handleWalletResponse(response)).catch((error) => {
            setErrorResponse(error.response.data.description)
            setFailure(true);
          });
      };

      if (isSuccess && responseWallet !== null) {
        return (
          <h2>Balance : { responseWallet }</h2>
        )
      }

      return (
        <div>
          <h1>
            Check balance
          </h1>
          <form className={classes.div}>
            <label htmlFor="amount">Enter AccountId</label>
            <input type="number" id="accountId" name="accountId" placeholder="accountId.." onChange={(e) => setFromAccountId(e.target.value)} />
            <br />

            <label htmlFor="walletId"> Wallet Id</label>
            <input type="number" id="walletId" name="walletId" placeholder="Customer wallet ID.." onChange={(e) => setFromWalletId(e.target.value)} />
            <br />

            <button type="button" value="Submit" onClick={() => checkBalanceApi(fromAccountId, fromWalletId)}> Submit</button>
          </form>
        </div>
      );
    } else if (depositOrWithdrawAmount) {
      const depositOrWithdrawApi = (accountId, walletId, amount, action) => {
        let url
        if (action === 'deposit') {
          url = `${process.env.REACT_APP_API_URL}/api/wallet/${walletId}/account/${accountId}/deposit/${amount}`
        } else {
          url = `${process.env.REACT_APP_API_URL}/api/wallet/${walletId}/account/${accountId}/withdraw/${amount}`;
        }
        return axios.post(url)
          .then(response => handleWalletResponse(response)).catch((error) => {
            setErrorResponse(error.response.data.description)
            setFailure(true);
          });
      }

      if (isSuccess && responseWallet !== null) {
        if(action === 'deposit') {
          return (<div>
            <h3>
              Amount has been deposited successfully
            </h3>
          </div>)
        } else {
          return (<div>
            <h3>
              Amount has been withdrawn successfully
            </h3>
          </div>)
        }
      }

      return (
        <div>
          <h1>
            Deposit or Withdraw Amount
          </h1>
          <form className={classes.div}>
            <label htmlFor="amount">Enter Amount</label>
            <input type="number" id="amount" name="amount" placeholder="amount.." onChange={(e) => setAmount(e.target.value)} />
            <br />

            <label htmlFor="fromWalletId"> Wallet Id</label>
            <input type="number" id="fromWalletId" name="fromWalletId" placeholder="Customer wallet ID.." onChange={(e) => setFromWalletId(e.target.value)} />
            <br />

            <label htmlFor="fromAccountId">Account Id</label>
            <input type="number" id="fromAccountId" name="fromAccountId" placeholder="Customer account ID.." onChange={(e) => setFromAccountId(e.target.value)} />
            <br />

            <label htmlFor="depositOrWithdraw">Choose an option</label>
            <select name="depositOrWithdraw" id="depositOrWithdraw" onChange={(e) => setAction(e.target.value)}>
              <option value="deposit">Deposit</option>
              <option value="withdraw">Withdraw</option>
            </select>
            <br />

            <button type="button" value="Submit" onClick={() => depositOrWithdrawApi(fromAccountId, fromWalletId, amount, action)}> Submit</button>
          </form>
        </div>
      );
    } else if (bankStatement) {

      const getStatementApi = (accountId, numberOfTransactions, walletId ) => {
        let url = `${process.env.REACT_APP_API_URL}/api/wallet/${walletId}/account/${accountId}/lastNTransactions/${numberOfTransactions}`
        return axios.get(url)
          .then(response => handleWalletResponse(response)).catch((error) => {
            setErrorResponse(error.response.data.description)
            setFailure(true);
          });
      }

      if (isSuccess && responseWallet !== null) {
        return (
          <table className={classes.table}>
            <thead>
            <tr>
              <th className={classes.row}>TransactionId</th>
              <th className={classes.row}>Type</th>
              <th className={classes.row}>Timestamp</th>
              <th className={classes.row}>Amount</th>
              <th className={classes.row}>Post Balance</th>
              <th className={classes.row}>Description</th>
            </tr>
            </thead>
            <tbody>
            {
              responseWallet && responseWallet.map((item, index) => (
                <tr key={index}>
                  <td className={classes.row}>{item.transactionId}</td>
                  <td className={classes.row}>{item.type}</td>
                  <td className={classes.row}>{ moment(item.timestamp).format('DD/MM/YYYY, h:mm:ss a')}</td>
                  <td className={classes.row}>{item.amount}</td>
                  <td className={classes.row}>{item.postBalance}</td>
                  <td className={classes.row}>{item.description}</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        );
      }

     return (
       <div>
        <h1>
          Statement :
        </h1>
        <form className={classes.div}>

          <label htmlFor="fromWalletId"> Wallet Id</label>
          <input type="number" id="fromWalletId" name="fromWalletId" placeholder="Customer wallet ID.." onChange={(e) => setFromWalletId(e.target.value)} />
          <br />

          <label htmlFor="numberOfTransactions">Number of last transactions</label>
          <input type="number" id="n" name="n" onChange={(e) => setN(e.target.value)} />
          <br />

          <label htmlFor="fromAccountId">Account Id</label>
          <input type="number" id="fromAccountId" name="fromAccountId" placeholder="Customer account ID.." onChange={(e) => setFromAccountId(e.target.value)} />
          <br />

          <button type="button" value="Submit" onClick={() => getStatementApi(fromAccountId, n,  fromWalletId)}> Submit</button>
        </form>
      </div>
     )
    }
      return (
        <div>
          <CardHover onClick={() => setCreateWallet(!createWallet)}> <Card className={classes.subcard}>Create Wallet</Card></CardHover>
          <CardHover onClick={() => setTransferAmount(!transferAmount)}> <Card className={classes.subcard}>Transfer Amount</Card></CardHover>
          <CardHover onClick={() => setAccountBalance(!accountBalance)}> <Card className={classes.subcard}>Get Account Balance</Card></CardHover>
          <CardHover onClick={() => setDepositOrWithdrawAmount(!depositOrWithdrawAmount)}> <Card className={classes.subcard}>Withdraw/Deposit amount</Card></CardHover>
          <CardHover onClick={() => setBankStatement(!bankStatement)}> <Card className={classes.subcard}>Statement</Card></CardHover>
        </div>
      );
    }
}

const CardHover = styled.div`
:hover {
cursor: pointer;
}
`;