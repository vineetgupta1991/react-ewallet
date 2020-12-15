import React, {useState} from "react"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
    div: {
        display: "grid",
        gridRowGap: "4px",
        borderRadius: "5px",
        backgroundColor: "#f2f2f2",
        padding: "20px",
        }
}));

export default function AccountServices() {
    const classes = useStyles();
    const [isSuccess, setSuccess] = useState(false);
    const [isFailure, setFailure] = useState(false);
    const [response, setResponse] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);

    const apiResult = () => {
        if (isSuccess) {
            return <h4>Account Created Successfully</h4>
        } else {
            return <h4>Account Creation error </h4>
        }
    }

    const accountDetails =  {
        accountHolder: {
            fname: null,
            lname: null,
            email: null
        },
        accountNumber: 0,
        balance: 0
    }

    const accountApi = accountDetails => {
        return axios.post(`${process.env.REACT_APP_API_URL}/api/account`, accountDetails)
            .then(response => handleResponse(response)).catch((error) => {
            setErrorResponse(error.response.data.description)
            setFailure(true);
          });
    };

    function handleResponse(response) {
        if (response.status === 200) {
            setSuccess(true)
            setResponse(response.data)
        } else {
            setFailure(true)
        }
    }

    if (response !== null) {
        return (
            <div>
                <h1>
                    Account created successfully with Data :
                </h1>
                <h4>
                Name : {response.accountHolder.fname}  &nbsp;  {response.accountHolder.lname} <br/>
                Email : {response.accountHolder.email} <br/>
                Account Number : {response.accountNumber}<br/>
                Balance : {response.balance}<br/>
                </h4>
            </div>
        )
    } else if (isFailure) {
      if (errorResponse !== null) {
        return (
          <div>
            <h4>
              {errorResponse}
            </h4>
          </div>
        )
      }
        return (
            <div>
                <h4>
                    Account creation failed !
                </h4>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>
                    Create Account :
                </h1>
                <form className={classes.div}>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" name="fname" placeholder="Customer name.." onChange={(e) => accountDetails.accountHolder.fname = e.target.value}/>
                    <br/>

                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" name="lname" placeholder="Customer last name.." onChange={(e) => accountDetails.accountHolder.lname = e.target.value}/>
                    <br/>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Customer email.." onChange={(e) => accountDetails.accountHolder.email = e.target.value}/>
                    <br/>

                    <label htmlFor="accountNumber">Account Number</label>
                    <input type="number" id="accountNumber" name="accountNumber" placeholder="Customer account number.." onChange={(e) => accountDetails.accountNumber = e.target.value}/>
                    <br/>

                    <label htmlFor="balance">Balance</label>
                    <input type="number" id="balance" name="balance" placeholder="Customer account balance.." onChange={(e) => accountDetails.balance = e.target.value}/>
                    <br/>

                    <button type="button" value="Submit" onClick={() => accountApi(accountDetails)}> Submit</button>
                </form>
                {apiResult}
            </div>

        );
    }
}