import "./App.css";
import React from "react";
import Customer from "./components/Customer";

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "박건형",
    birthday: "980216",
    gender: "남자",
    job: "대학생",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "박지수",
    birthday: "980414",
    gender: "여자",
    job: "물리치료사",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "지석환",
    birthday: "980822",
    gender: "남자",
    job: "엔지니어",
  },
];

class App extends React.Component {
  render() {
    return (
      <div>
        {customers.map((customer) => {
          return (
            <Customer
              key={customer.id}
              id={customer.id}
              image={customer.image}
              name={customer.name}
              birthday={customer.birthday}
              gender={customer.gender}
              job={customer.job}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
