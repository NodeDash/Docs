---
sidebar_position: 1
---

# Introduction to Helium Device Manager

Welcome to the **Helium Device Manager** documentation! This guide will help you understand and make the most of this powerful, flow-based IoT device management platform.

## What is Helium Device Manager?

Helium Device Manager is a modern, flow-based device management layer that sits on top of ChirpStack to provide an easier option to manage IoT devices connected to the Helium Network. It features a visual, intuitive interface for routing data between devices, functions, and integrations.

You can access Helium Device Manager in multiple ways:

- **Cloud-hosted Solution**: Use our fully-managed service at [heliumdevicemanager.com](https://heliumdevicemanager.com)
- **Self-hosted Deployment**: Install and maintain your own instance using Docker, Node.js, or Kubernetes

## Key Features

- **Visual Flow Editor**: Create and manage data flows with an intuitive drag-and-drop interface
- **Device Management**: Monitor and control IoT devices connected to the Helium Network
- **Custom Functions**: Create and deploy JavaScript functions to transform and process device data
- **Integration Management**: Connect to external services via HTTP and MQTT protocols
- **Label System**: Organize devices with customizable labels for efficient management
- **History Tracking**: View detailed history of devices, functions, integrations and flows
- **Internationalization**: Full support for multiple languages (English, Spanish, French, German)
- **Dark/Light Mode**: User-selectable theme preferences
- **Mobile First Design**: Manage your devices on the move with a fully responsive design

## System Architecture

Helium Device Manager orchestrates data flow from IoT devices to business applications:

![Helium Device Manager Architecture](/img/device-manager-flow.png)

## Core Components

### Flows

[Flows](/docs/Flows/overview) are visual representations of data routing between devices, functions, and integrations. They define how data moves through your system and what happens to it along the way.

### Devices

[Devices](/docs/Devices/overview) represent your physical IoT hardware connected to the Helium Network. Helium Device Manager helps you monitor their status, manage their configuration, and route their data.

### Labels

[Labels](/docs/Labels/overview) help you organize devices into logical groups based on any criteria you choose (location, type, project, etc.). They make device management more efficient and enable targeting groups in flows.

### Functions

[Functions](/docs/Functions/overview) are custom JavaScript code that can transform, filter, and enrich device data. They provide flexibility to adapt data formats and implement business logic.

### Integrations

[Integrations](/docs/Integrations/overview) connect your device data to external systems and services. Helium Device Manager supports HTTP and MQTT integrations to work with virtually any external platform.

### Providers

[Providers](/docs/Providers/overview) are connectors to external services that extend the platform's capabilities. They allow you to integrate with systems like the ChirpStack LoRaWAN Network Server (which automatically configures applications, device profiles, and HTTP integrations), and in the future will support storage, notification services, and other external systems.

## Getting Started

New to Helium Device Manager? Here's how to get started:

1. **Installation**: First, [install Helium Device Manager](/docs/getting-started/installation) in your environment
2. **Quick Start**: Follow our [quick start guide](/docs/getting-started/quick-start) to set up your first device and flow
3. **Explore**: Dive deeper into specific components based on your needs:
   - Learn how to [manage devices](/docs/devices/overview)
   - Create [data processing functions](/docs/functions/overview)
   - Set up [external integrations](/docs/integrations/overview)
   - Design [visual data flows](/docs/flows/overview)

## Use Cases

Helium Device Manager supports a wide range of IoT use cases:

- **Environmental Monitoring**: Track temperature, humidity, air quality data
- **Asset Tracking**: Monitor location and status of valuable assets
- **Smart Agriculture**: Manage soil moisture, weather, and crop conditions
- **Building Management**: Control HVAC systems, lighting, and occupancy
- **Industrial Monitoring**: Track equipment status, production metrics
- **Smart City Applications**: Monitor parking, traffic, waste management
- **Energy Management**: Track consumption, optimize usage patterns

## Community and Support

- Visit our [GitHub repository](https://github.com/helium/helium-device-manager) for the latest updates
- Join the [Helium Discord](https://discord.gg/helium) to connect with the community

Ready to get started? Head to the [Installation Guide](/getting-started/installation)!
