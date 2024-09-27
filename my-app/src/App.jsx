import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/dashboard/Navbar';
import Login from './Components/loginPage/Login';
import Project from './Components/dashboard/Project';
import Property from './Components/dashboard/Property';
import Events from './Components/dashboard/Events';
import Activities from './Components/dashboard/Activities';
import ContactLog from './Components/dashboard/Contactlog';
import Context from './Components/dashboard/Context';
import ProjectDetails from './Components/dashboard/ProjectDetails';
import ContextDetails from './Components/dashboard/ContextDetails';
import PropertyDetails from './Components/dashboard/PropertyDetails';
import EventsDetails from './Components/dashboard/EventsDetails';
import ActivityDetails from './Components/dashboard/ActivityDetails';
import ContactLogDetails from './Components/dashboard/ContactLogDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Routes>
        //routes are goes here......
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Navbar />}>
          <Route index element={<Project />} />
          <Route path="project">
            <Route index element={<Project />} />
            <Route path="projectdetail" element={<ProjectDetails />} />
          </Route>
          <Route path="context">
            <Route index element={<Context />} />
            <Route path="contextdetail" element={<ContextDetails />} />
          </Route>
          <Route path="property">
            <Route index element={<Property />} />
            <Route path="propertydetail" element={<PropertyDetails />} />
          </Route>
          <Route path="events">
          <Route index element={<Events />} />
          <Route path="eventsdetail" element={<EventsDetails />} />
          </Route>
          <Route path="activities">
          <Route index element={<Activities />} />
          <Route path="activitydetail" element={<ActivityDetails />} />
          </Route>
          <Route path="contact-log">
          <Route index element={<ContactLog />} />
          <Route path="contactlogdetail" element={<ContactLogDetails />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
