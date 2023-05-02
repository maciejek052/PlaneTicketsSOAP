import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FlightService from "../../services/FlightService";
import FlighsTable from "../FlightsTable/FlighsTable";
import IFlight from "../../types/Flight";

export const SearchResults = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const dep = params.get("dep");
  const arr = params.get("arr");
  const date = params.get("date");
  const [flights, setFlights] = useState([] as IFlight[]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    const response = await FlightService.getFlights(dep!, arr!, date!);
    setFlights(response!)
  };

  return (
    <div>
      <FlighsTable flights={flights} />
    </div>
  );
};
