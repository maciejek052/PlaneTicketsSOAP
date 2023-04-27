import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/search.css";
import mockCities from "../../mocks/cities.json";
import { Typeahead } from "react-bootstrap-typeahead";

export const Search = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [flightDate, setFlightDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [flightTime, setFlightTime] = useState("12:00");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      "departureAirport: " +
        departureAirport +
        ", arrivalAirport: " +
        arrivalAirport +
        ", flightDate: " +
        flightDate +
        ", flightTime: " +
        flightTime
    );
  };

  return (
    <Form className="FlightSearchForm" onSubmit={handleSubmit}>
      <div className="row">
        <Form.Group controlId="departureAirport" className="col-md">
          <Form.Label>Lotnisko odlotu</Form.Label>
          <Typeahead
            id="departureAirport"
            placeholder="Wpisz nazwę lub kod lotniska"
            onChange={(selected) => {
              {
                selected[0] && setDepartureAirport(selected[0].toString());
              }
              console.log(departureAirport);
            }}
            options={mockCities}
          />
        </Form.Group>

        <Form.Group controlId="arrivalAirport" className="col-md">
          <Form.Label>Lotnisko przylotu</Form.Label>
          <Typeahead
            id="arrivalAirport"
            placeholder="Wpisz nazwę lub kod lotniska"
            onChange={(selected) => {
              {
                selected[0] && setArrivalAirport(selected[0].toString());
              }
              console.log(arrivalAirport);
            }}
            options={mockCities}
          />
        </Form.Group>
      </div>

      <div className="row">
        <Form.Group controlId="flightDate" className="col-md">
          <Form.Label>Data lotu</Form.Label>
          <Form.Control
            type="date"
            placeholder="Wybierz datę"
            value={flightDate}
            onChange={(event) => setFlightDate(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="flightTime" className="col-md">
          <Form.Label>Godzina lotu</Form.Label>
          <Form.Control
            type="time"
            placeholder="Wybierz godzinę"
            value={flightTime}
            onChange={(event) => setFlightTime(event.target.value)}
          />
        </Form.Group>
      </div>

      <Button variant="primary" type="submit" className="col-12">
        Szukaj
      </Button>
    </Form>
  );
};
