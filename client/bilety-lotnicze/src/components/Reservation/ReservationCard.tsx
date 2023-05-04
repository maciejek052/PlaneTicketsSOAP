import React from "react";
import IReservation from "../../types/Reservation";
import { Card, Button } from "react-bootstrap";
import "../../styles/flight.css";
import Seats from "../Seats/Seats";

interface Props {
  reservation: IReservation;
  seats: string[];
}

export const ReservationCard = ({ reservation, seats }: Props) => {
  console.log(reservation, seats);
  return (
    <div className="flightPreview">
      <Card className="text-center" bg="dark">
        <Card.Body>
          <Card.Title>Rezerwacja nr {reservation.ID}</Card.Title>
          <Card.Title>Imię i nazwisko: {reservation.name}</Card.Title>
          <Card.Text>
            Numer lotu: {reservation.flight.ID} <br />
            Miasto odlotu: {reservation.flight.departureAirport.name} (
            {reservation.flight.departureAirport.code}) <br />
            Miasto przylotu: {reservation.flight.arrivalAirport.name} (
            {reservation.flight.arrivalAirport.code}) <br />
            Data odlotu: {reservation.flight.departureDate} <br />
            Godzina odlotu: {reservation.flight.departureTime} <br />
          </Card.Text>
          <Seats
            occupiedSeats={seats}
            selected={JSON.parse(reservation.seats)}
            clickable={false}
            onData={() => null}
          />
        </Card.Body>
      </Card>
    </div>
  );
};
