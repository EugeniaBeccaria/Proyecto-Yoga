    import "../../styles/Clases.css"; 

    function ClasesPage() {
    


    return (
        <main className="clases">
        <h1 className="titulo-clases">Calendario de Clases</h1>
        <p className="tableDescription">
        Seleccioná el nombre de la clase a la que querés asistir y hacé clic en el botón <strong>“Agregar”</strong> para sumarla a tu carrito. Una vez agregada,
        podrás ver el detalle antes de confirmar tu inscripción.
        </p>

            <section id="clases" className="clases">
                <table>
                    <thead>
                        <tr>
                            <th>HORA</th>
                            <th>LUNES</th>
                            <th>MARTES</th>
                            <th>MIÉRCOLES</th>
                            <th>JUEVES</th>
                            <th>VIERNES</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="horario">07:00 a 08:00</td>
                        <td className="horario-dia">
                            <span className="clase fuerte">Respira y Fluye</span>
                            <span className="clase">Fuerza Interior</span>
                            <span className="clase fuego">Fuego Interior</span>
                        </td>

                        <td>
                            <span className="clase fuerte">Respira y Fluye</span>
                            <span className="clase">Fuerza Interior</span>
                        </td>

                        <td>
                            <span className="clase fuerte">Respira y Fluye</span>
                            <span className="clase">Fuerza Interior</span>
                            <span className="clase fuego">Fuego Interior</span>
                        </td>

                        <td>
                            <span className="clase fuerte">Respira y Fluye</span>
                            <span className="clase">Fuerza Interior</span>
                        </td>

                        <td>
                            <span className="clase fuerte">Respira y Fluye</span>
                            <span className="clase">Fuerza Interior</span>
                            <span className="clase fuego">Fuego Interior</span>
                        </td>
                    </tr>

                    <tr>
                        <td className="horario">08:00 a 09:00</td>
                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        </td>

                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        <span className="clase fuego">Fuego Interior</span>
                        </td>

                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        </td>

                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        <span className="clase fuego">Fuego Interior</span>
                        </td>

                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        </td>
                    </tr>

                    <tr>
                        <td className="horario">09:00 a 10:00</td>
                        <td></td>

                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        </td>

                        <td></td>

                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        </td>

                        <td></td>
                    </tr>

                    <tr>
                        <td className="horario">10:00 A 11:00</td>
                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        </td>

                        <td></td>

                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        </td>

                        <td></td>

                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        </td>
                    </tr> 

                    <tr>
                        <td className="horario">11:00 A 12:00</td>
                        <td></td>

                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        </td>

                        <td></td>

                        <td>
                        <span className="clase fuerte">Respira y Fluye</span>
                        <span className="clase">Fuerza Interior</span>
                        </td>

                        <td></td>
                        </tr>
                    </tbody>
                </table>
                </section>

        </main>
    );
    }
    export default ClasesPage;

