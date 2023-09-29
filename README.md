# PROYECTO FINAL LEANDRO BILONI
 Proyecto final de conexión de API Node.js con base de datos MySql para el curso de Backend de Argentina Programa 4.0.


# API de Películas con Node.js, Express, Sequelize y MySql
 Esta API cuenta solamente con métodos GET para consultar el catálogo de películas guardado en la base de datos.

# Diseño de la base de datos
![sparkles](misc/TRAILERFLIX%20DESIGN.png)

## Archivo `.env`
### Configuración
```plaintext
PORT = 3000
DATABASE = trailerflix
DBUSER = user(default: root)
PASSWORD = mysql_password
HOST = localhost
```

## Endpoints
Endpoints disponibles:
| Método HTTP | Endpoint                     | Descripción                                          |
|-------------|------------------------------|------------------------------------------------------|
| GET         | /categories                  | Obtiene la lista de categorías.                      |
| GET         | /genres                      | Obtiene la lista de géneros.                         |
| GET         | /catalog                     | Obtiene todo el catálogo de películas.               |
| GET         | /catalog/id/:id              | Obtiene una película por su ID.                      |
| GET         | /catalog/name/:name          | Obtiene películas por su nombre o parte del nombre.  |
| GET         | /catalog/genre/:genre        | Obtiene películas por su género.                     |
| GET         | /catalog/category/:category  | Obtiene películas por su categoría.                  |

### Categorías
#### Listar todas las categorías

- **URL**: `/api/categories`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
        {
            "categoryID": 7,
            "categoryName": "Película"
        },
        {
            "categoryID": 1,
            "categoryName": "Serie"
        }
    ]
    ```

### Géneros
#### Listar todos los géneros

- **URL**: `/api/genres`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
        {
            "genreID": 76,
            "genreName": "¿Ficción?"
        },
        {
            "genreID": 21,
            "genreName": "Acción"
        }
    ]
    ```

### Catálogo
#### Listar todas las películas

- **URL**: `/api/catalog`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
        {
            "movieID": 1,
            "poster": "http://localhost:3000/posters/3.jpg",
            "title": "The Mandalorian",
            "category": "Serie",
            "genre": "Ciencia Ficción,Fantasía",
            "summary": "Ambientada tras la caída del Imperio y antes de la aparición de la Primera Orden, la serie sigue los pasos de un pistolero solitario en las aventuras que protagoniza en los confines de la galaxia, donde no alcanza la autoridad de la Nueva República.",
            "seasons": "2",
            "moviecast": "Carl Weathers,Chris Bartlett,Giancarlo Esposito,Misty Rosas,Pedro Pascal,Rio Hackford",
            "trailer": "https://www.youtube.com/embed/aOC8E8z_ifw"
        },
        {
            "movieID": 2,
            "poster": "http://localhost:3000/posters/4.jpg",
            "title": "The Umbrella Academy",
            "category": "Serie",
            "genre": "Ciencia Ficción,Fantasía",
            "summary": "La muerte de su padre reúne a unos hermanos distanciados y con extraordinarios poderes que descubren impactantes secretos y una amenaza que se cierne sobre la humanidad.",
            "seasons": "1",
            "moviecast": "Aidan Gallagher,David Castañeda,Elliot Page,Emmy Raver-Lampman,Robert Sheehan,Tom Hopper",
            "trailer": null
        }
    ]
    ```
#### Obtener una película por ID

- **URL**: `/api/catalog/id/:id`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
        {
            "movieID": 1,
            "poster": "http://localhost:3000/posters/3.jpg",
            "title": "The Mandalorian",
            "category": "Serie",
            "genre": "Ciencia Ficción,Fantasía",
            "summary": "Ambientada tras la caída del Imperio y antes de la aparición de la Primera Orden, la serie sigue los pasos de un pistolero solitario en las aventuras que protagoniza en los confines de la galaxia, donde no alcanza la autoridad de la Nueva República.",
            "seasons": "2",
            "moviecast": "Carl Weathers,Chris Bartlett,Giancarlo Esposito,Misty Rosas,Pedro Pascal,Rio Hackford",
            "trailer": "https://www.youtube.com/embed/aOC8E8z_ifw"
        }
    ]
    ```

#### Obtener películas por su nombre (o parte del nombre)

