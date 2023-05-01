/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pb.planeticketsserver;

import java.util.Date;

/**
 *
 * @author macie
 */
public class Flight {
    private Airport departureAirport; 
    private Airport destinationAirport;
    private Date departureDate;
        
    public Airport getDepartureAirport() {
        return departureAirport;
    }

    public Airport getDestinationAirport() {
        return destinationAirport;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureAirport(Airport departureAirport) {
        this.departureAirport = departureAirport;
    }

    public void setDestinationAirport(Airport destinationAirport) {
        this.destinationAirport = destinationAirport;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }
    
}
