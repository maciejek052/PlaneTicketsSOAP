import axios from 'axios'
import IAirport from '../types/Airport'
import { xml2js } from 'xml-js'
import IFlight from '../types/Flight'

const getFlights = async (from: string, to: string, date: string) => {
  const req = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.planeticketsserver.pb/">\
  <soapenv:Header/>\
  <soapenv:Body>\
     <ws:searchFlights>\
     ${from ? `<arg0>${from}</arg0>` : ''}\
     ${to ? `<arg1>${to}</arg1>` : ''}\
     ${date ? `<arg2>${date}</arg2>` : ''}
     </ws:searchFlights>\
  </soapenv:Body>\
</soapenv:Envelope>`

  try {
    const response = await axios.post(
      'http://localhost:8080/PlaneTicketsServer/FlightsWSService?WSDL',
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
    let ar = xml['S:Envelope']['S:Body']['ns2:searchFlightsResponse']['return']
    if (!Array.isArray(ar)) {
      ar = [].concat(ar)
    }
    const flights: IFlight[] = ar.map((flightData: any) => ({
      departureAirport: {
        name: flightData.departureAirport.name._text,
        code: flightData.departureAirport.code._text
      },
      arrivalAirport: {
        name: flightData.destinationAirport.name._text,
        code: flightData.destinationAirport.code._text
      },
      departureDate: flightData.departureDate._text,
      departureTime: flightData.time._text,
      ID: Number(flightData.ID._text)
    }))

    return flights
  } catch (e) {
    console.log(e)
  }
}
const getOccupiedSeats = async (flightID: number) => {
  const req = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.planeticketsserver.pb/">\
  <soapenv:Header/>\
  <soapenv:Body>\
      <ws:getOccupiedSeats >\
          <arg0>${flightID}</arg0>\
      </ws:getOccupiedSeats >\
  </soapenv:Body>\
</soapenv:Envelope>`
  try {
    const response = await axios.post(
      'http://localhost:8080/PlaneTicketsServer/FlightsWSService?WSDL',
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
    let ar = xml['S:Envelope']['S:Body']['ns2:getOccupiedSeatsResponse']['return']
    if (!Array.isArray(ar)) {
      ar = [].concat(ar)
    }
    const list: string[] = [];
    for (const obj of ar) {
      const text = obj._text
      const strings = JSON.parse(text)
      list.push(...strings)
    } 
    return list
  } catch (e) {
    console.log(e)
  }
}

const AirportService = {
  getFlights,
  getOccupiedSeats
}

export default AirportService
