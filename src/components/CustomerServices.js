import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import styled from "styled-components";
import { Card } from "@material-ui/core";

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

export default function CustomerServices() {
  const classes = useStyles();
  const [findAllCustomer, setFindAllCustomer] = useState(false);
  const [createCustomer, setCreateCustomer] = useState(false);
  const [getCustomerById, setGetCustomerById] = useState(false);
  const [email, setEmail] = useState(null);
  const [isFailure, setFailure] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [userId, setUserId] = useState(0);
  const [responseAllCustomer, setResponseAllCustomer] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);

  const customerDetails = {
      fname: null,
      lname: null,
      email: null
  };

  function handleCustomerResponse(response) {
    if (response.status === 200) {
      setSuccess(true)
      setResponseAllCustomer(response.data);
    } else {
      setFailure(true);
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
    if (findAllCustomer) {
      const customerApi = email => {
        if (email !== null) {
          return axios.get(`${process.env.REACT_APP_API_URL}/api/customer`, { params: { email: email } })
            .then(response => handleCustomerResponse(response)).catch((error) => {
              setErrorResponse(error.response.data.description)
              setFailure(true);
            });
        } else {
          return axios.get(`${process.env.REACT_APP_API_URL}/api/customer`)
            .then(response => handleCustomerResponse(response)).catch((error) => {
              setErrorResponse(error.response.data.description)
              setFailure(true);
            });
        }
      };

      if (isSuccess && responseAllCustomer !== null) {

        return (
          <table className={classes.table}>
            <thead>
            <tr>
              <th className={classes.row}>#</th>
              <th className={classes.row}>First Name</th>
              <th className={classes.row}>Last Name</th>
              <th className={classes.row}>Email</th>
            </tr>
            </thead>
            <tbody>
            {
              responseAllCustomer && responseAllCustomer.map((item, index) => (
                <tr key={index}>
                  <td className={classes.row}>{index + 1}</td>
                  <td className={classes.row}>{item.fname}</td>
                  <td className={classes.row}>{item.lname}</td>
                  <td className={classes.row}>{item.email}</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        );


      }

      else {
        return (
          <div>
            <h1>
              Get All Customers :
            </h1>
            <form className={classes.div}>
              <label htmlFor="email">Enter Email</label>
              <input type="email" id="email" name="email" placeholder="Customer email.." onChange={(e) => setEmail(e.target.value)} />
              <br />

              <button type="button" value="Submit" onClick={() => customerApi(email)}> Submit</button>
            </form>
          </div>

        );
      }

    } else if (createCustomer) {

      const createCustomerApi = customerDetails => {
        return axios.post(`${process.env.REACT_APP_API_URL}/api/customer`, customerDetails)
          .then(response => handleCustomerResponse(response))
          .catch((error) => {
            setErrorResponse(error.response.data.description)
            setFailure(true);
          });
      };

      if (isSuccess) {
        return (
          <div>
            <h4>Customer Created Successfully!</h4>
          </div>

        );
      }

      return (
        <div>
          <h1>
            Create Customer :
          </h1>
          <form className={classes.div}>
            <label htmlFor="email">Enter Email (optional)</label>
            <input type="email" id="email" name="email" placeholder="Customer email.." onChange={(e) => customerDetails.email = e.target.value} />
            <br />

            <label htmlFor="fname">Enter First Name</label>
            <input type="email" id="email" name="email" placeholder="Customer first name.." onChange={(e) => customerDetails.fname = e.target.value} />
            <br />

            <label htmlFor="lname">Enter Last Name</label>
            <input type="lname" id="lname" name="lname" placeholder="Customer last name.." onChange={(e) => customerDetails.lname = e.target.value} />
            <br />

            <button type="button" value="Submit" onClick={() => createCustomerApi(customerDetails)}> Submit</button>
          </form>

        </div>

      );
    } else if (getCustomerById) {
      const customerByIdApi = userId => {
          let url = `${process.env.REACT_APP_API_URL}/api/customer/`+userId
          return axios.get(url)
            .then(response => handleCustomerResponse(response)).catch((error) => {
              setErrorResponse(error.response.data.description)
              setFailure(true);
            });
      }

      if (isSuccess && responseAllCustomer !== null) {
        return(
          <div>
          <h1>
          Customer fetched successfully with Data :
          </h1>
          <h4>
          Name : {responseAllCustomer.fname}  &nbsp;  {responseAllCustomer.lname} <br/>
          Email : {responseAllCustomer.email} <br/>
          UserId : {responseAllCustomer.userId}<br/>
        </h4>
          </div>
        )
      }

     return(
       <div>
        <h1>
          Get Customer by Id :
        </h1>
        <form className={classes.div}>
          <label htmlFor="userId">Enter UserId</label>
          <input type="number" id="userid" name="userid" placeholder="Customer userId.." onChange={(e) => setUserId(e.target.value)} />
          <br />

          <button type="button" value="Submit" onClick={() => customerByIdApi(userId)}> Submit</button>
        </form>
      </div>
     )
    } else {
      return (
        <div>
          <CardHover onClick={() => setFindAllCustomer(!findAllCustomer)}> <Card className={classes.subcard}>Get All Customers</Card></CardHover>
          <CardHover onClick={() => setCreateCustomer(!createCustomer)}> <Card className={classes.subcard}>Create Customer</Card></CardHover>
          <CardHover onClick={() => setGetCustomerById(!getCustomerById)}> <Card className={classes.subcard}>Get Customer By Id</Card></CardHover>
        </div>
      );
    }
  }
}

const CardHover = styled.div`
:hover {
cursor: pointer;
}
`;