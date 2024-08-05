#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <LiquidCrystal_I2C.h>

#define TRIG_PIN 9 // TRIG pin
#define ECHO_PIN 8 // ECHO pin
#define BUZZER 5

float filterArray[20]; // array to store data samples from sensor
float distance;

LiquidCrystal_I2C lcd(0x27,16,2); 

char ssid[] = "MTN_4G_4725C";       // your network SSID (name)
char password[] = "SIJIBOMI11";  // your network key

// For Non-HTTPS requests
WiFiClient client;

// Just the base of the URL you want to connect to
#define TEST_HOST "project501server.wittyocean-bea9e239.eastus.azurecontainerapps.io"

void setup() {
  Serial.begin(115200);

  // Connect to the WiFI
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // lcd
  lcd.init();
  lcd.clear();         
  lcd.backlight(); 
  
}

void makeHTTPRequestAndWriteToLCD() {

  // Opening connection to server (Use 80 as port if HTTP)
  if (!client.connect(TEST_HOST, 80))
  {
    Serial.println(F("Connection failed"));
    return;
  }
  // give the esp a breather
  yield();

  // Send HTTP request
  client.print(F("GET "));

  // This is the second half of a request (everything that comes after the base URL)
  // add ->  to test real route
  client.print("/trip/active"); // %2C == ,
  client.println(F(" HTTP/1.1"));

  //Headers
  client.print(F("Host: "));
  client.println(TEST_HOST);

  client.println(F("Cache-Control: no-cache"));

  if (client.println() == 0)
  {
    Serial.println(F("Failed to send request"));
    return;
  }
  delay(100);
  // Check HTTP status
  char status[32] = {0};
  client.readBytesUntil('\r', status, sizeof(status));
  if (strcmp(status, "HTTP/1.1 200 OK") != 0)
  {
    Serial.print(F("Unexpected response: "));
    Serial.println(status);
    return;
  }

  // Skip HTTP headers
  char endOfHeaders[] = "\r\n\r\n";
  if (!client.find(endOfHeaders))
  {
    Serial.println(F("Invalid response"));
    return;
  }

  while (client.available() && client.peek() != '{')
  {
    char c = 0;
    client.readBytes(&c, 1);
    Serial.print(c);
    Serial.println("BAD");
  }

  DynamicJsonDocument doc(192);

  DeserializationError error = deserializeJson(doc, client);

  if (!error) {
    // write output to lcd here
    String jsonString;

    JsonArray dataArray = doc["data"];

    for (JsonObject item : dataArray) {
      const char* status = item["status"];
      
      Serial.print("Status: ");
      Serial.println(status);
    }

    // serialize to json so I can print out to serial output
    // serializeJson(doc, jsonString);
    // Serial.println(jsonString);
    
  } else {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }
}

void loop() {
  // put your main code here, to run repeatedly:
    // client.setInsecure();
    delay(2000);
    Serial.println("MAKING REQUEST!");
    lcd.setCursor(0,0);  
    lcd.print("TRIPS: ...");  
    makeHTTPRequestAndWriteToLCD();
}