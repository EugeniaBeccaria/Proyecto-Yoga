import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import CreateClassPage from './pages/admin/CreateClassPage.tsx';
import { DeleteClassPage } from './pages/admin/DeleteClassPage.tsx';
import CreateTallerPage from './pages/admin/CreateTallerPage.tsx';
import MembershipPage from './pages/admin/MembershipPage.tsx';
import PrivateRoutes from './components/PrivateRoutes.tsx';
import AdminRoutes from './components/AdminRoutes.tsx';
import MyClassesPage from './pages/MyClassesPage.tsx';
import ProfessorRoutes from './components/professorRoutes.tsx';
import ProfessorDashboardPage from './pages/professor/professorDashboardPage.tsx';
import ClasesPage from './pages/user/ClasesPage.tsx';
import TalleresPage from './pages/user/TalleresPage.tsx';
import MyMembershipPage from "./pages/user/MyMembershipPage.tsx";
import CreateProfesorPage from './pages/admin/CreateProfesorPage.tsx';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/clases" element={<ClasesPage />} />
        <Route path="/talleres" element={<TalleresPage />} />
        <Route path="/MembershipPage" element={<MyMembershipPage />} />

        <Route
          path="/MyClassesPage"
          element={
            <PrivateRoutes>
              <MyClassesPage />
            </PrivateRoutes>
          }
        />

        <Route
          path="/CreateClassPage"
          element={
            <AdminRoutes>
              <CreateClassPage />
            </AdminRoutes>
          }
        />

        <Route
          path="/DeleteClassPage"
          element={
            <AdminRoutes>
              <DeleteClassPage />
            </AdminRoutes>
          }
        />

        <Route
          path="/CreateTallerPage"
          element={
            <AdminRoutes>
              <CreateTallerPage />
            </AdminRoutes>
          }
        />

        <Route
          path="/MembershipPage"
          element={
            <AdminRoutes>
              <MembershipPage />
            </AdminRoutes>
          }
        />

        <Route
          path="/CreateProfesorPage"
          element={
            <AdminRoutes>
              <CreateProfesorPage />
            </AdminRoutes>
          }
        />

        <Route
          path="/professor/dashboard"
          element={
            <ProfessorRoutes>
              <ProfessorDashboardPage />
            </ProfessorRoutes>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;