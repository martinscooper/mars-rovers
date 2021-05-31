# Mars rovers problem

Soluccion del problema Mars Rovers.

## Ambiente de desarrollo

Para levantar la aplicacion en un ambiente local hay dos opciones:

1. Si se tiene npm instalado, ejecutar

```shell
    npm run dev:nodemon
```

2. Para ejecutar en un contenedor de Docker, ejecutar

```shell
    docker-compose -f docker-compose.dev.yml up --build
```

Ambos comandos deben ser ejecutados desde el directorio raiz del proyecto.

## Usando la aplicación

En un navegador, ir a la url http://localhost:8080/index.html

Primero debe ingresarse la tamaño de la grilla por la cual van a moverse los rovers.
Luego, ingresar, uno a uno, las posiciones iniciales y las instrucciones de los rovers.
Por último, para mostrar las posiciones finales de los rovers se debe presionar el boton Solve Problem. Los rovers de color anaranjado representan aquellos en su posición original, mientras que los rovers de color azul representan aquellos en su posición final. Al pasar el mouse sobre un rover se despliega información acerca de su identificador, su orientación y sus comandos asociados.
