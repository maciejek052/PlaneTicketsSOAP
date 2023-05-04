/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pb.planeticketsserver.ws;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.jws.WebMethod;
import javax.jws.WebService;
import pb.planeticketsserver.Reservation;
import pb.planeticketsserver.dao.ReservationsDAO;
/**
 *
 * @author macie
 */
@WebService
public class ReservationWS {
    private final ReservationsDAO reservationsDAO = new ReservationsDAO(); 
    
    @WebMethod
    public int newReservation(int flightID, String seats, String name) {
        int generatedID = -1; 
        try {
            generatedID = reservationsDAO.addReservation(flightID, seats, name);
        } catch (SQLException ex) {
            Logger.getLogger(ReservationWS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return generatedID; 
    }
    @WebMethod
    public Reservation getReservation(int reservationID) {
        try { 
            return reservationsDAO.getReservationWithID(reservationID);
        } catch (SQLException ex) {
            Logger.getLogger(ReservationWS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
}
