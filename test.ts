// tests go here; this will not be compiled when this package is used as an extension.

input.onButtonPressed(Button.A, function () {
    BitModules.controlColoredLed(BitModules.LedColor.Red, BitModules.DigitalPinOptions.P8, true)
    BitModules.controlColoredLed(BitModules.LedColor.Green, BitModules.DigitalPinOptions.P9, true)
})
input.onButtonPressed(Button.B, function () {
    BitModules.controlColoredLed(BitModules.LedColor.Red, BitModules.DigitalPinOptions.P8, false)
    BitModules.controlColoredLed(BitModules.LedColor.Green, BitModules.DigitalPinOptions.P9, false)
})
basic.forever(function () {
    if (BitModules.temperatureAlarm(32)) {
        BitModules.controlRelay(BitModules.DigitalPinOptions.P0, true)
        basic.showIcon(IconNames.Sad)
    } else {
        BitModules.controlRelay(BitModules.DigitalPinOptions.P0, false)
        basic.showIcon(IconNames.Happy)
    }
})
