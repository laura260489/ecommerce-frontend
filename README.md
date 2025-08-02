# bolivar-core-template-frontend

# Crear micro-front 
```
    ng g application {project name}
```
-   ### Añadir module federation - {project name}
```
    ng add @angular-architects/module-federation --project {project name}
```

-   ### Crear modulo de entrada 
```
    ng g m remote-entry --project {project name}
    
```
-   ### Crear componente de entrada 
```
    ng g c remote-entry --project {project name}
    
```
-   ### Configurar lectura archivo .env - webpack.config.js

    *   Crear archivo `.env` en la raíz del proyecto a nivel del package.json:

        ```
            name=local
            production=false
            environmentUrl=http://localhost
        ```

    *   Agregar plugin `webpack dotenv` en el archivo `webpack.config.js`:

        ```javascript
            ...
            const webpack = require("webpack");
            const dotenv = require("dotenv").config(); // Carga el archivo .env
            ...
            module.exports = {
                ...
                plugins: [
                    ...
                    new webpack.DefinePlugin({
                    "process.env": JSON.stringify(dotenv.parsed)
                    })
                ],
            };
        ```
    *   Configurar variable de entorno en el archivo bootstrap.ts:

        ```typescript
            ...
            if (process.env["production"]) {
                enableProdMode();
            }
            ...
        ```
    *   Configurar types en el archivo tsconfig.app.json:

        ```json
            ...
                "compilerOptions": {
                    ...
                    "types": ["node"],
                    ...
                },
            ...
        ```
    *   Configurar angular.json:

        Es necesario eliminar antes los archivos `environment.*.ts` y luego el parámetro `fileReplacements`, como se observa a continuación:  
    
        ```json
            ...
            "production": {
                "buildOptimizer": true,
                "optimization": true,
                "vendorChunk": false,
                "extractLicenses": true,
                "sourceMap": false,
                "namedChunks": false,
                "outputHashing": "none",
                "budgets": [
                    ...
                ],
                "extraWebpackConfig": "projects/{project name}/webpack.prod.config.js"
            },
            ...
        ```
    *   Configurar `environments` en el archivo `WorkflowFile.json`:
    
        Cuando se despliega la aplicación por medio de github actions, se crea el archivo `.env` a partir de la configuración de `environments` del archivo `WorkflowFile.json`.

        ```
        **
            Nota: Es necesario aclarar, que los valores de los `environments` definidos en el archivo `WorkflowFile.json`, deben estar ya configurados y
            desplegados mediante el repositorio de infraestructura del proyecto, haciendo uso del parameter store de aws.
        **
        ```

        A continuación un ejemplo del archivo `WorkflowFile.json`:

        ```json
            ...
            "environments": {
                "dev": {
                    "environmentUrl": "/{projectName}/dev/environment/front/environmentUrlFront",        
                    ...         
                },
                "stage":{
                    "environmentUrl": "/{projectName}/stage/environment/front/environmentUrlFront",
                    ...
                },
                "prod":{
                    "environmentUrl": "/{projectName}/prod/environment/front/environmentUrlFront",
                    ...
                }
            }
        ```