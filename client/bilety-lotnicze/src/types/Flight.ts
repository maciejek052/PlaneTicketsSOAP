import IAirport from "./Airport";

export default interface IFlight {
    departureAirport: IAirport;
    arrivalAirport: IAirport;
    departureDate: string;
    departureTime: string; 
    ID: number;
}