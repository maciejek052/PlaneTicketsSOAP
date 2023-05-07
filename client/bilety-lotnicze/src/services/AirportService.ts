import axios from 'axios'
import IAirport from '../types/Airport'
import { xml2js } from 'xml-js'
import https from 'https'



const getAllAirports = async () => {
  try {
    const response = await axios.post(
      'https://localhost:8181/PlaneTicketsServer/AirportsWSService?WSDL',
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.planeticketsserver.pb/">\
  <soapenv:Header/>\
  <soapenv:Body>\
     <ws:getAllAirports/>\
  </soapenv:Body>\
  </soapenv:Envelope>',
      {
        headers: {
          'Content-Type': 'text/xml',
          'Authorization': 'Basic dXNlcjpxd2VydHkx' // user:qwerty1
        }
      }
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
    const ar = xml['S:Envelope']['S:Body']['ns2:getAllAirportsResponse']['return']
    const airportsTyped: IAirport[] = ar.map(
      (ar: { name: { _text: string }; code: { _text: string } }) => ({
        name: ar.name._text,
        code: ar.code._text
      })
    )
    return airportsTyped
  } catch (e) {
    console.log(e)
  }
}

const AirportService = {
  getAllAirports
}

export default AirportService
