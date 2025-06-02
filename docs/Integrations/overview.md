---
sidebar_position: 1
---

# Integrations Overview

Integrations allow you to connect your IoT device data from the Helium network to external systems, applications, and services.

## What Are Integrations?

Integrations in NodeDash are connections to external services that can receive data from your devices. They act as destinations in your data flows, allowing device data to be sent to cloud platforms, databases, visualization tools, or any custom system.

## Types of Integrations

NodeDash supports two primary types of integrations:

### HTTP Integrations

HTTP integrations send data to web services using REST APIs:

- **RESTful Endpoints**: Send data to any endpoint that accepts HTTP requests
- **Webhooks**: Trigger actions in other systems when device data is received
- **Cloud Platforms**: Connect to AWS IoT, Azure IoT, Google Cloud IoT, etc.
- **Custom Web Services**: Send data to your own web applications

### MQTT Integrations

MQTT integrations publish data to message brokers using the MQTT protocol:

- **MQTT Brokers**: Publish to public or private MQTT brokers
- **IoT Platforms**: Connect to platforms like HiveMQ, Mosquitto, or AWS IoT Core
- **Local Brokers**: Publish to on-premises MQTT brokers
- **Message Patterns**: Support for various messaging patterns including publish/subscribe

## Integration Management

The Integrations page provides a central place to manage all your external connections:

Key elements on this screen include:

- **Integration List**: Shows all configured integrations with status indicators
- **Type Icons**: Visual indicators of integration type (HTTP/MQTT)
- **Status Indicators**: Shows if integrations are active or inactive
- **Add Integration**: Button to create new integrations
- **Integration Actions**: Menu for editing, testing, or deleting integrations

## Creating a New Integration

To create a new integration:

1. Navigate to the **Integrations** page
2. Click the **Add Integration** button
3. Select the integration type (HTTP or MQTT)
4. Configure the integration-specific settings

### HTTP Integration Configuration

When creating an HTTP integration, you'll need to configure:

- **Name**: A descriptive name for the integration
- **URL**: The endpoint URL to send data to
- **Method**: HTTP method to use (POST, PUT, or PATCH)
- **Headers**: Any required HTTP headers (e.g., authentication headers)
- **Authentication**: Options include none, basic auth, or API key
- **Content Type**: Format of the payload (JSON, XML, form, etc.)
- **Timeout**: Maximum time to wait for a response
- **Retry Strategy**: How to handle failed requests
- **Success Codes**: HTTP status codes to consider successful

### MQTT Integration Configuration

When creating an MQTT integration, you'll need to configure:

- **Name**: A descriptive name for the integration
- **Broker URL**: The address of the MQTT broker
- **Port**: The port number (typically 1883 or 8883 for TLS)
- **Client ID**: A unique identifier for the connection
- **Username/Password**: Credentials if required by the broker
- **Topic**: The MQTT topic to publish to
- **QoS**: Quality of Service level (0, 1, or 2)
- **Retain Flag**: Whether messages should be retained by the broker
- **TLS/SSL**: Security settings for encrypted connections
- **Last Will**: Message to send if the connection drops unexpectedly

## Using Integrations in Flows

Once created, integrations can be added to flows as destinations:

1. Open or create a flow in the Flow Editor
2. Drag the integration from the component palette to the canvas
3. Connect a device or function output to the integration input
4. Configure any integration-specific parameters for this flow
5. Save and deploy the flow

## Integration Execution and Monitoring

When an integration receives data from a flow:

1. The integration formats the data according to its configuration
2. It sends the data to the configured destination
3. It records the response or acknowledges successful delivery
4. The status and details are logged in the integration history

### Integration History

The Integration History provides a detailed record of all data sent through the integration:

- **Success/Failure Status**: Whether the integration delivered successfully
- **Timestamp**: When the integration was triggered
- **Input Data**: The data received by the integration
- **Response Data**: The response from the destination system
- **Execution Time**: How long the integration took to process
- **Error Details**: Any error information if the integration failed

## Testing Integrations

Before using an integration in a production flow, you can test it:

1. Open the integration details
2. Go to the **Test** tab
3. Enter sample payload data
4. Click **Send Test** to execute the integration
5. View the results and response

## Integration Patterns and Best Practices

### Pattern: Data Transformation Before Integration

For maximum compatibility, use a function to transform your data before sending it to an integration:

```
[Device] ────→ [Function] ────→ [Integration]
```

### Pattern: Redundant Destinations

For critical data, send to multiple destinations for redundancy:

```
                ┌────→ [Primary Integration]
[Device] ────→ [Function]
                └────→ [Backup Integration]
```

### Best Practices

- **Use Descriptive Names**: Name integrations based on their purpose and destination
- **Handle Credentials Securely**: Use appropriate authentication methods
- **Implement Error Handling**: Configure retry strategies for intermittent failures
- **Monitor Integration Health**: Regularly check integration history for failures
- **Test Before Deployment**: Always test integrations with sample data before use in production
- **Document External Dependencies**: Keep records of external systems your integrations connect to
- **Set Appropriate Timeouts**: Configure timeouts based on expected response times

## Next Steps

- Learn how to [Create HTTP Integrations](./http-integrations)
- Explore how to [Set Up MQTT Integrations](./mqtt-integrations)
- Understand [Integration Security Best Practices](./security)
- See [Integration Examples](./examples) for common use cases
