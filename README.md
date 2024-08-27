

## Description

Instructivo del Proyecto: Batalla de Pokémon

La Batalla de Pokémon es una aplicación web que permite a los usuarios seleccionar un Pokémon y enfrentarlo en una batalla contra otro Pokémon seleccionado aleatoriamente. La aplicación simula una batalla por turnos en la que los Pokémon atacan y defienden según sus estadísticas, y el ganador es determinado cuando el HP de uno de los Pokémon llega a cero.

Características Principales:
Backend: Desarrollado con NestJS y TypeORM, el backend maneja la lógica de la batalla, la gestión de Pokémon, y la persistencia de los datos en una base de datos SQLite.

Requisitos Previos
Node.js (versión 14 o superior) y npm.
Git (para clonar el repositorio).
SQLite (opcional, ya que SQLite es un sistema de base de datos ligero que se incluye por defecto).

Clonar el Repositorio
1. Abre una terminal y clona el repositorio en tu máquina local:
        git clone https://github.com/Santiagospecia/pokemon-battle-back.git
2. Navega al directorio del backend
        cd pokemon-battle-back
3. Instala las dependencias del backend
        npm install
4. Ejecutar el Backend
        npm run start
El servidor estará corriendo en http://localhost:3000.



5. Ejecutar Pruebas
Para ejecutar las pruebas unitarias del backend, navega al directorio del backend y ejecutar
        npm run test