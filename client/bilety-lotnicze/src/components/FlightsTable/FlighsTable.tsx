import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import "../../styles/table.css";
import IFlight from "../../types/Flight";
import { useNavigate } from "react-router-dom";

interface FlightsTableProps {
  flights: IFlight[];
}

const FlighsTable = ({ flights }: FlightsTableProps) => {
  const navigate = useNavigate();

  const [flightsState, setFlightsState] = useState(flights as IFlight[]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState<keyof IFlight>("ID");

  useEffect(() => {
    setFlightsState(flights);
  }, [flights]);

  const sort = (key: keyof IFlight) => {
    const direction = sortKey === key ? (sortDirection === "asc" ? "desc" : "asc") : "asc";
    setSortDirection(direction);
    setSortKey(key);
    const sortedFlights = flightsState.sort((a, b) => {
      const compareValue = a[key] > b[key] ? 1 : -1;
      return direction === "asc" ? compareValue : -compareValue;
    });
    setFlightsState(sortedFlights);
  };

  const goToFlight = (flight: IFlight) => {
    navigate("/flight", { state: { flight } });
  };

  return (
    <>
      {flights ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th onClick={() => sort("ID")}>ID</th>
              <th onClick={() => sort("departureAirport")}>Lotnisko odlotu</th>
              <th onClick={() => sort("arrivalAirport")}>Lotnisko przylotu</th>
              <th onClick={() => sort("departureDate")}>Dzień</th>
              <th onClick={() => sort("departureTime")}>Godzina</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {flightsState.map((flight) => (
              <tr key={flight.ID}>
                <td>{flight.ID}</td>
                <td>{flight.departureAirport.name + " (" + flight.departureAirport.code + ")"}</td>
                <td>{flight.arrivalAirport.name + " (" + flight.arrivalAirport.code + ")"}</td>
                <td>{flight.departureDate}</td>
                <td>{flight.departureTime}</td>
                <td align="center">
                  <Button onClick={() => goToFlight(flight)} variant="primary">Podgląd</Button>
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
