import { BrowserRouter, Routes, Route } from "react-router-dom";
import MockInterview from "./Pages/MockInterview";
import Dashboard from "./Pages/Dashboard";

const Dummy = ({ name }) => <h1 style={{textAlign:"center"}}>{name}</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MockInterview />} />

        <Route path="/upload" element={<Dummy name="Resume Upload" />} />
        <Route path="/prep" element={<Dummy name="Placement Prep" />} />
        <Route path="/mock" element={<MockInterview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/progress" element={<Dummy name="Progress Tracker" />} />
        <Route path="/career" element={<Dummy name="Career Guidance" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;