- **URL**: `/api/catalog/name/:name`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
        {
            "movieID": 1,
            "poster": "http://localhost:3000/posters/3.jpg",
            "title": "The Mandalorian",
            "category": "Serie",
            "genre": "Ciencia Ficción,Fantasía",
            "summary": "Ambientada tras la caída del Imperio y antes de la aparición de la Primera Orden, la serie sigue los pasos de un pistolero solitario en las aventuras que protagoniza en los confines de la galaxia, donde no alcanza la autoridad de la Nueva República.",
            "seasons": "2",
            "moviecast": "Carl Weathers,Chris Bartlett,Giancarlo Esposito,Misty Rosas,Pedro Pascal,Rio Hackford",
            "trailer": "https://www.youtube.com/embed/aOC8E8z_ifw"
        },
        {
            "movieID": 2,
            "poster": "http://localhost:3000/posters/4.jpg",
            "title": "The Umbrella Academy",
            "category": "Serie",
            "genre": "Ciencia Ficción,Fantasía",
            "summary": "La muerte de su padre reúne a unos hermanos distanciados y con extraordinarios poderes que descubren impactantes secretos y una amenaza que se cierne sobre la humanidad.",
            "seasons": "1",
            "moviecast": "Aidan Gallagher,David Castañeda,Elliot Page,Emmy Raver-Lampman,Robert Sheehan,Tom Hopper",
            "trailer": null
        }
    ]
    ```
    
#### Obtener películas por su género

- **URL**: `/api/catalog/genre/:genre`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
        {
            "movieID": 1,
            "poster": "http://localhost:3000/posters/3.jpg",
            "title": "The Mandalorian",
            "category": "Serie",
            "genre": "Ciencia Ficción,Fantasía",
            "summary": "Ambientada tras la caída del Imperio y antes de la aparición de la Primera Orden, la serie sigue los pasos de un pistolero solitario en las aventuras que protagoniza en los confines de la galaxia, donde no alcanza la autoridad de la Nueva República.",
            "seasons": "2",
            "moviecast": "Carl Weathers,Chris Bartlett,Giancarlo Esposito,Misty Rosas,Pedro Pascal,Rio Hackford",
            "trailer": "https://www.youtube.com/embed/aOC8E8z_ifw"
        },
        {
            "movieID": 2,
            "poster": "http://localhost:3000/posters/4.jpg",
            "title": "The Umbrella Academy",
            "category": "Serie",
            "genre": "Ciencia Ficción,Fantasía",
            "summary": "La muerte de su padre reúne a unos hermanos distanciados y con extraordinarios poderes que descubren impactantes secretos y una amenaza que se cierne sobre la humanidad.",
            "seasons": "1",
            "moviecast": "Aidan Gallagher,David Castañeda,Elliot Page,Emmy Raver-Lampman,Robert Sheehan,Tom Hopper",
            "trailer": null
        }
    ]
    ```

#### Obtener películas por su categoría

- **URL**: `/api/catalog/category/:category`
- **Método**: `GET`
- **Respuesta Exitosa**:
  - **Código**: 200 OK
  - **Ejemplo de Respuesta**:

    ```json
    [
        {
            "movieID": 1,
            "poster": "http://localhost:3000/posters/3.jpg",
            "title": "The Mandalorian",
            "category": "Serie",
            "genre": "Ciencia Ficción,Fantasía",
            "summary": "Ambientada tras la caída del Imperio y antes de la aparición de la Primera Orden, la serie sigue los pasos de un pistolero solitario en las aventuras que protagoniza en los confines de la galaxia, donde no alcanza la autoridad de la Nueva República.",
            "seasons": "2",
            "moviecast": "Carl Weathers,Chris Bartlett,Giancarlo Esposito,Misty Rosas,Pedro Pascal,Rio Hackford",
            "trailer": "https://www.youtube.com/embed/aOC8E8z_ifw"
        },
        {
            "movieID": 2,
            "poster": "http://localhost:3000/posters/4.jpg",
            "title": "The Umbrella Academy",
            "category": "Serie",
            "genre": "Ciencia Ficción,Fantasía",
            "summary": "La muerte de su padre reúne a unos hermanos distanciados y con extraordinarios poderes que descubren impactantes secretos y una amenaza que se cierne sobre la humanidad.",
            "seasons": "1",
            "moviecast": "Aidan Gallagher,David Castañeda,Elliot Page,Emmy Raver-Lampman,Robert Sheehan,Tom Hopper",
            "trailer": null
        }
    ]
    ```


