/**
 * Blocks for reading sensors and controlling actuators
 */
//% weight=100 color=#0fbc11 icon="\uf1b3" block="BitModules"
//% groups="['Temperature - Light', 'Accelerometer', 'Compass', 'Sound (V2)', 'External Sensors', 'Actuators']"
namespace BitModules {

    /**
     * Analog pin options for sensors
     */
    export enum AnalogPinOptions {
        //% block="P0"
        P0 = AnalogPin.P0,
        //% block="P1"
        P1 = AnalogPin.P1,
        //% block="P2"
        P2 = AnalogPin.P2,
        //% block="P3"
        P3 = AnalogPin.P3,
        //% block="P4"
        P4 = AnalogPin.P4,
        //% block="P10"
        P10 = AnalogPin.P10
    }

    /**
     * Safe digital pin options for sensors and actuators
     */
    export enum DigitalPinOptions {
        //% block="P0"
        P0 = DigitalPin.P0,
        //% block="P1"
        P1 = DigitalPin.P1,
        //% block="P2"
        P2 = DigitalPin.P2,
        //% block="P6"
        P6 = DigitalPin.P6,
        //% block="P7"
        P7 = DigitalPin.P7,
        //% block="P8"
        P8 = DigitalPin.P8,
        //% block="P9"
        P9 = DigitalPin.P9,
        //% block="P16"
        P16 = DigitalPin.P16,
        //% block="P13"
        P13 = DigitalPin.P13,
        //% block="P14"
        P14 = DigitalPin.P14
    }

    // Color options for the LED dropdown menu
    export enum LedColor {
        //% block="red"
        Red,
        //% block="yellow"
        Yellow,
        //% block="green"
        Green,
        //% block="blue"
        Blue,
        //% block="white"
        White
    }

    /**
     * Distance unit options for the ultrasonic sensor
     */
    export enum DistanceUnit {
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    /**
     * Options for the compass cardinal points dropdown menu
     */
    export enum CardinalPoint {
        //% block="North (N)"
        North,
        //% block="Northeast (NE)"
        Northeast,
        //% block="East (E)"
        East,
        //% block="Southeast (SE)"
        Southeast,
        //% block="South (S)"
        South,
        //% block="Southwest (SW)"
        Southwest,
        //% block="West (W)"
        West,
        //% block="Northwest (NW)"
        Northwest
    }

    /**
     * Options for the accelerometer axes
     */
    export enum AccelerometerAxis {
        //% block="X (left/right)"
        X = Dimension.X,
        //% block="Y (forward/backward)"
        Y = Dimension.Y,
        //% block="Z (up/down)"
        Z = Dimension.Z
    }

    // ==========================================
    //           TEMPERATURE (BUILT-IN)
    // ===========================================

    /**
     * Hexagonal block that returns TRUE if the built-in temperature is above the limit.
     * @param limit degrees Celsius at which the alarm triggers
     */
    //% block="temperature rises above $limit ºC?"
    //% limit.defl=30
    //% group="Temperature - Light"
    //% weight=100
    export function temperatureAlarm(limit: number): boolean {
        let currentTemp = input.temperature();
        return currentTemp >= limit;
    }

    /**
     * Hexagonal block that returns TRUE if the built-in temperature drops below the limit.
     * @param limit degrees Celsius at which the alarm triggers
     */
    //% block="temperature falls below $limit ºC?"
    //% limit.defl=30
    //% group="Temperature - Light"
    //% weight=99
    export function temperatureAlarmDrop(limit: number): boolean {
        let currentTemp = input.temperature();
        return currentTemp <= limit;
    }

    /**
     * Hexagonal block that returns TRUE if the light level is above the limit.
     * @param limit the light level from 0 (dark) to 255 (very bright)
     */
    //% block="light level rises above $limit?"
    //% limit.min=0 limit.max=255 limit.defl=150
    //% group="Temperature - Light"
    //% weight=98
    export function lightAlarm(limit: number): boolean {
        let currentLight = input.lightLevel();
        return currentLight >= limit;
    }

