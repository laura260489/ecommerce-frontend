# e-commerce-frontend

Este proyecto es una aplicación de micro-frontends desarrollada con Angular y Module Federation.
Consiste en el front-end interactivo de un e-commerce

### 🚀 Cómo arrancar el proyecto

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local.

1.  **Instalar las dependencias:**
    
    ```bash
    npm install
    ```

2.  **Crear el archivo de entorno (`.env`):**
    
    Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `package.json`) y agrega las siguientes variables de entorno.
    
    ```bash
    name=local
    production=false
    environmentUrl=http://localhost
    urlBase="http://localhost:8080/api/"
    ```

3.  **Iniciar la aplicación:**
    
    Ejecuta el siguiente comando para arrancar todos los micro-frontends de la aplicación.
    
    ```bash
    npm run start:all
    ```

---

### 🛠️ Configuración de Micro-Frontends (Module Federation)

#### 1. Crear un nuevo micro-frontend
Utiliza el CLI de Angular para generar un nuevo proyecto de tipo `application`.

```bash
ng g application {nombre-del-proyecto}