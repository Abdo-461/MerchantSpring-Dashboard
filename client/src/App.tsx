import React, { useState } from "react";

import styled from "styled-components";

import Dashboard from './components/Dashboard';


const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #cccccc;
`;

const AppHeader = styled.header`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
  height: 5em;
`;

const HeaderText = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: bold;
`;

const Username = styled.span`
  font-family: "Roboto", sans-serif;
  font-weight: bold;
`;

interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    fetch("http://localhost:8080/user")
      .then((results) => results.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <AppWrapper>
      <AppHeader>
        <HeaderText>Analytics Dashboard</HeaderText>
        <Username>Welcome, {user ? user.firstName : "Guest"}!</Username>
      </AppHeader>
      <Dashboard />
    </AppWrapper>
  );
};

export default App;
