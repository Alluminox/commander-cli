## CLI - Project Structures 

=> CREATE GATEWAY

    -> Libs
    - Babel + Sucrase
    - node-rpc-event
    - auto-env(Checa e faz o import automatico das libs)
    - jest
    - api-doc(Documentar)

    -> Structure FOLDERS
    {gateway-name}/
    __tests__
    build/
    src/
        gateway/
        gateway/index.js
        gateway/services.js
        gateway/middlewares.js

        views/
        public

        settings/
        settings/config.json

        index.js
    .env
    .env.local
    .env.prod
    .gitignore
    .Dockerfile
    package.json


=> CREATE API

    -> Libs
    - node-rpc-event
    - import-env(Checa e faz o import automatico das libs)
    - jest
    - api-doc(Documentar)
    - Babel + Sucrase

    -> Structure FOLDERS
    {api-name}/
    __tests__
    build/
    src/
        api/
        api/index.js
        api/routes
        api/middlewares

        settings/
        settings/config.json

        services/
        services/index.js

        index.js
    .env
    .env.local
    .env.prod
    .gitignore
    .Dockerfile
    package.json


=> CREATE SERVICE(Boilerplat com algumas libs)
    -> Libs
    - node-rpc-event
    - import-env(Checa e faz o import automatico das libs)
    - jest
    - api-doc(Documentar)

   -> Structure FOLDERS
    {service-name}/
    __tests__
        build/
        src/
            database/
            database/connect
            database/models

            events/
            events/publishers
            events/subscribers
            events/actions.js

            index.js(Import de Actions)
            .env
            .env.local
            .env.prod
            .gitignore
            .Dockerfile
            package.json

