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
import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;
import java.util.logging.Logger;
import pb.planeticketsserver.Airport;
import pb.planeticketsserver.Flight;

/**
 *
 * @author macie
 */
public class FlightsDAO {

    private final String url = "jdbc:derby://localhost:1527/sample";
    private final String user = "app";
    private final String password = "app";

    public List<Flight> searchFlights(String from, String to, String date) throws SQLException {
        String query = "SELECT * from SEARCHFLIGHTS";
        List<String> conditions = new ArrayList<>();
        if (from != null) {
            conditions.add("DEPARTURE_AIRPORT='" + from + "'");
        }
        if (to != null) {
            conditions.add("DESTINATION_AIRPORT='" + to + "'");
        }
        if (date != null) {
            conditions.add("DEPARTURE_DATE='" + date + "'");
        }
        if (!conditions.isEmpty()) {
            query += " WHERE " + String.join(" AND ", conditions);
        }
        System.out.println(query);
        List<Flight> flights = new ArrayList<>();
        Connection conn = DriverManager.getConnection(url, user, password);
        PreparedStatement stmt = conn.prepareStatement(query);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            Flight flight = new Flight();
            flight.setDepartureAirport(new Airport(rs.getString("depname"), rs.getString("departure_airport")));
            flight.setDestinationAirport(new Airport(rs.getString("arrname"), rs.getString("destination_airport")));
            flight.setDepartureDate(rs.getString("departure_date"));
            flight.setTime(rs.getString("departure_time"));
            flight.setID(rs.getInt("id"));
            flights.add(flight);
        }
        return flights;
    }
}
