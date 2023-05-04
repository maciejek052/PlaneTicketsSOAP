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

    private int id;
    private Flight flight;
    private String seats;
    private String name;

    public Flight getFlight() {
        return flight;
    }

    public String getSeats() {
        return seats;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public void setSeats(String seats) {
        this.seats = seats;
    }

    public int getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setId(int id) {
        this.id = id;
    }

}
