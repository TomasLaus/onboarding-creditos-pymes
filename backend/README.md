### IMPORTANTE

- Ejecutar los comandos en directorio /backend

```bash
npm install
```

-renombrar .env.example a .env para que cargue correctamente las variables de entorno.

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

```bash
 npx prisma migrate dev --name user --schema=./prisma/schema.prisma
```

## VER ADMINISTRADOR VISUAL DE PRISMA (TIPO PHPMYADMIN)

- migrar base de datos(crear tablas a partir de esquemas definidos)

```bash
npx prisma studio
```

## ARRANCAR SERVIDOR BACKEND

- migrar base de datos(crear tablas a partir de esquemas definidos)

```bash
npm run dev
```

## probar endpoints

- instalar extensión ´REST Client´ en VSCODE.
- ir a carpeta /src/http-test/...
- enviar solicitud presionando en "send request"

## VER DOCUMENTACION DE LAS APIs

- http://localhost:3000/api/docs/
