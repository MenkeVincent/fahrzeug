enum RadioMessage {
    message1 = 49434,
    Test = 2239,
    Start = 56380,
    Follow = 44477,
    StopFollowing = 46389,
    Abbrechen = 21951,
    Kompass = 23398
}
radio.onReceivedMessage(RadioMessage.Abbrechen, function () {
    Folgen_oder_nicht_oder_Abbrechen = 3
})
radio.onReceivedMessage(RadioMessage.Follow, function () {
    Folgen_oder_nicht_oder_Abbrechen = 1
})
radio.onReceivedMessage(RadioMessage.StopFollowing, function () {
    Folgen_oder_nicht_oder_Abbrechen = 2
})
radio.onReceivedValue(function (name, value) {
    if (name == "compass") {
        KompasswertController = value
    }
    if (name == "Neigung") {
        NeigungswertController = value
    }
})
let abweichungzugering = 0
let NeigungswertController = 0
let KompasswertController = 0
let Folgen_oder_nicht_oder_Abbrechen = 0
radio.setGroup(69)
radio.setTransmitPower(20)
Folgen_oder_nicht_oder_Abbrechen = 2
basic.forever(function () {
    while (Folgen_oder_nicht_oder_Abbrechen == 1) {
        if (input.compassHeading() - KompasswertController < 5) {
            abweichungzugering = 1
        } else {
            abweichungzugering = 0
        }
        if (360 - input.compassHeading() < 180 && abweichungzugering == 0) {
            while (KompasswertController - input.compassHeading() >= 5) {
                motors.dualMotorPower(Motor.A, -6)
                motors.dualMotorPower(Motor.B, 6)
            }
        } else if (360 - input.compassHeading() > 180 && abweichungzugering == 0) {
            while (KompasswertController - input.compassHeading() >= 5) {
                motors.dualMotorPower(Motor.B, -6)
                motors.dualMotorPower(Motor.A, 6)
            }
        } else {
            if (Folgen_oder_nicht_oder_Abbrechen == 1 && abweichungzugering == 1) {
                motors.dualMotorPower(Motor.AB, NeigungswertController)
            }
        }
    }
})
