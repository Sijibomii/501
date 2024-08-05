#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>

// find a confortable pin
#define SLEEP_PIN 10

static const int RXPin = 16, TXPin = 17;
String fromGSM = "";
String res = "";
char* response = " ";
int c = 0;

void setup()
{
  pinMode(RXPin, INPUT_PULLUP);
  pinMode(TXPin, OUTPUT);
  pinMode(SLEEP_PIN, OUTPUT);
  Serial.begin(115200); // For Serial Monitor
  Serial1.begin(115200, SERIAL_8N1, RXPin, TXPin);
  // Waiting for A9G to setup everything for 20 sec
  delay(20000);
  digitalWrite(SLEEP_PIN, LOW);
  Serial1.println("AT"); // Just Checking
  delay(1000);
  Serial1.println("AT+GPS = 1");      // Turning ON GPS
  delay(1000);
  Serial1.println("AT+GPSLP = 2");      // GPS low power
  delay(1000);
  Serial1.println("AT+SLEEP = 1");    // Configuring Sleep Mode to 1
  delay(1000);

  // remeber to connect sleep pin to a96
  digitalWrite(SLEEP_PIN, HIGH);
}

void loop() {
  //listen from GSM Module
  if (Serial1.available()) {
     char inChar = Serial1.read();
     if (inChar == '\n') {
      //check the state
      if (fromGSM == "OK\r") {
        Serial.println("---------IT WORKS-------");
      }
      else if (fromGSM == "ERROR\r") {
        Serial.println("---------IT DOESNT WORK-------");
      }

      //write the actual response
      Serial.println(fromGSM);
      //clear the buffer
      fromGSM = "";

    } else {
      fromGSM += inChar;
    }
    delay(20);
  }else{
    Serial.print("GPS UNAVAILABLE ..");
  }

   // read from port 0, send to port 1:
  if (Serial.available()) {
    int inByte = Serial.read();
    Serial1.write(inByte);
  }

  digitalWrite(SLEEP_PIN, LOW);
  delay(1000);
  Serial1.println("AT+LOCATION = 2");
  Serial.println("AT+LOCATION = 2");
  while (!Serial1.available());
  while (Serial1.available())
  {
    char add = Serial1.read();
    res = res + add;
    delay(1);
  }

  res = res.substring(17, 38);
  response = &res[0];

  Serial.print("Recevied Data - "); Serial.println(response); // printin the String in lower character form
  Serial.println("\n");

  if (strstr(response, "GPS NOT"))
  {
   Serial.println("No Location data");
  }else{
    int i = 0;
    while (response[i] != ',')
      i++;

    String location = (String)response;
    String lat = location.substring(2, i);
    String longi = location.substring(i + 1);
    Serial.println(lat);
    Serial.println(longi);
  }

}