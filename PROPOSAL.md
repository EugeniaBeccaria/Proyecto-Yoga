# Propuesta TP DSW

## Grupo
### Integrantes
* 52459 Zarah Massuh
* 52367 Manuel Casanovas
* 53241 Mercedes Giacolla
* 53559 Betiana Sebben
* 53275 Eugenia Beccaria


### Repositorios
* [frontend app](http://hyperlinkToGihubOrGitlab)
* [backend app](http://hyperlinkToGihubOrGitlab)

## Tema
### Descripción
Shanti Yoga es un estudio que ofrece clases semanales de distintos estilos de yoga, dictadas por profesionales certificados. Además, organiza talleres especiales sobre meditación, respiración, posturas y más. Los alumnos pueden inscribirse fácilmente desde la web, accediendo a reservas con pago online. El estudio cuenta con varios salones equipados y ofrece membresías flexibles. Los precios de los talleres varían según la actividad.

### Modelo
![DER-yoga-DER V2 drawio](https://github.com/user-attachments/assets/f7d90eab-58e2-4598-9293-c6a95e6eceef)


## Alcance Funcional 

### Alcance Mínimo


Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Usuarios<br>2. CRUD Salones<br>3. CRUD TiposMembresias<br>4. CRUD Dias<br>5. CRUD Horas|
|CRUD dependiente|1. CRUD Membresia {depende de} CRUD TiposMembresia<br>2. CRUD Precios {depende de} CRUD TiposMembresias<br>3. CRUD Clases {depende de} CRUD Salones|
|Listado<br>+<br>detalle| 1. Listado de membresías activas, muestra nombre del alumno, tipo de membresía y fecha de inicio => detalle muestra duración restante, estado de pago y acceso a clases.<br> 2. Listado de alumnos registrados inscriptos en una clase, muestra nombre, apellido, email y teléfono => detalle muestra los datos completos del alumno y la clase a la que está inscripto.|
|CUU/Epic|1. Obtener una nueva membresía<br>2. Crear usuario<br>3. Inscribir a un taller<br>3. Realizar pago|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Tipo Habitacion<br>2. CRUD Servicio<br>3. CRUD Localidad<br>4. CRUD Provincia<br>5. CRUD Habitación<br>6. CRUD Empleado<br>7. CRUD Cliente|
|CUU/Epic|1. Reservar una habitación para la estadía<br>2. Realizar el check-in de una reserva<br>3. Realizar el check-out y facturación de estadía y servicios|


### Alcance Adicional Voluntario


|Req|Detalle|
|:-|:-|
|Listados |1. Listado de tipos de membresías, muestra nombre de la membresía, beneficios, duración => detalle CRUD TiposMembresias<br>2. Reservas filtradas por cliente muestra datos del cliente y de cada reserve fechas, estado cantidad de habitaciones y huespedes|
|CUU/Epic|1. Consumir servicios<br>2. Cancelación de reserva|
|Otros|1. Envío de recordatorio de reserva por email|
