import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "../../styles/flight.css";
import FlightService from "../../services/FlightService";
import Seats from "../Seats/Seats";
import { ReservationConfirmation } from "./ReservationConfirmation";

export const FlightPreview = () => {
  const navigate = useNavigate();
  const flight = useLocation().state.flight;
  const dateObj = new Date(flight.departureDate + "T" + flight.departureTime);
  const [occupiedSeats, setOccupiedSeats] = useState([] as string[]);
  const [fetched, setFetched] = useState(false);
  const [reservationDone, setReservationDone] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([] as string[]);
  const [isAvailable, setIsAvaliable] = useState(false);

  const handleSelectedSeats = (data: string[]) => {
    setSelectedSeats(data);
  };

  const getOccupiedSeats = async () => {
    const response = await FlightService.getOccupiedSeats(flight.ID);
    setOccupiedSeats(response!);
    setFetched(true);
  };

  useEffect(() => {
    getOccupiedSeats();
    checkDate();
  }, [flight]);

  const reserve = () => {
    if (selectedSeats.length > 0) {
      setReservationDone(true);
      setIsAvaliable(false);
    }
  };

  const checkDate = () => {
    setIsAvaliable(dateObj > new Date());
  };

  return (
    <div className="flightPreview">
      <Card className="text-center" bg="dark">
        <Card.Body>
          <Card.Title>Lot o numerze {flight.ID}</Card.Title>
          <Card.Text>
            Miasto odlotu: {flight.departureAirport.name} (
            {flight.departureAirport.code}) <br />
            Miasto przylotu: {flight.arrivalAirport.name} (
            {flight.arrivalAirport.code}) <br />
            Data odlotu: {flight.departureDate} <br />
            Godzina odlotu: {flight.departureTime} <br />
          </Card.Text>
          <br />
          {fetched && (
            <Seats
              occupiedSeats={occupiedSeats}
              selected={[]}
              clickable={isAvailable}
              onData={handleSelectedSeats}
            />
          )}
          {isAvailable && (
            <Button onClick={() => reserve()} variant="success">
              Przejdź do rezerwacji
            </Button>
          )}
          {dateObj < new Date() && (
            <div>Nie można zarezerwować lotu, ponieważ już się odbył</div>
          )}
          {reservationDone && (
            <ReservationConfirmation
              flight={flight}
              selectedSeats={selectedSeats}
            />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
