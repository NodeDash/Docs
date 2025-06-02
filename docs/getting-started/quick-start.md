---
sidebar_position: 1
---

# Quick Start Guide

This guide will help you quickly get up and running with NodeDash. Follow these steps to set up your first device, function, integration, and flow.

## 1. Initial Setup

After accessing NodeDash (either via [heliumdevicemanager.com](https://heliumdevicemanager.com) or your self-hosted installation), there are a few initial setup steps to complete:

### First Login

1. Open your browser and navigate to your NodeDash URL:
   - For cloud users: [heliumdevicemanager.com](https://heliumdevicemanager.com)
   - For self-hosted: Your configured URL (default: `http://localhost:3000`)
2. On first launch, you'll be prompted to create an administrator account
3. Fill in your details:
   - Email address
   - Username
   - Password (make it strong and secure)
4. Click **Create Account** to continue

### Add ChirpStack Provider

Before you can manage devices, you need to connect NodeDash to your ChirpStack instance using a Provider:

1. Navigate to **Providers** in the left sidebar
2. Click **Add Provider**
3. Fill in the provider details:
   - **Name**: Enter a unique name for your ChirpStack provider (e.g., "Main ChirpStack LNS")
   - **Description**: Optional description to help identify this provider
   - **Provider Type**: Select **ChirpStack** from the dropdown
4. Enter the connection details:
   - **API Server**: Enter your ChirpStack server hostname (e.g., `api.eu1.hosted-lns.trackpac.io`)
   - **TLS Enabled**: Toggle on if your ChirpStack server uses HTTPS
   - **API Port**: Enter the port number (typically `443` for TLS or `8080` for non-TLS)
   - **API Token**: Enter your ChirpStack API token
     - You can generate this in your ChirpStack UI under API Keys
   - **Tenant ID**: Enter your ChirpStack tenant identifier
5. Click **Create** to establish the connection

Once connected, the provider will automatically:

- Create a dedicated application in ChirpStack
- Add standard device profiles for each region (US915, EU868, etc.)
- Set up an HTTP integration to route device data to NodeDash

## 2. Create Organization Labels

Let's set up a basic organizational structure with labels:

1. Go to the **Labels** section in the main navigation
2. Click **Add Label**
3. Create a "Temperature Sensors" label:
   - **Name**: Temperature Sensors
4. Click **Save**
5. Repeat to create another label:
   - **Name**: Office Building
   - **Description**: Devices in the main office

## 3. Register Your First Device

Now, let's add a device to NodeDash:

1. Go to the **Devices** section in the main navigation
2. Click **Add Device**
3. Fill in the device details:
   - **Name**: Office Temperature Sensor 1
   - **DevEUI**: Enter your device's EUI (16 hex characters)
   - **AppEUI**: Enter your application EUI (16 hex characters)
   - **AppKey**: Enter your application key (32 hex characters)
   - **Description**: Temperature sensor in the main office reception area
   - **Expected Transmit Time**: 15 (minutes)
4. In the **Labels** section, select both "Temperature Sensors" and "Office Building"
5. Click **Save** to register the device

:::tip
If you don't have a physical device ready, you can continue with the guide to understand the workflow. You'll be able to see the full functionality once a real device sends data.
:::

## 4. Create a Custom Function

Next, let's create a function to process temperature data:

1. Go to the **Functions** section in the main navigation
2. Click **Add Function**
3. Fill in the function details:
   - **Name**: Temperature Converter
   - **Description**: Converts Celsius to Fahrenheit and adds temperature alerts
4. Define the parameters:
   - Click **Add Parameter**
   - **Name**: alertThreshold
   - **Type**: number
   - **Description**: Temperature threshold in Celsius for triggering alerts
   - **Default Value**: 30
   - **Required**: Yes
5. In the code editor, paste this JavaScript function:

```javascript
/**
 * Convert temperature from Celsius to Fahrenheit and check alert threshold
 *
 * @param {Object} input - Device data from the flow
 * @param {Object} params - Function parameters
 * @returns {Object} - Transformed data with Fahrenheit and alert status
 */
function process(input, params) {
  // Default response if no temperature data is found
  let result = {
    ...input,
    data: input.data || {},
  };

  // Check if temperature data exists
  if (input.data && typeof input.data.temperature === "number") {
    const celsius = input.data.temperature;
    const fahrenheit = (celsius * 9) / 5 + 32;
    const isAlert = celsius > params.alertThreshold;

    // Add calculated fields to the data object
    result.data = {
      ...input.data,
      temperature_c: celsius,
      temperature_f: fahrenheit,
      is_alert: isAlert,
      threshold: params.alertThreshold,
    };
  }

  return result;
}
```

6. Click **Save** to create the function

## 5. Set Up an HTTP Integration

Now, let's create an HTTP integration to send data to an external system:

1. Go to the **Integrations** section in the main navigation
2. Click **Add Integration**
3. Select **HTTP Integration**
4. Fill in the integration details:
   - **Name**: Temperature Dashboard API
   - **Description**: Sends temperature data to the cloud dashboard
   - **URL**: Enter the API endpoint URL (e.g., `https://example.com/api/data`)
   - **Method**: POST
   - **Headers**: Add a content-type header
     - **Name**: Content-Type
     - **Value**: application/json
   - **Authentication**: Select the appropriate method if your API requires authentication
5. Click **Test Integration** if you want to verify it works
6. Click **Save** to create the integration

## 6. Create Your First Flow

Now, let's tie everything together with a flow:

1. Go to the **Flows** section in the main navigation
2. Click **Add Flow**
3. Fill in the flow details:
   - **Name**: Temperature Monitoring
   - **Description**: Process and forward temperature data to the dashboard
4. In the visual flow editor:
   - Drag the "Temperature Sensors" label from the left sidebar to the canvas
   - Drag the "Temperature Converter" function to the canvas
   - Drag the "Temperature Dashboard API" integration to the canvas
   - Connect the components by clicking and dragging from output ports to input ports:
     - Connect Temperature Sensors → Temperature Converter
     - Connect Temperature Converter → Temperature Dashboard API
5. Click on the Temperature Converter node to configure it:
   - Set `alertThreshold` to 28
6. Click **Save & Deploy** to activate your flow

## 7. Test Your Flow

To test your flow with real data:

1. Ensure your physical device is sending data to the Helium Network and ChirpStack
2. Go to the **Flows** section and click on your "Temperature Monitoring" flow
3. Click **View History** to see execution records once data starts flowing
4. You can also:
   - Go to the **Devices** section and check your device's data
   - Examine the **Function History** to see data transformations
   - Check the **Integration History** to verify data is being sent to your external system

## 8. Monitor Your Device

To monitor your device:

1. Go to the **Devices** section
2. Click on your "Office Temperature Sensor 1" device
3. You'll see the device dashboard with:
   - **Status**: Shows if the device is online or offline
   - **Last Seen**: When the device last communicated
   - **History Table**: Shows a record of all data and events for this device

## Next Steps

Congratulations! You've successfully set up your first device, function, integration, and flow in NodeDash. Here are some next steps to explore:

- Add more devices and organize them with additional labels
- Create more sophisticated functions for data processing
- Set up MQTT integrations to connect to message brokers
- Design complex flows with multiple branches and destinations
- Explore the [Devices](../devices/overview) management features
- Learn more about [Functions](../functions/overview) and advanced JavaScript techniques
- Discover advanced [Flow](../flows/overview) patterns and capabilities

As you build out your IoT system, refer to the specific documentation sections for more detailed information on each component.
