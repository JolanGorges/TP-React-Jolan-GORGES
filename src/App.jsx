import './App.css';
import { Home, Login, Users, Conferences, Conference, CreateEditConference } from './pages';
import { Navbar, ProtectedRoute } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/conference/:conferenceId" element={<Conference />} />
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } />
        <Route path="/admin/conferences" element={
          <ProtectedRoute>
            <Conferences />
          </ProtectedRoute>
        } />
        <Route path="/admin/create-conference" element={
          <ProtectedRoute>
            <CreateEditConference />
          </ProtectedRoute>
        } />
        <Route path="/admin/edit-conference/:conferenceId" element={
          <ProtectedRoute>
            <CreateEditConference />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
