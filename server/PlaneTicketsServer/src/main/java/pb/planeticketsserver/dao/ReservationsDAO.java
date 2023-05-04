/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pb.planeticketsserver.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import pb.planeticketsserver.Airport;
import pb.planeticketsserver.Flight;
import pb.planeticketsserver.Reservation;

/**
 *
 * @author macie
 */
public class ReservationsDAO {

    private final String url = "jdbc:derby://localhost:1527/sample";
    private final String user = "app";
    private final String password = "app";

    public int addReservation(int flightID, String seats, String name) throws SQLException {
        int generatedID = -1;
        String query = "INSERT INTO RESERVATION (FLIGHTID, SEATS, PERSON) VALUES (?, ?, ?)";
        String[] generatedColumns = {"RESERVATIONID"};
        Connection conn = DriverManager.getConnection(url, user, password);
        PreparedStatement stmt = conn.prepareStatement(query, generatedColumns);
        stmt.setInt(1, flightID);
        stmt.setString(2, seats);
        stmt.setString(3, name);
        int rowsAffected = stmt.executeUpdate();
        if (rowsAffected > 0) {
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                generatedID = rs.getInt(1);
                System.out.println("New reservation with ID " + generatedID);
            }
        }
        return generatedID;
    }

    public Reservation getReservationWithID(int reservationID) throws SQLException {
        String query = "SELECT * FROM RESVIEW WHERE ID=" + reservationID;
        Reservation reservation = new Reservation();
        Connection conn = DriverManager.getConnection(url, user, password);
        PreparedStatement stmt = conn.prepareStatement(query);
        
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            Flight flight = new Flight();
            flight.setDepartureAirport(new Airport(rs.getString("depname"), rs.getString("departure_airport")));
            flight.setDestinationAirport(new Airport(rs.getString("arrname"), rs.getString("destination_airport")));
            flight.setDepartureDate(rs.getString("departure_date"));
            flight.setTime(rs.getString("departure_time"));
            flight.setID(rs.getInt("flightid"));
            reservation.setFlight(flight);
            reservation.setName(rs.getString("person"));
            reservation.setSeats(rs.getString("seats"));
            reservation.setId(rs.getInt("ID"));
        }
        return reservation; 
    }
}
