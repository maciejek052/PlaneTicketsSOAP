/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pb.planeticketsserver.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import pb.planeticketsserver.Airport;

/**
 *
 * @author macie
 */
public class AirportsDAO {

    public List<Airport> getAllAirports() throws NamingException {

        InitialContext ctx = new InitialContext();
        DataSource ds = (DataSource) ctx.lookup("jdbc/sample");

        List<Airport> airports = new ArrayList<>();
        try (Connection conn = ds.getConnection(); 
                Statement stmt = conn.createStatement(); 
                ResultSet rs = stmt.executeQuery("SELECT * FROM airport")
                ) {
            while (rs.next()) {
                Airport airport = new Airport();
                airport.setCode(rs.getString("code"));
                airport.setName(rs.getString("name"));
                airports.add(airport);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return airports;
    }
}
