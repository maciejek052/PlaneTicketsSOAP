import axios from 'axios'
import { xml2js } from 'xml-js'
import IReservation from '../types/Reservation'
import IFlight from '../types/Flight'
import IAirport from '../types/Airport'

const addReservation = async (reservation: any) => {
  const req = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.planeticketsserver.pb/">
    <soapenv:Header/>
    <soapenv:Body>
         <ws:newReservation>
            <arg0>${reservation.flight}</arg0>
            <arg1>${reservation.seats}</arg1>
            <arg2>${reservation.name}</arg2>
         </ws:newReservation>
    </soapenv:Body>
    </soapenv:Envelope>`
  try {
    const response = await axios.post(
      'http://localhost:8080/PlaneTicketsServer/ReservationWSService?WSDL',
      req,
      { headers: { 'Content-Type': 'text/xml' } }
    )
    const xml = xml2js(response.data as string, {
      compact: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreComment: true,
      ignoreAttributes: false,
      ignoreDoctype: true
    })
    // @ts-expect-error: Type 'unknown' has no property 'length'
    let ar = xml['S:Envelope']['S:Body']['ns2:newReservationResponse']['return']
    if (!Array.isArray(ar)) {
      ar = [].concat(ar)
    }
    return ar[0]._text
  } catch (e) {
    console.log(e)
  }
}

const getReservation = async (id: string) => {
  const req = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.planeticketsserver.pb/">
  <soapenv:Header/>
  <soapenv:Body>
       <ws:getReservation>
          <arg0>${id}</arg0>
       </ws:getReservation>
  </soapenv:Body>
  </soapenv:Envelope>`
  try {
    const response = await axios.post(
      'http://localhost:8080/PlaneTicketsServer/ReservationWSService?WSDL',
      req,
      { headers: { 'Content-Type': 'text/xml' } }
    )
    const xml = xml2js(response.data as string, {
      compact: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreComment: true,
      ignoreAttributes: false,
      ignoreDoctype: true
    })
    // @ts-expect-error: Type 'unknown' has no property 'length'
    let ar = xml['S:Envelope']['S:Body']['ns2:getReservationResponse']['return']
    if (!Array.isArray(ar)) {
      ar = [].concat(ar)
    }
    const depAirport: IAirport = {
      name: ar[0].flight.departureAirport.name._text,
      code: ar[0].flight.departureAirport.code._text
    }
    const arrAirport: IAirport = {
      name: ar[0].flight.destinationAirport.name._text,
      code: ar[0].flight.destinationAirport.code._text
    }
    const flight: IFlight = {
      ID: ar[0].flight.ID._text,
      departureAirport: depAirport,
      arrivalAirport: arrAirport,
      departureTime: ar[0].flight.time._text,
      departureDate: ar[0].flight.departureDate._text
    }
    const obj: IReservation = {
      ID: ar[0].id._text,
      seats: ar[0].seats._text,
      name: ar[0].name._text,
      flight: flight
    }
    return obj
  } catch (e) {
    console.log(e)
  }
}

const getReservationConfirmation = async (id: string) => {

  const response = await axios.post(
    'http://localhost:8080/PlaneTicketsServer/ReservationWSService?WSDL',
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.planeticketsserver.pb/">\
      <soapenv:Header/>\
      <soapenv:Body>\
        <ws:downloadPDF>\
          <arg0>${id}</arg0>\
        </ws:downloadPDF>\
      </soapenv:Body>\
    </soapenv:Envelope>`,
    {
      headers: { 'Content-Type': 'text/xml' }
    },
  );
  const xml = xml2js(response.data as string, {
    compact: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreComment: true,
    ignoreAttributes: false,
    ignoreDoctype: true
  })
  // @ts-expect-error: Type 'unknown' has no property 'length'
  const pdf = xml['S:Envelope']['S:Body']['ns2:downloadPDFResponse']['return']._text
  return pdf
}


const ReservationService = {
  addReservation,
  getReservation,
  getReservationConfirmation
}

export default ReservationService
