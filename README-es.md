# BitModules para micro:bit

> 🇬🇧 **For English-speaking users:** [Read the documentation in English here](README.md)

**BitModules** es una extensión de Microsoft MakeCode que facilita la lectura de sensores y el control de actuadores con la placa BBC micro:bit. Está diseñada para hacer más accesibles los proyectos de electrónica y robótica mediante bloques intuitivos que permiten trabajar tanto con los componentes integrados de la placa como con componentes externos.

## 🚀 Características principales

Esta extensión organiza sus funciones en varias categorías fáciles de utilizar:

* 🌡️ **Temperatura y luz:** Alarmas y detección de valores límite mediante los sensores integrados.

* 🚀 **Acelerómetro:** Medición de la fuerza de los impactos (0-100 %) y cálculo preciso de los ángulos de inclinación (Pitch/Roll), con zonas muertas estabilizadas.

* 🧭 **Brújula:** Detección simplificada de las 8 direcciones de la brújula (N, NE, E, SE, S, SO, O, NO).

* 🔊 **Sonido (exclusivo de la versión V2):** Bloques que permiten reaccionar según el nivel de sonido detectado.

* 🔌 **Sensores externos:** Compatibilidad optimizada con sensores de movimiento PIR, sensores ultrasónicos de distancia (HC-SR04), potenciómetros, sensores de humedad del suelo y sensores analógicos de luz.

* ⚙️ **Actuadores:** Control directo y sencillo de luces LED (con selector de color), relés y servomotores (0-180°).

## 🛠️ Cómo instalar la extensión

Para utilizar esta extensión en tu proyecto de MakeCode:

1. Abre [Microsoft MakeCode para micro:bit](https://makecode.microbit.org/).

2. Haz clic en **Nuevo proyecto**.

3. En el menú, haz clic en el ícono de engranaje ⚙️ y selecciona **Extensiones** (también puedes hacer clic en «Extensiones» en la paleta de bloques).

4. En el cuadro de búsqueda, pega la dirección URL de este repositorio:
   ` https://github.com/robotedhn/bitmodules`

5. Haz clic en la tarjeta de **BitModules** para agregar la extensión a tu proyecto.


## 💻 Ejemplos de uso

### 1. Alarma de temperatura (sensores integrados)
![Compatibilidad](https://img.shields.io/badge/micro:bit-v1_and_v2-orange.svg)

Activa un relé y enciende un LED cuando la temperatura supera los 30 °C.

![Ejemplo de bloques para la alarma de temperatura](https://github.com/robotedhn/bitmodules/blob/master/images/relayledblocks-es.png)

Ejemplo de circuito
![Diagrama del circuito de la alarma de temperatura](https://github.com/robotedhn/bitmodules/blob/master/images/relayled.png)


### 2. Sensor ultrasónico de distancia (sensores externos)
![Compatibilidad](https://img.shields.io/badge/micro:bit-v1_and_v2-orange.svg)

Mide la distancia y activa un servomotor cuando detecta un obstáculo a menos de 15 cm.

![Ejemplo de bloques para el sensor ultrasónico](https://github.com/robotedhn/bitmodules/blob/master/images/servo_ultrasonicblocks-es.png)

Ejemplo de circuito
![Diagrama del circuito del sensor ultrasónico](https://github.com/robotedhn/bitmodules/blob/master/images/servo_ultrasonic.png)

### 3. Brújula (sensores integrados)
![Compatibilidad](https://img.shields.io/badge/micro:bit-v1_and_v2-orange.svg)

Muestra N, S, E u O cuando la placa apunta hacia uno de esos puntos cardinales (O corresponde al oeste).

![Ejemplo de bloques para la brújula](https://github.com/robotedhn/bitmodules/blob/master/images/cardinalpoints-es.png)


## ⚙️ Referencia de pines compatibles

La extensión limita de forma inteligente los pines disponibles para evitar conflictos con la matriz de LED integrada de la micro:bit:

* **Analógicos:** P0, P1, P2, P3, P4, P10.

* **Digitales (sin conflictos):** P0, P1, P2, P6, P7, P8, P9, P13, P14, P16.

## 📄 Licencia

Licencia MIT. Consulta el archivo `LICENSE` para obtener más información.

## Plataformas compatibles
* Para PXT/microbit


> Abre esta página en [https://robotedhn.github.io/bitmodules/](https://robotedhn.github.io/bitmodules/)

## Usar como extensión

Este repositorio se puede agregar como una **extensión** en MakeCode.

* Abre [https://makecode.microbit.org/](https://makecode.microbit.org/)
* Haz clic en **Nuevo proyecto**
* Haz clic en **Extensiones** desde el menú del engranaje
* Busca **https://github.com/robotedhn/bitmodules** e importa la extensión

## Créditos
Desarrollado por **Carlos Borjas - Robótica Educativa de Honduras**.

Diseñado para apoyar la robótica educativa, la implementación de tecnología en centros educativos y la formación de equipos de estudiantes.
