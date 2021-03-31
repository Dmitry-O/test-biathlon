import './App.css';
import { Table } from 'reactstrap';
import React from 'react';
import { Button, Input, Row } from 'reactstrap';
const { uniqueNamesGenerator, names, colors } = require('unique-names-generator');

var number = 0;
var data = [];
var players;

const generatePlayer = () => {
  number++;
  let hrs = Math.floor(Math.random() * 5) + 0;
  let min = Math.floor(Math.random() * 59) + 0;
  let sec = Math.floor(Math.random() * 59) + 0;
  let time = new Date("2021-03-01, " + hrs + ":" + min + ":" + sec);
  let name = uniqueNamesGenerator({dictionaries: [colors]});
  
  return {
    name: uniqueNamesGenerator({dictionaries: [names]}) + " " + name.charAt(0).toUpperCase() + name.substr(1),
    result: time,
    numberOfHits: Math.floor(Math.random() * 10) + 0,
    rateOfFire: Math.floor(Math.random() * 60) + 10
  }
};


function generateData(number) {
  for (let i = 0; i < number; i++)
    data.push(generatePlayer());
}

const refreshPlayers = (search) => {
  var id = 0;

  if (search === "") {
    players = data.map(player => {
      id++;
      return (
        <tr>
          <th>{id}</th>
          <td>{player.name}</td>
          <td>{player.result.getHours() + ":" + player.result.getMinutes() + ":" + player.result.getSeconds()}</td>
          <td>{player.numberOfHits}</td>
          <td>{player.rateOfFire}</td>
        </tr>
      )
    })
  }
  else {
    var filteredPlayers = data.filter(player => {
      return player.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    players = filteredPlayers.map(player => {
      id++;
      return (
        <tr>
          <th>{id}</th>
          <td>{player.name}</td>
          <td>{player.result.getHours() + ":" + player.result.getMinutes() + ":" + player.result.getSeconds()}</td>
          <td>{player.numberOfHits}</td>
          <td>{player.rateOfFire}</td>
        </tr>
      )
    })
  }
}

function sortPlayers(field) {
  data = data.sort((player1, player2) => {
    var name1 = player1.name.toLowerCase();
    var name2 = player2.name.toLowerCase();

    switch(field) {
      case "NAME":
        if (name1 > name2)
          return 1;
        else return -1;
      case "RESULT":
        return new Date(player1.result) - new Date(player2.result);
      case "HITS":
        return player1.numberOfHits - player2.numberOfHits;
      case "FIRE_RATE":
        return player1.rateOfFire - player2.rateOfFire;
    }
  });
}

generateData(20);


function App() {
  const [column, setColumn] = React.useState("RESULT");
  const [search, setSearch] = React.useState("");

  sortPlayers(column);
  refreshPlayers(search);

  return (
    <div className="container">
      <div className="text-center mb-4 mt-2 text-danger">
        <h1>
          Biathlon game results table
        </h1>
      </div>
      <Table striped bordered>
        <thead class="thead-dark text-center">
          <tr className="align-items-center">
              <th><h5>#</h5></th>
              <th style={{width: "35%"}}>
                <Row>
                  <Button className="ml-4 col-2 mr-3" color={column === "NAME" ? "warning" : "light"} onClick={() => { setColumn("NAME"); sortPlayers(column); refreshPlayers(search); }} active={column === "NAME"}>Name</Button>
                  <Input type="text"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    name="search"
                    className="col-8"
                    style={{backgroundColor: "black", color: "white"}}
                    placeholder="Search by name"
                  />
                </Row>
              </th>
              <th><Button color={column === "RESULT" ? "warning" : "light"} onClick={() => { setColumn("RESULT"); sortPlayers(column); refreshPlayers(search); }} active={column === "RESULT"}>Result</Button></th>
              <th><Button color={column === "HITS" ? "warning" : "light"} onClick={() => { setColumn("HITS"); sortPlayers(column); refreshPlayers(search); }} active={column === "HITS"}>Hits</Button></th>
              <th><Button color={column === "FIRE_RATE" ? "warning" : "light"} onClick={() => { setColumn("FIRE_RATE"); sortPlayers(column); refreshPlayers(search); }} active={column === "FIRE_RATE"}>Fire rate</Button></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {players}
        </tbody>
      </Table>
    </div>
  );
}

export default App;