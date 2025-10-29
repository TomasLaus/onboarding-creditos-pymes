# **DOCUMENTACIÓN DEL DEPARTAMENTO FRONTEND PARA 'FINTECH PYME', EMPRESA DE ONBOARDING PARA CRÉDITOS PYME CON _NO COUNTRY_.**

## **Integrantes del equipo Frontend: Jhon Fredy Serna.**

Este proyecto consistió en el desarrollo de una plataforma de onboarding para la solicitud de créditos PYME, estructurada bajo los parámetros y plazos de No Country. El esquema de trabajo se dividió en cuatro semanas laborales, precedidas por una "semana cero" preliminar. Esta semana inicial se dedicó a la integración del equipo de trabajo y a la implementación de los lineamientos de desarrollo para el área de frontend, la cual inicialmente estuvo compuesta por Alexis Cerullo y Jhon Fredy Serna. A continuación, se presenta un desglose semanal de las actividades y los avances logrados hasta la finalización del proyecto:

## SEMANA CERO:

Al inicio del proyecto, los dos profesionales determinamos los lenguajes y frameworks que fundamentarían la estructura del proyecto en el área de Frontend. Se optó por trabajar con el framework React y la herramienta Vite, lo cual agiliza significativamente el proceso de desarrollo.

Se estableció un flujo de trabajo organizado, determinando el uso de componentes, paginación y un enrutador para garantizar solidez, facilitar la gestión y, principalmente, mantener la limpieza del código.

## SEMANA UNO (1):

Se inició la construcción de la página de inicio, recibiendo los diseños por parte del equipo de UX y utilizando un enfoque basado en componentes. Estos componentes fueron distribuidos entre los miembros del equipo. Al finalizar esta primera semana, se había logrado completar prácticamente la totalidad de los componentes que integran la página de inicio y la navegación principal del sitio. 

## SEMANA DOS (2):

Esta semana se tornó crítica para el equipo de trabajo, ya que perdimos a uno de nuestros desarrolladores frontend y el área quedó a mi cargo exclusivo, Jhon Fredy Serna. Desde este punto, comencé a trabajar en la maquetación e interfaz de inicio de sesión y registro para clientes corporativos. En esta etapa, la comunicación con el equipo de Backend se volvió fundamental, y Miguel Villalba se convirtió en mi mano derecha. Con él, iniciamos las primeras conexiones entre las áreas para lograr un registro e inicio de sesión funcionales. Miguel, quien es un desarrollador Fullstack, contribuyó significativamente al frontend en aspectos vitales como la conectividad y la lógica necesaria para las diferentes páginas que se estaban construyendo, con el fin de generar el proceso de onboarding que el cliente corporativo requiere para solicitar el crédito PYME.

Durante esta semana, se realizaron ajustes en el inicio de sesión y se comenzó la construcción del dashboard de usuario corporativo, que inició con la implementación de un encabezado de dashboard distinto al de la página de inicio, más enfocado en el uso del cliente registrado. A su vez, también se construyó una barra de navegación lateral (izquierda) con enlaces que facilitan los procesos posteriores y, por consiguiente, más importantes, como la solicitud del crédito PYME. También se desarrolló la interfaz (dashboardview) de bienvenida cuando el usuario ha completado exitosamente su registro.

En este punto, se empezaron a ajustar pequeños detalles relacionados con el manejo de errores y la visualización personalizada de la interfaz de usuario, para que, de forma mancomunada con el equipo de Backend, los datos ya almacenados comenzarán a mostrarse en pantalla.


## SEMANA TRES (3):

Para la última semana, se logra implementar todo el flujo de solicitud de crédito en experiencia onboarding, con un mancomunado trabajo con el equipo de diseño UX, consigo replicar todas las pantallas propuestas, y con la ayuda de Miguel Villalba del equipo de backend se estructura una optimización de código para recibir para que el flujo de la página web sea consistente en todas sus líneas.

## IMPLEMENTACIÓN TÉCNICA DEL FRONTEND: 

A medida que pasaron las semanas se fueron implementando diferentes librerías acorde a las necesidades que iban surgiendo en cada una de las etapas de desarrollo que tenía el departamento Frontend. 

Empezamos estructurando el proyecto por componentes para que se hiciera de la página de inicio una página más escalable y flexible. Luego el proyecto va teniendo una exigencia más alta en su comunicación interna y fluidez entre las nuevas interfaces, por lo que se implementa una estructura bajo el enrutamiento de router DOM, se hace uso de un outlet para escalonamiento de páginas (denominadas hijas) que pudiesen establecerse en orden jerárquicos dentro de la página que se iba a presentar con la solicitud de crédito, ya que se debía mantener la barra de navegación y el encabezado exclusivo para el usuario (solicitante de crédito).
También para una conexión más efectiva con el endpoint del backend se hace uso de la librería de Axios para que el manejo del CRUD fuese más eficiente y pudiese recibir y transformar los datos sin generar conflictos de formatos (texto, imágenes o documentos tipo PDF entre otros). 

Cómo lo comenté al principio, se establece que cada tipo de archivo de React tuviese su archivo independiente de CSS. Respecto a este último se evitó el uso de librerías de diseño como Material UI o Tailwind, para darle prioridad a un código de funcionalidad más limpio en su HTML y separando su diseño para mejor legibilidad y trabajo sobre los media query usados para responsividad en dispositivos móviles. También se usó libraría de iconos de react con GitHub para todo el proyecto y su uso fue indispensable en varios componentes. 

Se intentó mantener un escalonamiento paulatino de todo el proyecto con: componentes, páginas, enrutador, contextos para asuntos de accesibilidad, layout para jerarquías de componentes hijos en composición de paginado y, no menos importante: el uso de assets para manejo de imágenes. 

## CONCLUSIONES GENERALES: 

De mi parte y al estar como única cabeza al mando del equipo Frontend, durante la mayor parte del desarrollo del proyecto fue una experiencia muy retadora pero muy enriquecedora; cargada de gran responsabilidad, pues, más allá del apoyo de mis compañeros (en especial el de Miguel Villalba quien me guió y también me enseñó bastante en asuntos fundamentales para ser un muy buen Frontend), me enfrente solo a la implementación visual que exigía **_“FINTECH PYME”_** y cumplir la meta me deja muy tranquilo y con ganas de seguir creciendo y aspirar a tener mi primera experiencia laboral en una compañía.

Cualquier error o acierto a destacar dentro del departamento de Frontend durante estas cinco semanas, es responsabilidad directa mía (de Jhon Fredy Serna), ya que fue un tiempo de trabajo con muchísimas batallas ganadas, ninguna perdida (afortunadamente), pero sí algunas cosas por mejorar a futuro en miras de un rendimiento más óptimo en la implantación de más interfaces para hacer de este proyecto onboarding, un proyecto que destaque dentro de su nicho económico. 

Muy feliz por cumplir los objetivos solicitados por No Country donde se obtiene un flujo completo de onboarding para solicitud de créditos Pymes, y por el aprendizaje personal y el de tener una comunicación asertiva con todos los departamentos y directrices estipuladas por nuestro Product manager. De antemano, gracias al equipo de diseño (Fernando y Lucero, ya que fueron increíbles, pacientes y con una gran comunicación grupal); al equipo Backend (Tomás y Miguel, por el despliegue efectivo y la disposición para que las cosas siempre salieran excelentes); a Gladys nuestra tester que siempre estuvo al pendiente del proyecto, y a Fidel, nuestro PM que siempre procuro llevarnos y guiarnos desde el orden y los objetivos con gran humanidad.  
