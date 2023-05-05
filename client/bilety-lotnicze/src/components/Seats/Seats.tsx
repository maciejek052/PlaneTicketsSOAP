// chatgpt wrote most of it lmao
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/seats.css";

interface SeatsProps {
  occupiedSeats: string[];
  selected: string[];
  clickable: boolean;
  onData: any;
}

export const Seats = ({
  occupiedSeats,
  selected,
  clickable,
  onData,
}: SeatsProps) => {
  const [selectedSeats, setSelectedSeats] = useState(selected as string[]);
  const [unavailableSeats, setUnavailableSeats] = useState(
    occupiedSeats as string[]
  );

  useEffect(() => {
    setSelectedSeats(selected);
    setUnavailableSeats(occupiedSeats);
  }, [occupiedSeats]); 

  useEffect(() => {
    onData(selectedSeats);
  }, [selectedSeats]);

  const handleSeatClick = (seat: string) => {
    if (clickable) {
      if (unavailableSeats.includes(seat)) return;
      if (selectedSeats.includes(seat)) {
        setSelectedSeats((seats) => seats.filter((s) => s !== seat));
      } else {
        setSelectedSeats((seats) => [...seats, seat]);
      }
    }
  };

  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E", "F"];
    const cols = ["1","2","3","4","5","6","7","8","9","10","11","12", "13","14","15"];
    return rows.map((row, index) => (
      <React.Fragment key={row}>
        <Row>
          <Col className="seat">{row}</Col>
          {cols.map((col) => {
            const seat = `${col}${row}`;
            let seatClass = "seat";
            if (selectedSeats.includes(seat)) {
              seatClass += " reserved";
            } else if (unavailableSeats.includes(seat)) {
              seatClass += " unavailable";
            } else {
              seatClass += " available";
            }
            return (
              <Col
                key={seat}
                className={seatClass}
                onClick={() => handleSeatClick(seat)}
              >
                <div className="seat-label">{col}</div>
              </Col>
            );
          })}
        </Row>
        {index === 2 && <div className="spacer" style={{ height: "20px" }} />}
      </React.Fragment>
    ));
  };
  const renderSelectedSeats = () => {
    if (selectedSeats.length === 0) {
      return <p>Brak wybranych miejsc</p>;
    }
    return (
      <div>
        <p>Wybrane miejsca: {selectedSeats.toString()}</p>
      </div>
    );
  };
  return (
    <Container>
      <Row>
        <Col>
          <div className="plane">
            <div className="section">{renderSeats()}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>{renderSelectedSeats()}</Col>
      </Row>
    </Container>
  );
};

export default Seats;
