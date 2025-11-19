import React from 'react';
import ClasesAlumno from '../components/ClasesAlumno.tsx';

const MyClassesPage: React.FC = () => {
  return (
    <div>
      {/* Otros elementos de la página del alumno, como un menú de navegación */}
      <ClasesAlumno />
      {/* Más contenido */}
    </div>
  );
};

export default MyClassesPage;