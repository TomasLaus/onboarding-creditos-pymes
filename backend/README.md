### IMPORTANTE

- Ejecutar los comandos en directorio /backend

```bash
npm install
```

- Crear un archivo `.env` en la carpeta `backend/` y configurar con sus propias credenciales (Guiarse del archivo `.env.example`):

> [!CAUTION]
> NO SE DEBE AGREGAR EL `.env` AL REPOSITORIO PUBLICO, es un archivo con credenciales sensibles. No borrar el `.env` del archivo `.gitignore`

## LEVANTAR SERVER POSTGRES DB

- primero instalar e iniciar docker deskptop (buscar en google docker desktop)

- [Docker Desktop - Click aquí](https://www.docker.com/products/docker-desktop/) - Link para descargar -
- luego ejecutar en consola en el directorio

```bash
docker-compose up
```

## MIGRAR DB (crear tablas a partir de esquemas definidos)

- Se requiere PostgreSQL
- [PostgreSQL (psql) - Click aquí](https://www.postgresql.org/download/) - Link para descargar -
- problemas con las migraciones? eliminar carpeta pgdata(elimina db)
- Es importante migrar cada vez que se cambia algo en schema.prisma.

```bash
 npx prisma migrate dev --name user --schema=./prisma/schema.prisma
```

## VER ADMINISTRADOR VISUAL DE PRISMA (TIPO PHPMYADMIN)

```bash
npx prisma studio
```

## ARRANCAR SERVIDOR BACKEND

```bash
npm run dev
```

## probar endpoints

- instalar extensión ´REST Client´ en VSCODE.
- ir a carpeta /src/http-test/...
- enviar solicitud presionando en "send request"

## VER DOCUMENTACION DE LAS APIs

- http://localhost:3000/api/docs/

## PARA ENVIO DE EMAIL COMPLETAR USER Y PASS DE GMAIL EN app.ts

- Gmail ya no permite usar la contraseña normal, necesitas generar una App Password en tu cuenta Google.

```javascript
// Configuración de nodemailer (ejemplo Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'oonboardingpymestesting@gmail.com',
    pass: 'pass'
  }
})
```

# test de integracion

- tener en cuenta de usar una base de datos aislada para entorno de desarrollo, ya que persiste y elimina datos.

```bash
npm run jest:test
```
