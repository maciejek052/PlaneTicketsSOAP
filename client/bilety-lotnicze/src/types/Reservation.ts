import IAirport from "./Airport";
import IFlight from "./Flight";

export default interface IReservation {
    ID: number;
    flight: IFlight;
    seats: string;
    name: string;
}