    /**
     * Hexagonal block that returns TRUE if the light level drops below the limit.
     * @param limit the light level from 0 (dark) to 255 (very bright)
     */
    //% block="light level falls below $limit?"
    //% limit.min=0 limit.max=255 limit.defl=150
    //% group="Temperature - Light"
    //% weight=97
    export function lightAlarmDrop(limit: number): boolean {
        let currentLight = input.lightLevel();
        return currentLight <= limit;
    }

    // ==========================================
    //           ACCELEROMETER (BUILT-IN)
    // ===========================================

    /**
     * Measures the absolute acceleration force on a specific axis and converts it to a percentage (0 to 100％).
     * Automatically compensates for gravity on the Z-axis.
     * @param axis the accelerometer axis to measure
     */
    //% block="acceleration force (0-100％) on $axis axis"
    //% group="Accelerometer"
    //% weight=96
    export function accelerationForce(axis: AccelerometerAxis): number {
        let rawForce = input.acceleration(<number>axis);

        if (axis === AccelerometerAxis.Z) {
            rawForce = rawForce + 1024;
        }

        let absoluteForce = Math.abs(rawForce);
        let percentage = Math.map(absoluteForce, 0, 1024, 0, 100);
        return Math.round(Math.constrain(percentage, 0, 100));
    }

    /**
     * Measures the total dynamic impact or shake force of the micro:bit (0 to 100％).
     * Filters out standard 1G Earth gravity.
     */
    //% block="total impact force (0-100％)"
    //% group="Accelerometer"
    //% weight=90
    export function totalImpactForce(): number {
        let x = input.acceleration(Dimension.X);
        let y = input.acceleration(Dimension.Y);
        let z = input.acceleration(Dimension.Z);

        let totalForce = Math.sqrt((x * x) + (y * y) + (z * z));
        let impact = totalForce - 1024;

        if (impact < 0) {
            impact = 0;
        }

        let percentage = Math.map(impact, 0, 2048, 0, 100);
        return Math.round(Math.constrain(percentage, 0, 100));
    }

    /**
     * Calculates the tilt angle of the micro:bit.
     * Includes a stabilizing dead zone of ±3 degrees in the center.
     */
    //% block="tilt angle"
    //% group="Accelerometer"
    //% weight=85
    export function tiltAngle(): number {
        let accX = input.acceleration(Dimension.X);
        let accY = input.acceleration(Dimension.Y);

        let radians = Math.atan2(-accX, accY);
        let degrees = Math.round(radians * (180 / Math.PI));

        if (degrees >= -3 && degrees <= 3) {
            return 0;
        }
        return degrees;
    }

    /**
     * Calculates the front tilt angle (Pitch).
     * Flat = 0º, Tilted forward = positive values, tilted backward = negative values.
     * Includes a stabilizing dead zone of ±3 degrees.
     */
    //% block="front tilt angle (forward/backward)"
    //% group="Accelerometer"
    //% weight=84
    export function frontTiltAngle(): number {
        let tilt = input.rotation(Rotation.Pitch);
        if (tilt >= -3 && tilt <= 3) {
            return 0;
        }
        return tilt;
    }

    /**
     * Calculates the side tilt angle (Roll).
     * Flat = 0º, Tilted left = negative values, tilted right = positive values.
     * Includes a stabilizing dead zone of ±3 degrees.
     */
    //% block="side tilt angle (left/right)"
    //% group="Accelerometer"
    //% weight=83
    export function sideTiltAngle(): number {
        let tilt = input.rotation(Rotation.Roll);
        if (tilt >= -3 && tilt <= 3) {
            return 0;
        }
        return tilt;
    }

    // ==========================================
    //              COMPASS (BUILT-IN)
    // ===========================================

    /**
     * Returns TRUE if pointing North (0º ± 3º)
     */
    //% block="pointing North (N)?"
    //% group="Compass"
    export function pointingNorth(): boolean {
        let degrees = input.compassHeading();
        return degrees >= 357 || degrees <= 3;
    }

    /**
     * Returns TRUE if pointing Northeast (45º ± 3º)
     */
    //% block="pointing Northeast (NE)?"
    //% group="Compass"
    export function pointingNortheast(): boolean {
        let degrees = input.compassHeading();
        return degrees >= 42 && degrees <= 48;
    }

