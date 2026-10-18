# BitModules for micro:bit

**BitModules** is a Microsoft MakeCode extension that simplifies reading sensors and controlling actuators on the BBC micro:bit. It is designed to make electronics and robotics projects more accessible by providing intuitive blocks for both built-in and external components.

## 🚀 Main Features

This extension divides its functions into several easy-to-use categories:

* 🌡️ **Temperature and Light:** Alarms and limit readings for built-in sensors.

* 🚀 **Accelerometer:** Impact force measurement (0-100%) and precise calculation of tilt angles (Pitch/Roll) with stabilized dead zones.

* 🧭 **Compass:** Simplified detection of the 8 cardinal points (N, NE, E, SE, S, SW, W, NW).

* 🔊 **Sound (V2 Exclusive):** Reaction blocks for noise levels.

* 🔌 **External Sensors:** Optimized support for PIR motion sensors, Ultrasonic distance sensors (HC-SR04), potentiometers, soil moisture sensors, and analog light sensors.

* ⚙️ **Actuators:** Direct and easy control of LEDs (with a color selector), relays, and servomotors (0-180º).

## 🛠️ How to install the extension

To use this extension in your MakeCode project:

1. Open [Microsoft MakeCode for micro:bit](https://makecode.microbit.org/).

2. Click on **New Project**.

3. In the menu, click the gear icon ⚙️ and select **Extensions** (or click "Extensions" in the block palette).

4. In the search box, paste the URL of this repository:
   `https://github.com/your-username/your-repository`

5. Click on the **BitModules** card to import it into your project.

> **Note:** Remember to replace `your-username/your-repository` with the actual URL of your GitHub repository once you publish it.

## 💻 Usage Examples

### 1. Temperature Alarm (Built-in Sensors)

Triggers an alarm if the temperature rises above 30ºC.

```blocks
basic.forever(function () {
    if (BitModules.temperatureAlarm(30)) {
        basic.showIcon(IconNames.Skull)
    } else {
        basic.clearScreen()
    }
})
```

### 2. Ultrasonic Distance Sensor (External Sensors)

Measures distance and activates a servomotor if an obstacle is closer than 10 cm.

```blocks
basic.forever(function () {
    if (BitModules.detectObstacle(10, BitModules.DigitalPinOptions.P1, BitModules.DigitalPinOptions.P2)) {
        BitModules.moveServo(BitModules.DigitalPinOptions.P0, 180)
    } else {
        BitModules.moveServo(BitModules.DigitalPinOptions.P0, 0)
    }
})
```

### 3. Tilt and Compass (Accelerometer)

Shows an arrow pointing North if the board is pointing to that cardinal direction.

```blocks
basic.forever(function () {
    if (BitModules.pointingNorth()) {
        basic.showArrow(ArrowNames.North)
    }
})
```

## ⚙️ Supported Pins Reference

The extension smartly restricts available pins to prevent conflicts with the micro:bit's internal LED matrix:

* **Analog:** P0, P1, P2, P3, P4, P10.

* **Digital (Safe):** P0, P1, P2, P6, P7, P8, P9, P13, P14, P16.

## 🤝 Contributions

Contributions are welcome! If you want to improve the extension, please fork the repository, create a branch with your changes, and submit a Pull Request.

## 📄 License

MIT License. See the `LICENSE` file for more details.

#### MakeCode Metadata (Required)

* for PXT/microbit


> Open this page at [https://robotedhn.github.io/bitmodules/](https://robotedhn.github.io/bitmodules/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/robotedhn/bitmodules** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/robotedhn/bitmodules** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
