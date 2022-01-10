enum RadioMessage {
    message1 = 49434,
    Test = 2239,
    Start = 56380,
    Follow = 44477,
    StopFollowing = 46389,
    Abbrechen = 21951,
    Kompass = 23398
}
radio.onReceivedNumber(function (receivedNumber) {
    Wert = receivedNumber
})
radio.onReceivedValue(function (name, value) {
    if (name == "nicken") {
        NeigungswertController = value
    }
})
let NeigungswertController = 0
let Wert = 0
radio.setGroup(69)
radio.setTransmitPower(20)
let Folgen_oder_nicht_oder_Abbrechen = 2
basic.forever(function () {
    if (Wert <= -1) {
        if (Wert < -45) {
            motors.dualMotorPower(Motor.A, 1000)
            motors.dualMotorPower(Motor.B, 40)
        } else {
            motors.dualMotorPower(Motor.B, 50)
        }
    } else if (Wert >= 1) {
        if (Wert >= 45) {
            motors.dualMotorPower(Motor.B, 1000)
            motors.dualMotorPower(Motor.A, 45)
        } else {
            motors.dualMotorPower(Motor.A, 50)
        }
    } else {
        motors.dualMotorPower(Motor.AB, NeigungswertController)
        basic.clearScreen()
        radio.sendNumber(input.temperature())
    }
})