    /**
     * Returns TRUE if pointing East (90º ± 3º)
     */
    //% block="pointing East (E)?"
    //% group="Compass"
    export function pointingEast(): boolean {
        let degrees = input.compassHeading();
        return degrees >= 87 && degrees <= 93;
    }

    /**
     * Returns TRUE if pointing Southeast (135º ± 3º)
     */
    //% block="pointing Southeast (SE)?"
    //% group="Compass"
    export function pointingSoutheast(): boolean {
        let degrees = input.compassHeading();
        return degrees >= 132 && degrees <= 138;
    }

    /**
     * Returns TRUE if pointing South (180º ± 3º)
     */
    //% block="pointing South (S)?"
    //% group="Compass"
    export function pointingSouth(): boolean {
        let degrees = input.compassHeading();
        return degrees >= 177 && degrees <= 183;
    }

    /**
     * Returns TRUE if pointing Southwest (225º ± 3º)
     */
    //% block="pointing Southwest (SW)?"
    //% group="Compass"
    export function pointingSouthwest(): boolean {
        let degrees = input.compassHeading();
        return degrees >= 222 && degrees <= 228;
    }

    /**
     * Returns TRUE if pointing West (270º ± 3º)
     */
    //% block="pointing West (W)?"
    //% group="Compass"
    export function pointingWest(): boolean {
        let degrees = input.compassHeading();
        return degrees >= 267 && degrees <= 273;
    }

    /**
     * Returns TRUE if pointing Northwest (315º ± 3º)
     */
    //% block="pointing Northwest (NW)?"
    //% group="Compass"
    export function pointingNorthwest(): boolean {
        let degrees = input.compassHeading();
        return degrees >= 312 && degrees <= 318;
    }

    /**
     * Returns TRUE if the micro:bit points to the selected cardinal point from the list.
     * It uses an accuracy margin of ±3 degrees.
     * @param direction The cardinal point to evaluate
     */
    //% block="pointing to $direction?"
    //% group="Compass"
    export function pointingTo(direction: CardinalPoint): boolean {
        let degrees = input.compassHeading();

        switch (direction) {
            case CardinalPoint.North:
                return degrees >= 357 || degrees <= 3;
            case CardinalPoint.Northeast:
                return degrees >= 42 && degrees <= 48;
            case CardinalPoint.East:
                return degrees >= 87 && degrees <= 93;
            case CardinalPoint.Southeast:
                return degrees >= 132 && degrees <= 138;
            case CardinalPoint.South:
                return degrees >= 177 && degrees <= 183;
            case CardinalPoint.Southwest:
                return degrees >= 222 && degrees <= 228;
            case CardinalPoint.West:
                return degrees >= 267 && degrees <= 273;
            case CardinalPoint.Northwest:
                return degrees >= 312 && degrees <= 318;
            default:
                return false;
        }
    }

    // ==========================================
    //           SOUND (V2) (BUILT-IN)
    // ===========================================

    /**
     * Hexagonal block that returns TRUE if the sound level is above the limit.
     * Note: Requires micro:bit V2.
     * @param limit the sound level from 0 (silent) to 255 (very loud)
     */
    //% block="sound level rises above $limit?"
    //% limit.min=0 limit.max=255 limit.defl=128
    //% group="Sound (V2)"
    export function soundAlarm(limit: number): boolean {
        let currentSound = input.soundLevel();
        return currentSound >= limit;
    }

    /**
     * Hexagonal block that returns TRUE if the sound level drops below the limit.
     * Note: Requires micro:bit V2.
     * @param limit2 the sound level from 0 (silent) to 255 (very loud)
     */
    //% block="sound level falls below $limit2?"
    //% limit2.min=0 limit2.max=255 limit2.defl=128
    //% group="Sound (V2)"
    export function soundAlarmDrop(limit2: number): boolean {
        let currentSound = input.soundLevel();
        return currentSound <= limit2;
    }

    // ==========================================
    //          EXTERNAL SENSORS
    // ==========================================

    /**
     * Hexagonal block that returns TRUE if the PIR sensor detects motion.
     * @param pin the digital pin where the PIR is connected
     */
    //% block="PIR detects motion on $pin?"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% group="External Sensors"
    export function pirMotion(pin: DigitalPinOptions): boolean {
        let reading = pins.digitalReadPin(<number>pin);
        return reading === 1;
    }

