## Título
FASE 1: Assess and Mobilize
## Estado
Aceptada
## Fecha
2023-10-18
## Contexto
En esta primera instancia realizaremos las dos primeras fases de Evaluación y movilización de nuestro monolito hacia la el cloud, recordemos que en nuestro escenario el cliente actualmente disponía de un servidor onprem donde alojaba tanto la app de backend como la base de datos en SQL, que debía ser migrado al cloud. Teniendo en mente el principio de las 7Rs (estrategias de migración) nos planteamos el siguiente trade-off, debemos hacer un Rehosting “lift and Shift” del servidor completo al cloud y una vez allí realizar un Replatform de la base de datos a RDS o realizamos desde on-prem, primero un replatform de la base de datos SQL hacia RDS,  posteriormente apuntar nuestra aplicación de backend (onprem) hacia la base de datos en cloud y por último hacer un Rehosting del servidor solo con la aplicación de backend.
## Decisión
-	Nuestro cliente identifica serios problemas de rendimiento, caídas de los servicios y costos elevados en su actual arquitectura onprem, consideramos que hacer un rehosting de una infraestructura que no funciona, ni siquiera a pequeña escala (ya que solo había sido desplegada en un número reducido de clientes), es un riesgo que no debemos correr ya que puede incurrir en altos costes y dar la sensación de un cambio con pocos beneficios para el cliente a pesar de la rapidez en su aplicación, preferimos por tanto realizar la migración desde onprem consiguiendo hitos parciales, migrando primero la base de datos y seguidamente nuestra aplicación de backend
-	Teniendo todo lo citado en cuenta nuestra migración el siguiente orden:
    -	**AWS Application Discovery Service**: nos ayudará a planificar el proyecto de migración mediante la recopilación de datos onprem (utilización de datos y mapeo de dependencias entre componentes de nuestro server), lo realizaremos mediante las instalación de (Agent-based Discovery), lo resultados pueden ser visualizados dentro de AWS Migration Hub o mediante Athena en S3
    -	**AWS Database Migration Service (DMS)**: Actualmente nuestro cliente dispone de una base de datos SQL (postgre) por lo que realizaremos un replatforming, la migración será de tipo homogénea hacia Aurora (Postgre) + CDC (Change Data Capture).
    -	**AWS Application Migration Service (MGN)**: Una vez migrada nuestra base de datos y comprobada la conexión de nuestra aplicación de backend a la misma, realizaremos un rehosting de nuestro servidor al cloud.
## Consecuencias
#### Positivas:
-	**Optimización de la base de datos para la nube**: Al realizar un replatforming de la base de datos en primer lugar, se puede adaptar la base de datos para aprovechar las características y ventajas de la plataforma de base de datos en la nube. Esto puede resultar en un mejor rendimiento, escalabilidad y administración de la base de datos en la nube.
-	**Mayor eficiencia y reducción de costos a largo plazo**: Una base de datos optimizada para la nube es más eficiente en términos de uso de recursos y costos de operación. Esto puede conducir a ahorros a largo plazo, ya que la administración y el mantenimiento se simplifican, y se paga solo por los recursos que se utilizan.
-	**Mejora de la resiliencia y disponibilidad**: Al utilizar una plataforma de base de datos gestionada en la nube, puede beneficiarse de características como la alta disponibilidad y la replicación de datos que aumentan la resiliencia de su base de datos.
-	**Seguridad mejorada**: Las plataformas de base de datos en la nube suelen ofrecer medidas de seguridad avanzadas, como encriptación de datos en reposo y en tránsito, control de acceso basado en políticas y auditorías de bases de datos, lo que puede mejorar la seguridad de sus datos.
#### Negativas:
-	**Tiempo y recursos adicionales**: Realizar un replatforming de la base de datos antes del rehosting puede requerir tiempo y recursos adicionales, ya que necesita planificar, migrar y probar la base de datos antes de mover la aplicación. Esto podría retrasar el proceso de migración.
-	**Posible complejidad adicional**: Dependiendo de la complejidad de la base de datos y de la plataforma de destino en la nube, el proceso de replatforming puede ser más complejo que un rehosting directo. Puede requerir la reescritura de consultas, ajustes de configuración y cambios en el esquema de la base de datos.
-	**Posible interrupción durante la migración**: Si no se planifica cuidadosamente, el replatforming de la base de datos puede resultar en tiempo de inactividad durante la migración, lo que podría afectar a la disponibilidad de la aplicación.
-	**Costos iniciales más altos**: Aunque a largo plazo se esperan ahorros de costos, la inversión inicial en la optimización de la base de datos y la migración puede ser más alta en comparación con un rehosting más simple.
## Compliance
-	Nuestro cliente opera en Europa y Estados Unidos Por lo que ha de cumplir con los estándares GDPR e HIPAA)
## Notas
-	Autor: Fran Díaz
-	Version: 0.1
-	Changelog:
    -	0.1: Versión Inicial propuesta.


