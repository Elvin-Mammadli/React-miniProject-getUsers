import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

let page = 1;

function App() {
  const [userId, setUserId] = useState(0);
  const [users, setUsers] = useState();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = (type) => {
    axios
      .get(`https://reqres.in/api/users?page=${page}`)
      .then((result) => result.data)
      .then((data) => data.data)
      .then((data) => {
        if (data.length > 0) {
          setUsers(data);
          if (type === "next") {
            setUserId(0);
          } else if (type === "prev") {
            setUserId(data.length - 1);
          }
        } else {
          if (type === "next") {
            page -= 1;
          } else if (type === "prev") {
            page += 1;
          }
        }
      })
      .catch((err) => console.log(err.message));
  };

  const PrevUserClickHandler = () => {
    if (users[userId - 1]) {
      setUserId(userId - 1);
    } else {
      if (page - 1 > 0) {
        page -= 1;
        getUsers("prev");
      }
    }
  };

  const NextUserClickHandler = () => {
    if (users[userId + 1]) {
      setUserId(userId + 1);
    } else {
      page += 1;
      getUsers("next");
    }
  };

  return (
    <>
      {users ? (
        <div className="App">
          <img className="image" src={users[userId].avatar} alt="" />
          <h1 className="fullName">
            {users[userId].first_name + " " + users[userId].last_name}
          </h1>
          <p className="email">{users[userId].email}</p>
          <button className="prevUser" onClick={PrevUserClickHandler}>
            Prev User
          </button>
          <button className="nextUser" onClick={NextUserClickHandler}>
            Next User
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
