# Propuesta TP DSW

## Grupo
### Integrantes
* 52459 Zarah Massuh
* 52367 Manuel Casanovas
* 53241 Mercedes Giacolla
* 53559 Betiana Sebben
* 53275 Eugenia Beccaria


### Repositorio
* [fullstack app](https://github.com/EugeniaBeccaria/Proyecto-Yoga)

## Tema
### Descripción
Shanti Yoga es un estudio que ofrece clases semanales y talleres presenciales de yoga, con inscripción online y membresías mensuales flexibles. Los alumnos gestionan sus clases y pagos desde una plataforma digital. El sistema fija las clases por mes, optimizando cupos, espacios y docentes. El estudio cuenta con salones equipados y una grilla horaria organizada. 
La operación se gestiona mediante un sistema que facilita la administración general del estudio.

### Modelo: Diagrama Entidad-Relación.
<img width="826" height="744" alt="image" src="https://github.com/user-attachments/assets/05cf4216-6e21-4af5-80c6-075a419de085" />


## Alcance Funcional 

### Alcance Mínimo


Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD User<br>2. CRUD Room<br>3. CRUD MembershipType<br>4. CRUD Class<br>5. CRUD Taller|
|CRUD dependiente|1. CRUD Membership {depende de} CRUD MembershipType<br>2. CRUD MembershipPrice {depende de} CRUD MembershipType<br>3. CRUD Class {depende de} CRUD Room|
|Listado<br>+<br>detalle|1. Listado de membresías activas, muestra nombre del alumno, tipo de membresía y fecha de inicio => detalle muestra duración restante, estado de pago y clases a las que está inscripto.<br>2. Listado de clases para un profesor determinado, muestra nombre de la clase, fecha, hora, salón y cantidad de inscriptos => detalle muestra los datos de los alumnos.|
|CUU/Epic|1. Inscribirse una nueva membresía<br>2. Crear usuario<br>3. Inscribir a un taller<br>4. Crear clases|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Room<br>2. CRUD MembershipType<br>3. CRUD Day<br>4. CRUD Time<br>5. CRUD Membership<br>6. CRUD MembershipPrice<br>7. CRUD Taller<br>8. CRUD Class<br>9. CRUD User<br>
|CUU/Epic|1. Obtener una nueva membresía<br>2. Crear usuario<br>3. Inscribir a un taller<br>4. Realizar pago<br>5. Modificar Clase<br>6. Modificar Horarios|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados |1. Listado de talleres programados, muestra nombre del taller, nombre del profesor, fecha, hora y salón asignado => detalle muestra el listado de alumnos inscriptos.<br>2. Listado de clases programadas, muestra nombre de la clase, fecha, hora, nombre del profesor y salón asignado => detalle muestra el listado de alumnos inscriptos.|
|Otros|1. Envío de mensaje de inscripción exitosa a una clase o taller y su detalle por mail|
