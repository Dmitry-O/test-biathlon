import logo from './logo.svg';
import './App.css';
import { Table } from 'reactstrap';

var id = 0;

const generatePlayer = () => {
  id++;
  return {
    id: id,
    name: "Player " + id,
    result: Math.floor(Math.random() * 5) + 0 + ":" 
    + (Math.floor(Math.random() * 59) + 0) + "." 
    + (Math.floor(Math.random() * 59) + 0),
    numberOfHits: Math.floor(Math.random() * 10) + 0,
    rateOfFire: Math.floor(Math.random() * 60) + 10
  }
};

const data = [
  generatePlayer(),
  generatePlayer(),
  generatePlayer(),
  generatePlayer(),
  generatePlayer()
  /*{
    id: 0,
    name: "John Smith",
    result: "2:03:10",
    numberOfHits: 5,
    rateOfFire: 399
  },
  {
    id: 1,
    name: "Elithabeth East",
    result: "1:15:50",
    numberOfHits: 10,
    rateOfFire: 478
  },
  {
    id: 2,
    name: "Neyman T",
    result: "2:45:45",
    numberOfHits: 2,
    rateOfFire: 200
  }*/
];

const players = data.map(player => {
  return (
    <tr>
      <th>{player.id}</th>
      <td>{player.name}</td>
      <td>{player.result}</td>
      <td>{player.numberOfHits}</td>
      <td>{player.rateOfFire}</td>
    </tr>
  )
});

function App() {
  return (
    <div className="container">
      <Table striped>
        <thead class="thead-dark">
          <tr>
              <th>#</th>
              <th>Name</th>
              <th>Result</th>
              <th>Hits</th>
              <th>Fire rate</th>
          </tr>
        </thead>
        <tbody>
        {players}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
