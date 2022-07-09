import React, { useState, useEffect, useRef } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    cell: "",
    street: "",
    email: "",
    age: Number,
    password: "",
    picture: defaultImage,
    head: "My Name is ",
    desc: "",
    loading: true
  })
  
  const fetchData = async () => {
    try{
      
      const response = await fetch(url);
    const data = await response.json();
    const { cell, location, email, login, dob, name, picture } =
      data.results[0];
    const { large } = picture;
    const { street, } = location;
    const { number, name: strName } = street;
    const { age } = dob;
    const { first, last } = name;
    const { password } = login;
    setUserDetails({...userDetails, loading: false})
    const location1 = number + " " + strName;
    const name1 = first + " " + last;
    setUserDetails({
      ...userDetails,
      name: name1,
      cell,
      email,
      picture: large,
      password,
      age,
      street: location1,
    });
}catch(error) {
  setUserDetails({
    ...userDetails,
    head: "My Name is",
    desc: 'rANDOM PERSON',
  });
}
};

  useEffect(() => {
    if (userDetails.loading) {
      setUserDetails({
        ...userDetails,
        head: "My Name is",
        desc: "Robert Sfolkif",
        picture: defaultImage,
      });
    }
    
    fetchData();
  if (userDetails.desc === "" && !userDetails.loading) {
    setUserDetails({
      ...userDetails,
      desc: userDetails.name,
    });
  }
  }, []);
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={userDetails.picture}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">{userDetails.head}</p>
          <p className="user-value">{userDetails.desc}</p>
          <div className="user-value">
            <div className="values-list">
              <button
                className="icon"
                data-label="name"
                onMouseLeave={() => {
                  setUserDetails({
                    ...userDetails,
                    head: "My Name is",
                    desc: userDetails.name,
                  });
                }}
              >
                <FaUser />
              </button>
              <button
                className="icon"
                data-label="email"
                onMouseLeave={() => {
                  setUserDetails({
                    ...userDetails,
                    head: "My Email is",
                    desc: userDetails.email,
                  });
                }}
              >
                <FaEnvelopeOpen />
              </button>
              <button
                className="icon"
                data-label="age"
                onMouseLeave={() => {
                  setUserDetails({
                    ...userDetails,
                    head: "My age is",
                    desc: userDetails.age,
                  });
                }}
              >
                <FaCalendarTimes />
              </button>
              <button
                className="icon"
                data-label="street"
                onMouseLeave={() => {
                  setUserDetails({
                    ...userDetails,
                    head: "My street is",
                    desc: userDetails.street,
                  });
                }}
              >
                <FaMap />
              </button>
              <button
                className="icon"
                data-label="phone"
                onMouseLeave={() => {
                  setUserDetails({
                    ...userDetails,
                    head: "My phone is",
                    desc: userDetails.cell,
                  });
                }}
              >
                <FaPhone />
              </button>
              <button
                className="icon"
                data-label="password"
                onMouseLeave={() => {
                  setUserDetails({
                    ...userDetails,
                    head: "My password is",
                    desc: userDetails.password,
                  });
                }}
              >
                <FaLock />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
