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
*Nota*: si utiliza un monorepo indicar un solo link con fullstack app.

## Tema
### Descripción
Shanti Yoga es un estudio que ofrece clases semanales de distintos estilos de yoga, dictadas por profesionales certificados. Además, organiza talleres especiales sobre meditación, respiración, posturas y más. Los alumnos pueden inscribirse fácilmente desde la web, accediendo a reservas con pago online. El estudio cuenta con varios salones equipados y ofrece membresías flexibles. Los precios de los talleres varían según la actividad.

### Modelo
![DER-yoga-DER V2 drawio](https://github.com/user-attachments/assets/f7d90eab-58e2-4598-9293-c6a95e6eceef)

*Nota*: incluir un link con la imagen de un modelo, puede ser modelo de dominio, diagrama de clases, DER. Si lo prefieren pueden utilizar diagramas con [Mermaid](https://mermaid.js.org) en lugar de imágenes.

## Alcance Funcional 

### Alcance Mínimo

*Nota*: el siguiente es un ejemplo para un grupo de 3 integrantes para un sistema de hotel. El 

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
|CRUD |1. CRUD Usuarios<br>2. CRUD Salones<br>3. CRUD TiposMembresias<br>4. CRUD Dias<br>5. CRUD Horas<br>6. CRUD Membresia<br>7. CRUD Precios<br>8. CRUD Clases<br>9. CRUD Talleres<br>|
|CUU/Epic|1. Obtener una nueva membresía<br>2. Crear usuario<br>3. Inscribir a un taller<br>3. Realizar pago<br>4. Modificar Clase<br>5. Modificar Horarios|


### Alcance Adicional Voluntario

*Nota*: El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.

|Req|Detalle|
|:-|:-|
|Listados |1. Listado de tipos de membresías, muestra nombre de la membresía, beneficios, duración => detalle CRUD TiposMembresias<br>2. Reservas filtradas por cliente muestra datos del cliente y de cada reserve fechas, estado cantidad de habitaciones y huespedes|
|CUU/Epic|1. Consumir servicios<br>2. Cancelación de reserva|
|Otros|1. Envío de recordatorio de reserva por email|
