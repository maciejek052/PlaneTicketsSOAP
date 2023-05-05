import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FlightService from "../../services/FlightService";
import ReservationService from "../../services/ReservationService";
import IReservation from "../../types/Reservation";
import { ReservationCard } from "./ReservationCard";
import { Button } from "react-bootstrap";
import "../../styles/reservation.css";

export const Reservation = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get("id");
  const [reservationInfo, setReservationInfo] = useState({} as IReservation);
  const [seatsInfo, setSeatsInfo] = useState([] as string[]);
  const [reservationFetched, setReservationFetched] = useState(false);
  const [seatsFetched, setSeatsFetched] = useState(false);

  useEffect(() => {
    fetchReservationInfo();
    fetchSeats();
  }, [reservationFetched, seatsFetched, search]);

  const fetchReservationInfo = async () => {
    const reservation = await ReservationService.getReservation(id!);
    setReservationInfo(reservation!);
    setReservationFetched(Boolean(reservation));
    // console.log(reservation);
  };

  const fetchSeats = async () => {
    if (reservationFetched) {
      const seats = await FlightService.getOccupiedSeats(
        reservationInfo.flight.ID
      );
      setSeatsInfo(seats!);
      setSeatsFetched(true);
      //console.log(seatsInfo);
    }
  };

  return (
    <div>
      {reservationFetched && seatsFetched ? (
        <>
          <ReservationCard reservation={reservationInfo} seats={seatsInfo} />
        </>
      ) : (
        <div className="notFound">Brak rezerwacji o podanym numerze</div>
      )}
    </div>
  );
};
