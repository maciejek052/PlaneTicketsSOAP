import React from "react";
import { Table, Button } from "react-bootstrap";
import "../../styles/table.css";
import IFlight from "../../types/Flight";

interface FlightsTableProps {
  flights: IFlight[];
}

const FlighsTable = ({ flights }: FlightsTableProps) => {
  console.log(flights);
  return (
    <>
      {flights ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Lotnisko odlotu</th>
              <th>Lotnisko przylotu</th>
              <th>Dzień</th>
              <th>Godzina</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.ID}>
                <td>{flight.ID}</td>
                <td>{flight.departureAirport.name + " (" + flight.departureAirport.code + ")"}</td>
                <td>{flight.arrivalAirport.name + " (" + flight.arrivalAirport.code + ")"}</td>
                <td>{flight.departureDate}</td>
                <td>{flight.departureTime}</td>
                <td align="center">
                  <Button variant="primary">Podgląd</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="notFound">
          Nie znaleziono lotów odpowiadających kryteriom
        </div>
      )}
    </>
  );
};

export default FlighsTable;
