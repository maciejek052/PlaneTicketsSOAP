/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pb.planeticketsserver;

import java.util.UUID;

/**
 *
 * @author macie
 */
public class Reservation {

    private UUID id;
    private Flight flight;
    private int[] seats;

    public Flight getFlight() {
        return flight;
    }

    public int[] getSeats() {
        return seats;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public void setSeats(int[] seats) {
        this.seats = seats;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

}
