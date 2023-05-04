import { useState } from "react";
import NavbarComponent from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flights } from "./components/Flights/Flights";
import { Search } from "./components/Search/Search";
import { Home } from "./components/Home/Home";
import { SearchResults } from "./components/Search/SearchResults";
import { FlightPreview } from "./components/FlightPreview/FlightPreview";
import { Reservation } from "./components/Reservation/Reservation";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div>
          <NavbarComponent />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allFlights" element={<Flights />} />
          <Route path="/search" element={<Search />} />
          <Route path="/searchResults" element={<SearchResults />} />
          <Route path="/flight" element={<FlightPreview />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
