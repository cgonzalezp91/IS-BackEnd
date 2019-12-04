# SIP-BackEnd

Sistema Integral Proeci, desarrollo Back-End hecho con la ayuda de Node, Express, jwt y MSSQL para la comunicación a la DB.

## Project setup || Instalación de Dependencias
```
npm install
```

### Compiles and hot-reloads for development || Compilación para entorno de desarrollo
Complicación con Nodemon e --inspect para poder debugear con la ayuda del navegador Google Chrome.
Esto también omite el iniciar usando el SSL debido a la variable de entorno por lo tanto no se utiliza el https ya que este es solo para producción.
```
npm run dev
```

### Compiles and start in production || Compilación y ejecucion para producción
Complicación para ejecutar el desarrollo en entorno de producción, esto pone la variable de entorno de NODE NODE_ENV=production
Al poner la variable de entorno en producción este hace que inicie con https utilizando el puerto declarado en el archivo .env
```
npm run start
```

### Usage || Uso

Favor de seguir estas instrucciones de uso para poder compilar el proyecto en maquinas locales
 * Ver .env.example para configurar el .env con las respectivas variables de entorno que se utilizan en el desarrollo.
 * Las consultas se deben de aplicar con todo y el nombre de la base de datos ejemplo `select top 10 * from Aduana.dbo.Trafico`
 * Todas las rutas `http://localhost:5000/test` deberá ir dentro de la capeta Routes englobando el tipo de Ruta que es como los catálogos, Reportes, Tools, etc.

###