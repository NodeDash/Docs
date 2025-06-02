---
sidebar_position: 1
---

# Flows Overview

Flows are at the heart of NodeDash, providing a visual, flow-based interface for routing data between devices, functions, and integrations.

## What Are Flows?

Flows in NodeDash are visual representations of how data should move through your IoT system. They define the path from data source (devices) through processing steps (functions) to destinations (integrations).

Using the intuitive drag-and-drop flow editor, you can create sophisticated data routing rules without writing code (except for custom functions when needed).

## Flow Components

A flow consists of three main types of components:

### Sources

Sources generate data in your flow:

- **Devices**: Individual IoT devices that send data
- **Labels**: Groups of devices that share common characteristics

### Processors

Processors transform data as it moves through your flow:

- **Functions**: Custom JavaScript code that manipulates data

### Destinations

Destinations receive the processed data:

- **HTTP Integrations**: Send data to REST APIs or webhooks
- **MQTT Integrations**: Publish data to MQTT brokers

## Flows Dashboard

The Flows dashboard is the central hub for managing all your flows in NodeDash:

### All Flows View

This main view displays a table of all your flows with the following columns:

- **Name**: The name of your flow and its description
- **Status**: Current status of the flow
- **Last Updated**: Date and time when the flow was last modified
- **Actions**: Buttons to interact with each flow:
  - **View**: Opens the flow editor to see and modify the flow
  - **Edit**: Directly edit flow properties
  - **History**: View execution history for this specific flow
  - **Delete**: Remove the flow from the system

### All Flow History

Below the flows list, you'll find the comprehensive history section showing:

- Execution logs for all flows in chronological order
- Timestamps and duration of each execution
- Success/failure status for each execution
- Expandable sections to view the detailed data for each execution

### Using the Flow Dashboard

- **Filter results**: Use the filter button to narrow down flows or history entries
- **Refresh data**: Update the lists with the latest information
- **Adjust entries shown**: Control how many entries appear per page
- **Navigate pages**: Use pagination controls to move between pages of results

## Flow Editor Interface

The flow editor provides an intuitive canvas for creating and managing your data flows:

Key elements of the interface include:

- **Navigation Sidebar**: Quick access to Dashboard, Flows, Devices, Labels, Functions, Integrations, and Providers
- **Canvas**: A grid-based workspace where you build your flow by placing and connecting nodes
- **Node Cards**: Visual representations of devices (gray), functions (purple), and integrations (green)
- **Toolbar**: Top controls for flow management including Save and Lock Flow options
- **Canvas Controls**: Zoom in/out controls and grid navigation tools
- **Add Node**: Button to add new components to your flow
- **Connection Lines**: Visualize the data path between nodes

## Creating a Basic Flow

To create a basic flow:

1. **Navigate to Flows**: Click on "Flows" in the left navigation sidebar
2. **Access the Create Flow modal**: Click the "Add Flow" button in the top right corner
3. **Configure your new flow**:

   - Enter a **Flow Name** (required field marked with \*)
   - Add an optional **Description** to document your flow's purpose
   - Click "Save Flow" to create the flow (or "Cancel" to abort)

4. **Open the flow editor**: After creating the flow, click the "View" button on your flow in the list
5. **Add your first node**: Click the "+ Add Node" button in the top right corner
   - Select a device or label as your data source (appears as a gray node with document icon)
6. **Add a processing node**: Click "+ Add Node" again to add a function
   - Select or create a function to process your data (appears as a purple node with code icon)
7. **Add a destination node**: Click "+ Add Node" again to add an integration
   - Select an integration to receive your data (appears as a green node with connection icon)
8. **Connect the nodes**: Click and drag between nodes to create data flow connections
9. **Save your flow**: Click the "Save" button in the header if you see "Unsaved changes" warning
10. **Lock when complete**: Use the "Lock Flow" button to prevent accidental changes (can be later unlocked)

## Flow Execution Process

When a flow is triggered:

1. A device sends data to the Helium Network
2. ChirpStack forwards this data to the NodeDash
3. The system identifies which flows include the source device
4. Data flows through the connected nodes following the defined paths
5. Functions process and transform the data
6. Integrations receive the processed data and send it to external systems
7. The system logs all execution details for monitoring and debugging

## Flow Patterns

### Pattern: Simple Data Forwarding

Connect a device directly to an integration to forward all data without processing:

```
[Device] ────→ [Integration]
```

### Pattern: Data Transformation

Process device data before sending it to a destination:

```
[Device] ────→ [Function] ────→ [Integration]
```

This is shown in the example flow "Glamos Walker" where data flows from a device ("Neil's Glamos") through a processing function ("Glamos Walker Decoder") to an external integration ("Pipedream").

### Pattern: Multi-destination Routing

Send data to multiple destinations:

```
                 ┌────→ [HTTP Integration]
[Device] ────→ [Function] ────→ [MQTT Integration]
                 └────→ [Storage]
```

### Pattern: Data Filtering

Use functions to filter data based on content:

```
[Temperature Sensor] ────→ [Temperature Filter Function] ────→ [Alert Integration]
```

### Pattern: Device Group Processing

Process data from multiple devices using a label:

```
[Sensors Label] ────→ [Aggregation Function] ────→ [Dashboard Integration]
```

## Flow Management

The Flows page provides a comprehensive interface for managing all your flows:

- **All Flows List**: View a table of all your flows with details like status and last updated time
- **Flow Actions**: Each flow has action buttons for View, Edit, History, and Delete operations
- **Filter & Refresh**: Use the Filter button to narrow down flows and Refresh to update the list
- **Add Flow**: Create new flows using the Add Flow button in the top right
- **Pagination**: Navigate through multiple pages of flows when you have many flows
- **Flow History**: View execution history of all flows including timestamps, triggers, and execution details
- **Lock/Unlock**: Toggle between Lock Flow and Unlock Flow to prevent or allow modifications
- **Version Information**: See the Device Manager version at the bottom of the interface

## Flow Monitoring

The NodeDash provides comprehensive tools to monitor your flows:

- **Flow History**: View a detailed execution log table with the following information:
  - **Timestamp**: When the flow execution occurred
  - **Name**: The flow that was executed
  - **Trigger**: What initiated the flow (e.g., device_uplink)
  - **Status**: Success or error status of the execution
  - **Duration**: Execution time in milliseconds
  - **Input Data**: The data that triggered the flow (expandable)
  - **Output Data**: The processed data after flow execution (expandable)
  - **Execution Path**: The path the data took through the flow (expandable)
  - **Error Details**: Any errors that occurred during execution
- **Visual Indicators**: See active flows and execution status on the canvas
- **History Button**: Quick access to a specific flow's execution history
- **Filter & Refresh**: Filter history entries or refresh to see latest executions

## Best Practices

- **Start Simple**: Begin with basic flows and add complexity gradually
- **Use Naming Conventions**: Name flows and components descriptively
- **Document Your Flows**: Add descriptions to explain what each flow does
- **Test Thoroughly**: Use the flow testing tools before deploying
- **Monitor Performance**: Check flow execution times and optimize as needed
- **Organize with Labels**: Use labels to manage groups of devices efficiently
- **Separate Concerns**: Create multiple focused flows instead of one complex flow
