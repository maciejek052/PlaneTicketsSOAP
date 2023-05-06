/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pb.planeticketsserver;

import com.lowagie.text.DocumentException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

/**
 *
 * @author macie
 */
public class PDFGenerator {

    private String parseThymeleafTemplate(Reservation reservation) {
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        templateResolver.setCharacterEncoding("UTF-8");
        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);
        Context context = new Context();
        
        String depAirport = reservation.getFlight().getDepartureAirport().airportToString();
        String arrAirport = reservation.getFlight().getDestinationAirport().airportToString();
        String seats = reservation.getSeats().replaceAll("[\\[\\]\\\"]", ""); 
        
        context.setVariable("reservationID", reservation.getId());
        context.setVariable("flightID", reservation.getFlight().getID());
        context.setVariable("departureAirport", depAirport);
        context.setVariable("arrivalAirport", arrAirport);
        context.setVariable("flightDate", reservation.getFlight().getDepartureDate());
        context.setVariable("flightTime", reservation.getFlight().getTime());
        context.setVariable("passengerName", reservation.getName());
        context.setVariable("seatNumber", seats);

        return templateEngine.process("thymeleaf_template", context);
    }

    public byte[] generatePdfFromHtml(Reservation reservation) throws DocumentException, IOException {
        
        ByteArrayOutputStream stream = new ByteArrayOutputStream(); 
        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocumentFromString(parseThymeleafTemplate(reservation));
        renderer.layout();
        renderer.createPDF(stream);
        stream.close();
        return stream.toByteArray(); 
    }

}
