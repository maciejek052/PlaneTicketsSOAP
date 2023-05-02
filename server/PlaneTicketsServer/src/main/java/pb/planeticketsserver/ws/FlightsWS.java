/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pb.planeticketsserver.ws;

import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.jws.WebMethod;
import javax.jws.WebService;
import pb.planeticketsserver.Flight;

import pb.planeticketsserver.dao.FlightsDAO;

/**
 *
 * @author macie
 */
@WebService
public class FlightsWS {

    private final FlightsDAO flightsDAO = new FlightsDAO();

    @WebMethod
    public List<Flight> searchFlights(String from, String to, String date) {
        try {
            return flightsDAO.searchFlights(from, to, date);
        } catch (SQLException ex) {
            Logger.getLogger(FlightsWS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

}
