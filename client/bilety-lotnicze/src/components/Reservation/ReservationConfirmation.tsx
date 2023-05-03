import React, { useState } from "react";
import IFlight from "../../types/Flight";
import "../../styles/flight.css";
import { Button, Form } from "react-bootstrap";
interface Props {
  flight: IFlight;
  selectedSeats: string[];
}

export const ReservationConfirmation = ({ flight, selectedSeats }: Props) => {
  const [name, setName] = useState("");
  console.log(flight, selectedSeats);

  const reserveFlight = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log(name);
    };

  return (
    <div className="flightPreview">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Wpisz swoje imię i nazwisko</Form.Label>
          <Form.Control
            className="resInput"
            type="text"
            placeholder="Imię i nazwisko"
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>
        <Button
          onClick={(event) => reserveFlight(event as any)}
          variant="success"
          type="submit"
          className="resButton"
        >
          Zarezerwuj lot
        </Button>
      </Form>
    </div>
  );
};
