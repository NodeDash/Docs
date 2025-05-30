---
sidebar_position: 1
---

# Providers Overview

Providers in Helium Device Manager enable you to connect to external services and systems, extending the platform's capabilities with additional functionality.

## What Are Providers?

Providers serve as connectors to external services and systems that enhance the Helium Device Manager. Unlike Integrations, which focus on data output destinations, Providers bring new capabilities and services into the platform itself. They act as extensions that add functionality to your device management system.

## Current Provider Types

### ChirpStack Provider

The ChirpStack Provider establishes a connection between Helium Device Manager and a ChirpStack LoRaWAN Network Server (LNS):

- **Complete Setup**: Automatically configures the connection to your ChirpStack instance
- **Application Creation**: Creates a dedicated application in ChirpStack for managing your devices
- **Device Profile Configuration**: Automatically adds standard device profiles for each region (US915, EU868, etc.)
- **HTTP Integration**: Sets up an HTTP integration that routes all device data to Helium Device Manager
- **Real-time Data Flow**: Ensures seamless data exchange between ChirpStack and Helium Device Manager
- **API Integration**: Uses ChirpStack's API for management operations
- **Secure Connectivity**: Supports TLS encryption for secure communications
- **Multi-tenant Support**: Works with ChirpStack's multi-tenant architecture

## Upcoming Provider Types

The Helium Device Manager team is working on expanding the available providers to include:

### Storage Providers

- **Dedicated Database Storage**: Long-term storage solutions for device data
- **Time-Series Optimized**: Specialized storage for IoT time-series data
- **Data Retention Policies**: Configurable data lifecycle management

### Notification Providers

- **Email Services**: Send alerts and reports via email
- **SMS Gateways**: Deliver urgent notifications via text message
- **Push Notifications**: Send alerts to mobile applications

## Provider Management

The Providers page gives you a central place to manage all your external service connections:

Key elements on this screen include:

- **Provider List**: Shows all configured providers with status indicators
- **Add Provider**: Interface to connect new external services
- **Configuration Options**: Settings to customize each provider's behavior

## Setting Up a ChirpStack Provider

To connect Helium Device Manager to a ChirpStack instance:

1. Navigate to **Providers** and click **Add Provider**
2. Enter a unique **Name** for your ChirpStack provider
3. Add an optional **Description** to help identify this provider
4. Select **ChirpStack** as the **Provider Type**
5. Configure the connection details:
   - **API Server**: Enter the hostname of your ChirpStack server (e.g., `api.eu1.hosted-lns.trackpac.io`)
   - **TLS Enabled**: Toggle on if your ChirpStack server uses HTTPS
   - **API Port**: Enter the port number (typically `443` for TLS or `8080` for non-TLS)
   - **API Token**: Enter your ChirpStack API token
     - You can generate this in your ChirpStack UI under API Keys
   - **Tenant ID**: Enter your ChirpStack tenant identifier
6. Click **Create** to establish the connection

## Benefits of the Provider Architecture

The provider-based architecture of Helium Device Manager offers several advantages:

- **Modularity**: Add only the services you need
- **Flexibility**: Choose the external systems that work best for your use case
- **Scalability**: Start simple and add more capabilities as your needs grow
- **Future-proofing**: New provider types can be added without changing the core platform
- **Integration Simplicity**: Connect once at the provider level rather than configuring each integration separately
