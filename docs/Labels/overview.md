---
sidebar_position: 1
---

# Labels Overview

Labels in NodeDash provide a powerful way to organize and group your IoT devices for easier management and more flexible data routing.

## What Are Labels?

Labels are tags that can be assigned to devices to create logical groupings based on any criteria you choose. They allow you to manage collections of devices together rather than individually, making your IoT deployment more scalable and manageable.

## Key Benefits of Labels

- **Simplified Management**: Manage groups of related devices together
- **Flexible Organization**: Group devices by location, type, project, or any other criteria
- **Efficient Flow Creation**: Target entire groups of devices in a single flow
- **Dynamic Device Inclusion**: Automatically include new devices in flows by assigning labels
- **Hierarchical Organization**: Create a structured device organization system

## Labels Dashboard

The Labels dashboard provides a central interface for managing all your device groupings:

Key elements on this screen include:

- **Labels List**: Shows all created labels with device counts
- **Filter Options**: Tools to search and filter your labels
- **Add Label**: Button to create new labels
- **Label Actions**: Menu for editing, viewing devices, or deleting labels

## Creating a New Label

To create a new label:

1. Navigate to the **Labels** page
2. Click the **Add Label** button
3. Enter a name for your label (e.g., "Temperature Sensors", "Building A", "Project Alpha")
4. Optionally add a description to explain the label's purpose
5. Choose a color for visual identification (optional)
6. Click **Save** to create the label

## Managing Device Assignments

There are two ways to assign devices to labels:

### From the Labels Detail View:

1. Click on a label in the Labels list
2. In the Label Details view, click **Add Devices**
3. Select devices from the list to add to this label
4. Click **Add Selected Devices**

### From the Device Details View:

1. Navigate to the Device Details for a specific device
2. Go to the **Configuration** tab
3. Under the Labels section, click **Edit**
4. Check the boxes for labels you want to assign
5. Click **Save** to apply the changes

## Using Labels in Flows

Labels serve as powerful sources in your data flows. When you use a label as a source, any data from any device with that label will trigger the flow.

To use a label in a flow:

1. Open the Flow Editor
2. Drag the label from the component palette to the canvas
3. Connect the label to functions or integrations
4. Configure any additional settings
5. Save and deploy the flow

When deployed, the flow will process data from all devices assigned to that label, including any devices assigned to the label in the future.

## Label Organization Strategies

### Organization by Location

Create a hierarchy of labels based on physical location:

- Region Labels: "East", "West", "North", "South"
- Building Labels: "Building A", "Building B", "Warehouse"
- Floor Labels: "Floor 1", "Floor 2", "Basement"

### Organization by Device Type

Group devices by their function or sensor type:

- Sensor Type: "Temperature", "Humidity", "Motion", "Occupancy"
- Device Model: "Model-X1", "Model-Y2", "Custom"
- Protocol: "LoRaWAN", "BLE", "WiFi"

### Organization by Project

Create labels for specific projects or initiatives:

- Project Names: "Energy Optimization", "Security Monitoring"
- Development Stages: "Pilot", "Production", "Testing"
- Client Names: "Client A", "Client B", "Internal"

### Multi-dimensional Labeling

Since devices can have multiple labels, you can implement a multi-dimensional labeling strategy:

- A temperature sensor on the third floor of Building A in the East region could have labels: "Temperature", "Building A", "Floor 3", "East"
- This allows you to create flows targeting specific combinations (e.g., all temperature sensors in the East region)

## Label History

The Label History provides a record of events related to devices with a specific label:

- **Data Transmissions**: When devices with this label sent data
- **Status Changes**: When devices with this label changed status
- **Flow Executions**: When flows using this label were triggered
- **Assignment Changes**: When devices were assigned to or removed from the label

## Label Management Best Practices

- **Consistent Naming**: Establish a naming convention for your labels
- **Hierarchical Structure**: Create a logical hierarchy for organization
- **Documentation**: Add clear descriptions to explain each label's purpose
- **Regular Review**: Periodically review label assignments for accuracy
- **Avoid Overuse**: Don't create too many labels that serve similar purposes
- **Think Scale**: Design your labeling system to accommodate future growth
- **Use Color Coding**: Leverage colors to visually distinguish label categories
- **Consider Workflows**: Design labels that align with your operational workflows

## Next Steps

- Learn how to [Create and Manage Labels](./managing-labels)
- Understand [Label Organization Strategies](./organization-strategies)
- Explore how to [Use Labels in Flows](./labels-in-flows)
- See [Label Examples](./examples) for common use cases
