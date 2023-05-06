/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pb.planeticketsserver.ws;

import com.lowagie.text.DocumentException;
import java.awt.Image;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.activation.DataHandler;
import javax.imageio.ImageIO;
import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.xml.ws.BindingType;
import javax.xml.ws.soap.MTOM;
import pb.planeticketsserver.PDFGenerator;
import pb.planeticketsserver.Reservation;
import pb.planeticketsserver.dao.ReservationsDAO;

/**
 *
 * @author macie
 */
@BindingType(value = javax.xml.ws.soap.SOAPBinding.SOAP11HTTP_MTOM_BINDING)
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
    
    @MTOM
    public byte[] downloadPDF(int reservationID) {
        PDFGenerator pdfGenerator = new PDFGenerator(); 
        try {
            try {
                return pdfGenerator.generatePdfFromHtml(reservationsDAO.getReservationWithID(reservationID));
            } catch (SQLException ex) {
                Logger.getLogger(ReservationWS.class.getName()).log(Level.SEVERE, null, ex);
            }
        } catch (DocumentException ex) {
            Logger.getLogger(ReservationWS.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(ReservationWS.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

}
