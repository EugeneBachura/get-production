import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export default function Login({ login, email, password }) {
  const GET_USER = gql`
query {
  user(login: "${email}", password: "${password}")
}
`;

  const [tryAgain, setTryAgain] = useState(false);

  function loginSubmit(arg) {
    if (arg) login(arg);
    else setTryAgain(true);
  }

  return (
    <Query query={GET_USER}>
      {({ data }) => (
        <div>
          <span
            style={{
              color: "red",
              margin: "0",
              textAlign: "center",
            }}
          >
            {tryAgain ? "Wrong login or password" : ""}
          </span>
          <input
            className="submitButton"
            type="submit"
            onClick={() => loginSubmit(data.user)}
          />
        </div>
      )}
    </Query>
  );
}
