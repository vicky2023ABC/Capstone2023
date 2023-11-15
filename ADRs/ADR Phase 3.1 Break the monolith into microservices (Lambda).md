## Título
FASE 3.1: Rompiendo el monolito en microservicios.
## Estado
Aceptada
## Fecha
2023-10-26
## Contexto
-	Con nuestro patrón de descomposición seleccionado, debemos usar algún proceso de migración o aplicación que nos ayude a realizar a descomponer nuestro monolito de una forma controlada y siguiendo las mejores prácticas.
Decisión
-	Para  ello haremos uso de Migration Hub Refactor Spaces que nos porporciona una forma de migrar aplicaciones monolíticas a una arquitectura basada en microservicios de manera incremental y controlada.
## Consecuencias
#### Positivas:
-	Permite una migración incremental y controlada, sin necesidad de reescribir toda la aplicación de una sola vez.
-	Reduce el riesgo de introducir errores o interrumpir el funcionamiento de la aplicación existente.
-	Facilita la adopción de nuevas tecnologías y prácticas, como la integración continua, el despliegue continuo o el desarrollo dirigido por pruebas.
	Mejora la escalabilidad, la fiabilidad y el rendimiento de la aplicación, al dividirla en componentes más pequeños y autónomos.
#### Negativas:
-	Requiere una planificación cuidadosa y una coordinación entre los equipos de desarrollo, para evitar conflictos o inconsistencias entre los servicios.
-	Implica un mayor esfuerzo de gestión y monitorización, al tener que lidiar con múltiples servicios, dependencias y puntos de integración.
-	Puede aumentar la complejidad y la sobrecarga de la comunicación entre los servicios, al tener que definir e implementar protocolos, contratos e interfaces adecuados.
-	Puede generar una duplicación temporal de código o funcionalidad, al tener que mantener tanto el código antiguo como el nuevo hasta que se complete la migración.
## Compliance
-	Nuestro cliente opera en Europa y Estados Unidos Por lo que ha de cumplir con los estándares GDPR e HIPAA)
## Procedimiento
Como vemos, esta arquitectura tiene cuatro cuentas:
-	Una cuenta para la el Front-End de la aplicacion
    -	Refactor Spaces management account donde Refactor Spaces configura el networking de la arquitectura cross-account y el enrutado de tráfico. (Se ha incluido la migración del frontend a un bucket de S3).
    -	La cuenta de la aplicación monolítica.
    -	La nueva cuenta para los microservicios
- En primer lugar, crea un entorno de Refactor Spaces en la cuenta elegida como propietario del entorno. A continuación, comparte el entorno con las otras dos cuentas. Después de compartir el entorno con otra cuenta, Refactor Spaces comparte automáticamente los recursos que crea dentro del entorno con las demás cuentas.
- El entorno de refactor proporciona un networking unificado para todas las cuentas. Para ello, se configuran los siguientes servicios:
    -	AWS Transit Gateway
    -	AWS Resource Access Manager
    -	Network Load Balancer
    -	Amazon API Gateway
    -	VPCs y security groups
- El entorno del refactor contiene la aplicación existente y los nuevos microservicios. Después de crear un entorno de refactor, crea una aplicación Refactor Spaces dentro del entorno. La aplicación Refactor Spaces contiene servicios y rutas y proporciona un único endpoint para exponer la aplicación al exterior.
- Una aplicación admite el enrutamiento a servicios que se ejecutan en contenedores, serverless y Amazon Elastic Compute Cloud (Amazon EC2) con visibilidad pública o privada. Los servicios de una aplicación pueden tener uno de los dos tipos de endpoint: una URL (HTTP y HTTPS) en una VPC o en AWS Lambda.
- Una vez que una aplicación contiene un servicio, agrega una ruta predeterminada para dirigir todo el tráfico desde el proxy de la aplicación al servicio que representa la aplicación existente. A medida que se desarrolla o agrega nuevas capacidades en contenedores o serverless, agrega nuevos servicios y rutas para redirigir el tráfico a los nuevos servicios.
- Durante el proceso de migración, nos podemos encontrar que desde el monolito también se realiza una llamada al servicio que acabamos de migrar. En este caso necesitamos exponer la funcionalidad dentro del monolito para que se pueda llamar desde el nuevo microservicio mediante Anticorruption Layer como explicábamos anteriormente.
## Notas
-	Autor: Fran Díaz
-	Version: 0.1
-	Changelog:
    -	0.1: Versión Inicial propuesta.


