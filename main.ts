function Enter_Password () {
    basic.showNumber(PASSWORD)
    PASSWORD += 1
}
function Servo_CLOSE () {
    rekabit.setServoPosition(ServoChannel.S1, 180)
}
input.onGesture(Gesture.EightG, function () {
    Servo_OPEN()
})
function UV_LED () {
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.pause(10000)
    pins.digitalWritePin(DigitalPin.P12, 0)
}
input.onButtonPressed(Button.A, function () {
    Enter_Password()
})
function Look_For_Parcel () {
    Ultrsonic_Sensing = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    if (Ultrsonic_Sensing <= 50) {
        esp8266.sendTelegramMessage("7457652921:AAFzpQjQaW51EVtsrgDIjF3Agywtq2YsAow", "490499825", "You Got New Parcel!!")
        UV_LED()
    }
}
input.onButtonPressed(Button.B, function () {
    Servo_CLOSE()
})
function Servo_OPEN () {
    rekabit.setServoPosition(ServoChannel.S1, 90)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (PASSWORD == 3) {
        Servo_OPEN()
    }
})
input.onGesture(Gesture.ThreeG, function () {
    Servo_CLOSE()
})
let PASSWORD = 0
let Ultrsonic_Sensing = 0
esp8266.init(SerialPin.P16, SerialPin.P15, BaudRate.BaudRate115200)
esp8266.connectWiFi("Z flip 4", "dtfw4233")
Ultrsonic_Sensing = 0
Servo_CLOSE()
PASSWORD = 0
if (esp8266.isESP8266Initialized()) {
    rekabit.setRgbPixelColor(0, 0x00ff00)
} else {
    rekabit.setRgbPixelColor(0, 0xff0000)
}
if (esp8266.isWifiConnected()) {
    rekabit.setRgbPixelColor(1, 0x00ff00)
} else {
    rekabit.setRgbPixelColor(1, 0xff0000)
}
basic.forever(function () {
    Look_For_Parcel()
})
