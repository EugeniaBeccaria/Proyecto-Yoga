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
Shanti Yoga es un estudio que ofrece clases semanales y talleres presenciales de yoga, con inscripción online y membresías mensuales flexibles. Los alumnos gestionan sus clases y pagos desde una plataforma digital. El sistema fija las clases por mes, optimizando cupos, espacios y docentes. El estudio cuenta con salones equipados y una grilla horaria organizada. 
La operación se gestiona mediante un sistema que facilita la administración general del estudio.

### Modelo: Diagrama Entidad-Relación.
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
|CRUD |1. CRUD Usuarios<br>2. CRUD Salones<br>3. CRUD TiposMembresias<br>4. CRUD Dias<br>5. CRUD Horas<br>6. CRUD Membresia {depende de} CRUD TiposMembresia<br>7. CRUD Precios {depende de} CRUD TiposMembresias<br>8. CRUD Clases {depende de} CRUD Salones<br>9. CRUD Talleres<br>10. CRUD Alumnos<br>11. CRUD Profesores<br>12. CRUD Administradores |
|CUU/Epic|1. Obtener una nueva membresía<br>2. Crear usuario<br>3. Inscribir a un taller<br>3. Realizar pago<br>4. Modificar Clase<br>5. Modificar Horarios|


### Alcance Adicional Voluntario


|Req|Detalle|
|:-|:-|
|Listados |1. Listado de tipos de membresías, muestra nombre de la membresía, beneficios, duración => detalle CRUD TiposMembresias<br>2. Reservas filtradas por cliente muestra datos del cliente y de cada reserve fechas, estado cantidad de habitaciones y huespedes|
|Otros|1. Envío de mensaje de inscripción exitosa a una membresía o taller y su detalle por mail|