    /**
     * Base block: Measures distance in centimeters.
     * @param pinTrig pin that emits the sound
     * @param pinEcho pin that listens for the bounce
     */
    //% block="ultrasonic distance (cm) | Trig $pinTrig | Echo $pinEcho"
    //% pinTrig.fieldEditor="gridpicker" pinTrig.fieldOptions.columns=3
    //% pinEcho.fieldEditor="gridpicker" pinEcho.fieldOptions.columns=3
    //% group="External Sensors"
    export function measureDistance(pinTrig: DigitalPinOptions, pinEcho: DigitalPinOptions): number {
        pins.digitalWritePin(<number>pinTrig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(<number>pinTrig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(<number>pinTrig, 0);

        let duration = pins.pulseIn(<number>pinEcho, PulseValue.High, 25000);
        let distance = duration / 58;

        if (distance <= 0 || distance > 400) {
            return 0;
        }
        return Math.round(distance);
    }

    /**
     * Advanced block: Measures distance choosing between cm or inches.
     * @param unit choose centimeters or inches
     * @param pinTrig pin that emits the sound
     * @param pinEcho pin that listens for the bounce
     */
    //% block="ultrasonic distance in $unit | Trig $pinTrig | Echo $pinEcho"
    //% pinTrig.fieldEditor="gridpicker" pinTrig.fieldOptions.columns=3
    //% pinEcho.fieldEditor="gridpicker" pinEcho.fieldOptions.columns=3
    //% group="External Sensors"
    export function measureDistanceUnits(unit: DistanceUnit, pinTrig: DigitalPinOptions, pinEcho: DigitalPinOptions): number {
        let distanceCm = measureDistance(pinTrig, pinEcho);

        if (unit === DistanceUnit.Centimeters) {
            return distanceCm;
        } else {
            return Math.round(distanceCm / 2.54);
        }
    }

    /**
     * Logic block (Hexagonal): Returns TRUE if there is an object closer than the indicated limit.
     * @param limit maximum distance in cm to react
     * @param pinTrig pin that emits the sound
     * @param pinEcho pin that listens for the bounce
     */
    //% block="obstacle closer than $limit cm? | Trig $pinTrig | Echo $pinEcho"
    //% pinTrig.fieldEditor="gridpicker" pinTrig.fieldOptions.columns=3
    //% pinEcho.fieldEditor="gridpicker" pinEcho.fieldOptions.columns=3
    //% limit.defl=10
    //% group="External Sensors"
    export function detectObstacle(limit: number, pinTrig: DigitalPinOptions, pinEcho: DigitalPinOptions): boolean {
        let distance = measureDistance(pinTrig, pinEcho);
        return distance > 0 && distance <= limit;
    }

    /**
     * Logic block (Hexagonal): Returns TRUE if there is an object further than the indicated limit.
     * @param limit minimum distance in cm to react
     * @param pinTrig pin that emits the sound
     * @param pinEcho pin that listens for the bounce
     */
    //% block="obstacle further than $limit cm? | Trig $pinTrig | Echo $pinEcho"
    //% pinTrig.fieldEditor="gridpicker" pinTrig.fieldOptions.columns=3
    //% pinEcho.fieldEditor="gridpicker" pinEcho.fieldOptions.columns=3
    //% limit.defl=10
    //% group="External Sensors"
    export function obstacleFurtherThan(limit: number, pinTrig: DigitalPinOptions, pinEcho: DigitalPinOptions): boolean {
        let distance = measureDistance(pinTrig, pinEcho);
        return distance > limit || distance === 0;
    }

    /**
     * Test block: Reads the distance and displays it on the LED screen.
     * @param pinTrig pin that emits the sound
     * @param pinEcho pin that listens for the bounce
     */
    //% block="show ultrasonic distance | Trig $pinTrig | Echo $pinEcho"
    //% pinTrig.fieldEditor="gridpicker" pinTrig.fieldOptions.columns=3
    //% pinEcho.fieldEditor="gridpicker" pinEcho.fieldOptions.columns=3
    //% group="External Sensors"
    export function showDistanceScreen(pinTrig: DigitalPinOptions, pinEcho: DigitalPinOptions): void {
        let distance = measureDistance(pinTrig, pinEcho);
        basic.showNumber(distance);
    }

    /**
     * Precise reading mode (turns off LEDs)
     * @param activated turns power saving mode ON or OFF
     */
    //% block="precise reading mode (turn off LEDs) $activated"
    //% activated.shadow="toggleOnOff"
    //% activated.defl=true
    //% group="External Sensors"
    export function preciseReadingMode(activated: boolean): void {
        if (activated) {
            led.enable(false);
        } else {
            led.enable(true);
        }
    }

    /**
     * Reads an external analog soil moisture sensor and returns the percentage (0-100%).
     * @param pin the analog pin where the sensor's signal wire is connected
     */
    //% block="soil moisture sensor (0-100％) on $pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% group="External Sensors"
    export function readMoisture(pin: AnalogPinOptions): number {
        let rawValue = pins.analogReadPin(<number>pin);
        let mappedValue = Math.map(rawValue, 0, 1023, 0, 100);
        return Math.round(Math.constrain(mappedValue, 0, 100));
    }

    /**
     * Reads an external analog light sensor and returns the percentage (0-100%).
     * @param pin the analog pin where the sensor's signal wire is connected
     */
    //% block="external light sensor (0-100％) on $pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% group="External Sensors"
    export function readExternalLight(pin: AnalogPinOptions): number {
        let rawValue = pins.analogReadPin(<number>pin);
        let mappedValue = Math.map(rawValue, 0, 1023, 0, 100);
        return Math.round(Math.constrain(mappedValue, 0, 100));
    }

    /**
     * Reads a potentiometer and returns the percentage (0-100%).
     * @param pin the analog pin where the sensor's signal wire is connected
     */
    //% block="potentiometer (0-100％) on $pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% group="External Sensors"
    export function readPotentiometer(pin: AnalogPinOptions): number {
        let rawValue = pins.analogReadPin(<number>pin);
        let mappedValue = Math.map(rawValue, 0, 1023, 0, 100);
        return Math.round(Math.constrain(mappedValue, 0, 100));
    }

    // ==========================================
    //               ACTUATORS
    // ==========================================

    /**
     * Turns a digital LED ON or OFF.
     * @param pin the digital pin connected to the LED
     * @param on ON to turn on the LED, OFF to turn it off
     */
    //% block="LED on $pin state $on"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% on.shadow="toggleOnOff"
    //% on.defl=true
    //% group="Actuators"
    export function controlLed(pin: DigitalPinOptions, on: boolean): void {
        pins.digitalWritePin(<number>pin, on ? 1 : 0);
    }

    /**
     * Turns a colored LED ON or OFF.
     * @param ledColor the color label of the LED
     * @param pin the digital pin connected to the LED
     * @param on ON to turn on the LED, OFF to turn it off
     */
    //% block="$ledColor LED on $pin state $on"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% on.shadow="toggleOnOff"
    //% on.defl=true
    //% group="Actuators"
    export function controlColoredLed(ledColor: LedColor, pin: DigitalPinOptions, on: boolean): void {
        pins.digitalWritePin(<number>pin, on ? 1 : 0);
    }

    /**
     * Turns a relay ON or OFF.
     * @param pin the digital pin connected to the relay
     * @param on ON to turn on the relay, OFF to turn it off
     */
    //% block="relay on $pin state $on"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% on.shadow="toggleOnOff"
    //% on.defl=true
    //% group="Actuators"
    export function controlRelay(pin: DigitalPinOptions, on: boolean): void {
        pins.digitalWritePin(<number>pin, on ? 1 : 0);
    }

    /**
     * Moves a servomotor to a specific angle (0 to 180 degrees).
     * @param pin the pin where the servo's signal wire is connected
     * @param angle the degrees to move the servo (0-180)
     * @param min angle value 0, max angle value 180, default 90
     */
    //% block="move servo on $pin to $angle degrees"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% angle.min=0 angle.max=180 angle.defl=90
    //% angle.shadow="protractorPicker"
    //% group="Actuators"
    export function moveServo(pin: DigitalPinOptions, angle: number): void {
        pins.servoWritePin(<number>pin, angle);
    }
}