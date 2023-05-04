import React, { useState } from "react";
import IFlight from "../../types/Flight";
import "../../styles/flight.css";
import { Button, Form } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";
import ReservationService from "../../services/ReservationService";
interface Props {
  flight: IFlight;
  selectedSeats: string[];
}

export const ReservationConfirmation = ({ flight, selectedSeats }: Props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  console.log(flight, selectedSeats);

  const reserveFlight = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const reservation = {
      flight: flight.ID,
      seats: JSON.stringify(selectedSeats),
      name: name,
    };
    if (name) {
      const newReservation = await ReservationService.addReservation(
        reservation
      );
      navigate({
        pathname: "/reservation",
        search: createSearchParams({
          id: newReservation,
        }).toString(),
      });
    }
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
