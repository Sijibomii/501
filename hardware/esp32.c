#define TINY_GSM_MODEM_A7
#include <TinyGsmClient.h>
#include <PubSubClient.h>
#include <WiFi.h>
// #define TINY_GSM_MODEM_SIM800

// Your WiFi credentials.
const char *ssid = "MTN_4G_4725C";
const char *password = "SIJIBOMI11";

// MQTT Broker (Mosquitto) configuration
const char *mqtt_server = "mqtt.politedune-3cd7d659.eastus.azurecontainerapps.io";
const int mqtt_port = 1883; // Default MQTT port
const char *mqtt_user = ""; // MQTT username (if required)
const char *mqtt_pass = ""; // MQTT password (if required)
const char *mqtt_topic = "gps/location";

TinyGsm modem(Serial2); // Use Serial2 for UART communication with A9 module
WiFiClient wifiClient;
PubSubClient client(wifiClient);

void setup() {
  // Set up serial communications
  delay(1000);
  Serial.begin(115200);
  Serial2.begin(115200, SERIAL_8N1, 16, 17); // RX, TX

  // Connect to Wi-Fi
  setupWiFi();

  // Set MQTT server and callback
  client.setServer(mqtt_server, mqtt_port);
  //client.setCallback(callback);

  // Initialize A9 module
  initGSM();

  checkNetworkRegistration();
}

void setupWiFi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void initGSM() {
  Serial2.println("AT"); // Test AT startup
  delay(1000);
  while (Serial2.available()) {
    Serial.write(Serial2.read());
  }

  Serial2.println("AT+CPIN?"); // Check SIM card status
  delay(1000);
  while (Serial2.available()) {
    Serial.write(Serial2.read());
  }

  Serial2.println("AT+CGATT=1"); // Attach to GPRS
  delay(1000);
  while (Serial2.available()) {
    Serial.write(Serial2.read());
  }

  Serial2.println("AT+CREG?"); // Check network registration status
  delay(1000);
  while (Serial2.available()) {
    Serial.write(Serial2.read());
  }

  Serial2.println("AT+CGNSPWR=1"); // Power on the GPS
  delay(1000);
  while (Serial2.available()) {
    Serial.write(Serial2.read());
  }
}

void getGPSData() {
  Serial2.println("AT+CGNSINF"); // Get GNSS information
  delay(1000);
  String gpsData = "";
  while (Serial2.available()) {
    gpsData += (char)Serial2.read();
  }

  Serial.print("GPS Data: ");
  Serial.println(gpsData);

  // Parse GPS data
  if (gpsData.indexOf("+CGNSINF: ") > 0) {
    int idx = gpsData.indexOf("+CGNSINF: ");
    String gps = gpsData.substring(idx + 10);
    String data = gps.substring(0, gps.indexOf("\r"));
    String latitude = data.substring(data.indexOf(",") + 1, data.indexOf(",", data.indexOf(",") + 1));
    String longitude = data.substring(data.indexOf(",", data.indexOf(",") + 1) + 1, data.indexOf(",", data.indexOf(",", data.indexOf(",") + 1) + 1));
    
    Serial.print("Latitude: ");
    Serial.println(latitude);
    Serial.print("Longitude: ");
    Serial.println(longitude);

    // Publish data to MQTT
    publishData(latitude, longitude);
  }
}

void checkNetworkRegistration() {
  bool registered = false;
  while (!registered) {
    Serial2.println("AT+CREG?"); // Check network registration status
    delay(1000);
    while (Serial2.available()) {
      String response = Serial2.readString();
      Serial.println(response);
      if (response.indexOf("+CREG: 0,1") > 0 || response.indexOf("+CREG: 0,5") > 0) {
        registered = true;
        Serial.println("Registered on the network.");
      } else {
        Serial.println("Not registered, waiting...");
        delay(5000); // Wait before retrying
      }
    }
  }
}

void publishData(String latitude, String longitude) {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  String payload = "{\"latitude\": " + latitude + ", \"longitude\": " + longitude + "}";
  client.publish(mqtt_topic, payload.c_str());
  Serial.println("Data published to MQTT.");
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP32Client", mqtt_user, mqtt_pass)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void loop() {
  getGPSData();
  delay(60000); // Wait for 1 minute
}
