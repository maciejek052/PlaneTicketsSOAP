import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/search.css";
import { Typeahead } from "react-bootstrap-typeahead";
import IAirport from "../../types/Airport";
import AirportService from "../../services/AirportService";
import { createSearchParams, useNavigate } from "react-router-dom";

export const Search = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [flightDate, setFlightDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [flightTime, setFlightTime] = useState("00:00");
  const [cities, setCities] = useState([] as IAirport[]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    const response = await AirportService.getAllAirports();
    setCities(response!);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({
      pathname: "/searchResults",
      search: createSearchParams({ 
        dep: departureAirport,
        arr: arrivalAirport,
        date: flightDate
      }).toString()
    });
  };

  return (
    <div>
      <Form className="FlightSearchForm">
        <div className="row">
          <Form.Group controlId="departureAirport" className="col-md">
            <Form.Label>Lotnisko odlotu</Form.Label>
            <Typeahead
              id="departureAirport"
              placeholder="Wpisz nazwę lub kod lotniska"
              onChange={(selected) => {
                {
                  // @ts-expect-error: Typeahead is not typed properly
                  selected[0] && setDepartureAirport(selected[0].code);
                }
              }}
              options={cities}
              labelKey={(option) =>
                `${(option as IAirport).name} (${(option as IAirport).code})`
              }
            />
          </Form.Group>

          <Form.Group controlId="arrivalAirport" className="col-md">
            <Form.Label>Lotnisko przylotu</Form.Label>
            <Typeahead
              id="arrivalAirport"
              placeholder="Wpisz nazwę lub kod lotniska"
              onChange={(selected) => {
                {
                  // @ts-expect-error: Typeahead is not typed properly
                  selected[0] && setArrivalAirport(selected[0].code);
                }
                console.log(arrivalAirport);
              }}
              options={cities}
              labelKey={(option) =>
                `${(option as IAirport).name} (${(option as IAirport).code})`
              }
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

        <Button
          onClick={(event) => handleSearch(event as any)}
          variant="primary"
          type="submit"
          className="col-12"
        >
          Szukaj
        </Button>
      </Form>
    </div>
  );
};
