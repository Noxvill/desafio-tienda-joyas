# desafio-tienda-joyas
Desafío - Tienda de Joyas

# Las siguientes consultas se encuentran también en el archivo index.rest

### GET de todas las joyas del inventario
GET http://127.0.0.1:3000/joyas
Content-Type: application/json

### GET con limits, page, order_by & HATEOAS
GET http://127.0.0.1:3000/joyas?limits=3&order_by=stock_ASC&page=2
Content-Type: application/json

### GET CON FILTROS precio máximo, mínimo, categoría y metal:
GET http://localhost:3000/joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata
Content-Type: application/json



