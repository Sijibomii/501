#include <TinyGPS++.h>
#include <SoftwareSerial.h>

// Define the pins for SoftwareSerial
TinyGPSPlus gps;

SoftwareSerial myserial(16, 17); // RX: 16, TX:17
SoftwareSerial gpsSerial(4, 2); // RX, TX pins


String serverName = "https://project501server.wittyocean-bea9e239.eastus.azurecontainerapps.io";

int counter = 0;
unsigned long startMillis;
unsigned long currentMillis;
const unsigned long period = 10000 ;//1 sec perio
void setup() {

  Serial.begin(9600);
  Serial.println("Initializing..........");

   Serial.println("Initializing GPRS MODULE");
   myserial.begin(9600);
    // Set up the GPRS connection
    setupGPRS();
   Serial.println("GPRS MODULE INITIALISED");
    delay(2000);   

}

void loop() {
 
Serial.println("RUNNING MAIN LOOP");

if (gpsSerial.available()) {
    char c = gpsSerial.read();
    if (gps.encode(c)) {
      if (gps.location.isUpdated()) {
        Serial.print("Latitude: ");
        Serial.println(gps.location.lat(), 6);
        Serial.print("Longitude: ");
        Serial.println(gps.location.lng(), 6);
        sendGPRSMessage(gps.location.lat(), gps.location.lng(), serverName)
      }
    }
  }

  delay(2000);   
}


// Function to set up GPRS connection
void setupGPRS() {
  if (myserial.available())
    Serial.write(myserial.read());

  myserial.println("AT");
  delay(3000);
  myserial.println("AT+SAPBR=3,1,\"Contype\",\"GPRS\"");
  delay(6000);
  ShowSerialData();
 
  myserial.println("AT+SAPBR=3,1,\"APN\",\"internet.ng.airtel.com\"");  //APN    internet.ng.airtel.com     web.gprs.mtnnigeria.net
  delay(6000);
  ShowSerialData();
 
  myserial.println("AT+SAPBR=1,1");
  delay(6000);
  ShowSerialData();
 
  myserial.println("AT+SAPBR=2,1");
  delay(6000);
  ShowSerialData();

}

// Function to send a message via GPRS
void sendGPRSMessage(String lat, String lon, String serverName) {
  // Prepare the data to be sent
  String jsonPayload = "{\"lat\":\"" + lat + "\",\"long\":\"" + lon + "\"}";

  myserial.begin(9600);
  myserial.println("AT+HTTPINIT");
  delay(6000);
  ShowSerialData();
 
  myserial.println("AT+HTTPPARA=\"CID\",1");
  delay(6000);
  ShowSerialData();
  
  myserial.println("AT+HTTPPARA=\"URL\",\"" + serverName + "\""); // Server address
  delay(4000);
  ShowSerialData();

  myserial.println("AT+HTTPPARA=\"CONTENT\",\"application/json\"");
  delay(4000);
  ShowSerialData();
 
  myserial.println("AT+HTTPDATA=" + String(jsonPayload.length()) + ",100000");
  delay(2000);
  ShowSerialData();
 
  myserial.println(jsonPayload);
  delay(6000);
  ShowSerialData();

  myserial.println("AT+HTTPSSL=1");
  delay(6000);
  ShowSerialData();
 
  myserial.println("AT+HTTPACTION=1");
  delay(6000);
  ShowSerialData();
 
  myserial.println("AT+HTTPREAD");
  delay(6000);
  ShowSerialData();
 
  myserial.println("AT+HTTPTERM");
  delay(10000);
  ShowSerialData();
}

void ShowSerialData() {
  while (myserial.available() != 0)
  Serial.write(myserial.read());
  delay(1000);
}