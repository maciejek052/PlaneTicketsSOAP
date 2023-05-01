/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pb.planeticketsserver.ws;

import java.util.List;
import javax.jws.WebMethod;
import javax.jws.WebService;
import pb.planeticketsserver.Airport;
import pb.planeticketsserver.dao.AirportsDAO;

/**
 *
 * @author macie
 */
@WebService
public class AirportsWS {

    private final AirportsDAO airportsDAO = new AirportsDAO();

    @WebMethod
    public List<Airport> getAllAirports() {
        return airportsDAO.getAllAirports();
    }

}
