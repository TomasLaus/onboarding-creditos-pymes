
### IMPORTANTE
- Ejecutar los comandos en directorio /backend

## LEVANTAR SERVER POSTGRES DB 
- primero instalar e iniciar docker deskptop (buscar en google docker desktop)
- luego ejecutar en consola en el directorio 
```bash
docker-compose up
```

## MIGRAR DB (crear tablas a partir de esquemas definidos)

```bash
npx prisma migrate dev --name user --schema=./src/config/schema.prisma
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

