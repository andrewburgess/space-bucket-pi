import sys
import RPi.GPIO as GPIO, time, os

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)

def readPhotocell(pin):
    reading = 0;
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, GPIO.LOW)
    time.sleep(0.1)

    GPIO.setup(pin, GPIO.IN)
    while (GPIO.input(pin) == GPIO.LOW):
        reading += 1
    return reading

print readPhotocell(int(sys.argv[1]))

GPIO.cleanup()
