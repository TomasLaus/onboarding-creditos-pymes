/**
 * @openapi
 * /users/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: field
 *                       msg:
 *                         type: string
 *                         example: Invalid value
 *                       path:
 *                         type: string
 *                         example: name
 *                       location:
 *                         type: string
 *                         example: body
 *       500:
 *         description: Error interno al crear el usuario (Prisma)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creando usuario.
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: P2002
 *                     meta:
 *                       type: object
 *                       properties:
 *                         modelName:
 *                           type: string
 *                           example: User
 *                         target:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: email
 *                     clientVersion:
 *                       type: string
 *                       example: 6.16.3
 *                     name:
 *                       type: string
 *                       example: PrismaClientKnownRequestError
 *
 * /users/getAll:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno al obtener usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error consultando todos los usuarios.
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: P2002
 *                     meta:
 *                       type: object
 *                       properties:
 *                         modelName:
 *                           type: string
 *                           example: User
 *                         target:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: email
 *                     clientVersion:
 *                       type: string
 *                       example: 6.16.3
 *                     name:
 *                       type: string
 *                       example: PrismaClientKnownRequestError
 *
 *components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Miguel
 *         email:
 *           type: string
 *           format: email
 *           example: test@example.com
 *         password:
 *           type: string
 *           example: mysecret123
 */
