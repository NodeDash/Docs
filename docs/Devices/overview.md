---
sidebar_position: 1
---

# Devices Overview

Devices are the foundation of your IoT ecosystem in NodeDash, representing the physical hardware that collects and transmits data from the field.

## What Are Devices?

Devices in NodeDash represent physical IoT hardware connected to the Helium Network through ChirpStack. Each device has a unique identifier (DevEUI) and can send data (uplink) and receive commands (downlink).

## Device Dashboard

The Devices dashboard provides a central place to monitor and manage all your connected devices:

Key elements on this screen include:

- **Device List**: Shows all registered devices with key information
- **Status Indicators**: Visual indicators of device online/offline status
- **Last Seen**: Timestamp of the last communication from each device
- **Search & Filter**: Tools to find specific devices
- **Add Device**: Button to register new devices

## Device Details

Clicking on a device in the list opens the Device Details view, which provides comprehensive information about the selected device across several tabs:

### Overview Tab

The Overview tab shows essential device information:

- **Device Name**: User-friendly name for the device
- **DevEUI**: Unique device identifier
- **AppEUI**: Application identifier
- **AppKey**: Secret key for LoRaWAN OTAA activation
- **Status**: Current device status (online/offline/maintenance)
- **Last Seen**: Last communication timestamp
- **Labels**: Labels assigned to this device
- **Description**: Optional device description

### Data Tab

The Data tab shows the most recent data received from the device:

- **Payload Viewer**: Raw and decoded payload data
- **Data History**: Recent data points with timestamps
- **Data Visualization**: Charts for numeric data (where applicable)

### History Tab

The History tab provides a complete audit trail of device activities:

- **Uplink Messages**: Data sent from the device
- **Downlink Messages**: Commands sent to the device
- **Status Changes**: When the device went online/offline
- **Configuration Changes**: Changes to device settings

### Configuration Tab

The Configuration tab allows you to manage device settings:

- **Basic Settings**: Name, description, expected transmit time
- **Labels Management**: Assign or remove labels
- **Advanced Settings**: Device-specific configuration options

### Downlink Tab

The Downlink tab provides tools to send commands to the device:

- **Message Composer**: Interface to create downlink messages
- **Queue Management**: View and manage pending downlink messages
- **Message History**: Log of previously sent messages

## Adding a New Device

To add a new device to NodeDash:

1. Click the **Add Device** button on the Devices page
2. Enter the required device information:
   - **Name**: A user-friendly name for the device
   - **DevEUI**: The unique device identifier (16 hexadecimal characters)
   - **AppEUI**: The application identifier (16 hexadecimal characters)
   - **AppKey**: The application key (32 hexadecimal characters)
3. Configure optional settings:
   - **Description**: Additional information about the device
   - **Labels**: Assign the device to one or more labels
   - **Expected Transmit Time**: How often the device should send data
4. Click **Save** to register the device

## Device Status Monitoring

NodeDash automatically monitors device status based on communication patterns:

- **Online**: Device has communicated within its expected transmission window
- **Offline**: Device has not communicated for longer than its expected window
- **Maintenance**: Device has been manually set to maintenance mode

The system can alert you when devices go offline or fail to communicate on schedule.

## Device Data Flow

When a device sends data, the following happens:

1. The physical device transmits data through the Helium Network
2. ChirpStack receives this data and forwards it to NodeDash
3. NodeDash records the data in the device history
4. Any flows that include this device as a source are triggered
5. The data can be viewed in the Device Details page

## Working with Device Labels

Labels help you organize devices by any criteria you choose:

- **Create labels** based on device type, location, project, etc.
- **Assign devices** to one or more labels
- **Use labels in flows** to process data from groups of devices
- **Filter the device list** by labels to focus on specific device groups

## Device Management Best Practices

- **Use Descriptive Names**: Name devices in a way that identifies their purpose and location
- **Document Your Devices**: Add detailed descriptions including physical location, purpose, and maintenance notes
- **Organize with Labels**: Create a consistent labeling system for your devices
- **Monitor Expected Transmit Times**: Set appropriate expected transmission intervals to detect offline devices promptly
- **Review Device History**: Regularly check device history to identify patterns or issues
- **Secure Your Credentials**: Store device AppKeys securely
- **Implement Device Updates**: Plan and schedule firmware updates during low-usage periods
- **Track Battery Status**: For battery-powered devices, monitor battery levels and plan replacements

## Next Steps

- Learn how to [Add a New Device](./adding-devices)
- Understand how to [Work with Device Labels](../labels/overview)
- See how to [Send Downlink Messages](./downlink-messages)
- Explore [Device Management Best Practices](./best-practices)
