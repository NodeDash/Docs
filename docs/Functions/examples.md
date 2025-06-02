---
sidebar_position: 3
---

# Function Examples

This page provides practical examples of functions you can use or adapt in your NodeDash flows. Each example includes the function code, explanation of how it works, and guidance on when to use it.

## Basic Data Transformation Functions

### Temperature Converter (Celsius to Fahrenheit)

This function converts temperature values from Celsius to Fahrenheit and adds an alert flag if the temperature exceeds a threshold.

```javascript
function process(input) {
  // Fixed threshold value
  const threshold = 30;

  if (input.data && input.data.temperature !== undefined) {
    const celsius = input.data.temperature;
    const fahrenheit = (celsius * 9) / 5 + 32;

    return {
      ...input,
      data: {
        ...input.data,
        temperature_c: celsius,
        temperature_f: fahrenheit,
        is_alert: celsius > threshold,
      },
    };
  }

  // If no temperature data, return input unchanged
  return input;
}
```

**When to use:**

- When working with temperature sensors that report in Celsius
- When integrating with systems that require Fahrenheit values
- When you need temperature-based alerting

### GPS Coordinate Formatter

This function standardizes GPS coordinates and calculates additional location metadata.

```javascript
function process(input) {
  if (
    input.data &&
    input.data.latitude !== undefined &&
    input.data.longitude !== undefined
  ) {
    const lat = parseFloat(input.data.latitude);
    const lon = parseFloat(input.data.longitude);

    // Format coordinates to 6 decimal places
    const formattedLat = lat.toFixed(6);
    const formattedLon = lon.toFixed(6);

    // Create Google Maps link
    const mapsUrl =
      "https://www.google.com/maps?q=" + formattedLat + "," + formattedLon;

    return {
      ...input,
      data: {
        ...input.data,
        location: {
          lat: parseFloat(formattedLat),
          lon: parseFloat(formattedLon),
          formatted: formattedLat + ", " + formattedLon,
          maps_url: mapsUrl,
        },
      },
    };
  }

  // If no coordinate data, return input unchanged
  return input;
}
```

**When to use:**

- With GPS/location tracking devices
- When standardizing location data format
- When you need to generate map links from coordinates

## Data Filtering and Validation Functions

### Threshold Filter

This function filters data based on threshold rules, passing through only values that meet specified criteria.

```javascript
function process(input) {
  // Fixed configuration values - modify these as needed
  const field = "value";
  const operator = ">";
  const threshold = 0;
  const action = "filter"; // 'filter' or 'flag'

  if (!input.data || input.data[field] === undefined) {
    return input;
  }

  const value = parseFloat(input.data[field]);
  let passesFilter = false;

  // Evaluate the condition
  switch (operator) {
    case ">":
      passesFilter = value > threshold;
      break;
    case ">=":
      passesFilter = value >= threshold;
      break;
    case "<":
      passesFilter = value < threshold;
      break;
    case "<=":
      passesFilter = value <= threshold;
      break;
    case "==":
      passesFilter = value == threshold;
      break;
    case "!=":
      passesFilter = value != threshold;
      break;
    default:
      passesFilter = true;
  }

  if (action === "filter") {
    // Return null to filter out the data point entirely
    return passesFilter ? input : null;
  } else {
    // Just add a flag but keep the data
    return {
      ...input,
      data: {
        ...input.data,
        passes_filter: passesFilter,
      },
    };
  }
}
```

**When to use:**

- When you only want to process readings above/below certain thresholds
- To filter out erroneous sensor readings
- To create conditional flow branches

### Data Validator

This function validates data integrity and format, ensuring it meets expected patterns before further processing.

```javascript
function process(input) {
  // Fixed configuration - modify these arrays based on your needs
  const requiredFields = ["deviceId", "value"];
  const numberFields = ["value", "temperature"];
  const stringFields = ["deviceId", "status"];
  const action = "flag"; // 'filter' or 'flag'

  // Skip validation if no data
  if (!input.data) {
    return action === "filter"
      ? null
      : {
          ...input,
          data: { validation_passed: false, error: "No data object" },
        };
  }

  const errors = [];

  // Check required fields
  for (const field of requiredFields) {
    if (input.data[field] === undefined || input.data[field] === null) {
      errors.push("Missing required field: " + field);
    }
  }

  // Validate number fields
  for (const field of numberFields) {
    if (input.data[field] !== undefined) {
      const value = input.data[field];
      if (isNaN(parseFloat(value))) {
        errors.push("Field " + field + " is not a valid number");
      }
    }
  }

  // Validate string fields
  for (const field of stringFields) {
    if (input.data[field] !== undefined) {
      const value = input.data[field];
      if (typeof value !== "string") {
        errors.push("Field " + field + " is not a valid string");
      }
    }
  }

  // Determine action based on validation results
  if (errors.length > 0) {
    if (action === "filter") {
      return null;
    } else {
      return {
        ...input,
        data: {
          ...input.data,
          validation_passed: false,
          validation_errors: errors,
        },
      };
    }
  }

  // Validation passed
  return {
    ...input,
    data: {
      ...input.data,
      validation_passed: true,
    },
  };
}
```

**When to use:**

- To validate data before processing
- To ensure required fields are present
- To filter out malformed data early in the flow

## Data Enrichment Functions

### Timestamp Enricher

This function adds various formatted timestamps and timing information to the data payload.

```javascript
function process(input) {
  // Fixed timezone - change as needed
  const timezone = "UTC";
  const now = new Date();

  // Format date in ISO and human-readable formats
  const isoDate = now.toISOString();
  const options = {
    timeZone: timezone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const localDate = now.toLocaleString("en-US", options);

  // Calculate time periods
  const hour = now.getHours();
  const dayPeriod = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const weekday = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ][now.getDay()];

  const weekend = now.getDay() === 0 || now.getDay() === 6;

  // Create timestamp object
  const timestamp = {
    iso: isoDate,
    formatted: localDate,
    timezone: timezone,
    unix: Math.floor(now.getTime() / 1000),
    hour: hour,
    minute: now.getMinutes(),
    second: now.getSeconds(),
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    weekday: weekday,
    is_weekend: weekend,
    day_period: dayPeriod,
  };

  return {
    ...input,
    data: {
      ...input.data,
      timestamp,
    },
  };
}
```

**When to use:**

- To add timestamp information to data points
- When you need time-based conditional processing
- For data that will be stored or visualized with time context

### Weather Enricher (External API Call)

This function makes an external API call to add weather data based on device location.

```javascript
async function process(input) {
  // Requires location data in the input
  if (!input.data || !input.data.latitude || !input.data.longitude) {
    return input;
  }

  // You would need to hardcode your API key here
  const apiKey = "YOUR_API_KEY";
  const lat = input.data.latitude;
  const lon = input.data.longitude;

  try {
    // Make API call to weather service
    // Note: This is a placeholder. In NodeDash,
    // you'd need to implement this using the platform's
    // API calling capabilities or built-in integrations
    const weatherUrl =
      "https://api.example.com/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey;
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();

    // Extract relevant weather information
    const weather = {
      condition: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      wind_speed: weatherData.wind.speed,
    };

    return {
      ...input,
      data: {
        ...input.data,
        weather,
      },
    };
  } catch (error) {
    // Handle error, but still pass through the original data
    return {
      ...input,
      data: {
        ...input.data,
        weather_error: "Failed to fetch weather data",
      },
    };
  }
}
```

**When to use:**

- When you have GPS/location data and want to add weather context
- For environmental monitoring applications
- To correlate sensor readings with weather conditions

## Advanced Functions

### Multi-device Aggregator

This function stores and aggregates data from multiple devices, outputting combined statistics.

```javascript
// Global variable to store device data across executions
// Note: In NodeDash, you'd typically use the platform's state management
// capabilities instead of global variables
const deviceReadings = {};

function process(input) {
  // Fixed configuration values - modify as needed for your use case
  const maxAgeMinutes = 60;
  const maxAgeMs = maxAgeMinutes * 60 * 1000;
  const aggregateField = "value";
  const deviceIdField = "deviceEui";

  if (!input.data || !input[deviceIdField]) {
    return input;
  }

  const deviceId = input[deviceIdField];
  const timestamp = Date.now();

  // Store this reading
  deviceReadings[deviceId] = {
    value: input.data[aggregateField],
    timestamp: timestamp,
  };

  // Clean up old readings
  const validDevices = [];
  for (const [id, data] of Object.entries(deviceReadings)) {
    if (timestamp - data.timestamp <= maxAgeMs) {
      validDevices.push({
        id,
        value: data.value,
        timestamp: data.timestamp,
      });
    } else {
      delete deviceReadings[id];
    }
  }

  // Calculate statistics
  let sum = 0;
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  for (const device of validDevices) {
    sum += device.value;
    min = Math.min(min, device.value);
    max = Math.max(max, device.value);
  }

  const avg = validDevices.length > 0 ? sum / validDevices.length : 0;

  return {
    ...input,
    data: {
      ...input.data,
      aggregation: {
        device_count: validDevices.length,
        sum: sum,
        average: avg,
        min: min === Number.MAX_VALUE ? null : min,
        max: max === Number.MIN_VALUE ? null : max,
        devices: validDevices,
      },
    },
  };
}
```

**When to use:**

- When aggregating data from multiple sensors
- For calculating statistics across a group of devices
- When implementing rules based on collective readings

### Pattern Detector

This function detects patterns in sensor data over time, such as rising/falling trends or threshold crossings.

```javascript
// Store historical values for pattern detection
const deviceHistory = {};

function process(input) {
  // Fixed configuration values - modify as needed for your use case
  const deviceIdField = "deviceEui";
  const valueField = "value";
  const historySize = 5;
  const trendThreshold = 3;
  const stabilityThreshold = 0.05;

  if (
    !input.data ||
    !input[deviceIdField] ||
    input.data[valueField] === undefined
  ) {
    return input;
  }

  const deviceId = input[deviceIdField];
  const currentValue = parseFloat(input.data[valueField]);

  // Initialize history array if needed
  if (!deviceHistory[deviceId]) {
    deviceHistory[deviceId] = [];
  }

  // Add current value to history
  deviceHistory[deviceId].push({
    value: currentValue,
    timestamp: Date.now(),
  });

  // Keep history to specified size
  while (deviceHistory[deviceId].length > historySize) {
    deviceHistory[deviceId].shift();
  }

  // Skip pattern detection if we don't have enough history
  if (deviceHistory[deviceId].length < 2) {
    return input;
  }

  const history = deviceHistory[deviceId];
  const patterns = {
    rising: false,
    falling: false,
    stable: false,
    fluctuating: false,
    consecutive_rise: 0,
    consecutive_fall: 0,
  };

  // Detect rising/falling patterns
  for (let i = 1; i < history.length; i++) {
    if (history[i].value > history[i - 1].value) {
      patterns.consecutive_rise++;
      patterns.consecutive_fall = 0;
    } else if (history[i].value < history[i - 1].value) {
      patterns.consecutive_fall++;
      patterns.consecutive_rise = 0;
    } else {
      // Value unchanged
      patterns.consecutive_rise = 0;
      patterns.consecutive_fall = 0;
    }
  }

  // Determine pattern type
  patterns.rising = patterns.consecutive_rise >= trendThreshold;
  patterns.falling = patterns.consecutive_fall >= trendThreshold;

  // Calculate stability (standard deviation)
  const values = history.map((h) => h.value);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
  const variance =
    squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  const stdDev = Math.sqrt(variance);

  // Define stability threshold as percentage of mean
  patterns.stable = stdDev / mean < stabilityThreshold;
  patterns.fluctuating =
    !patterns.stable && !patterns.rising && !patterns.falling;

  // Calculate rate of change (units per minute)
  const oldestReading = history[0];
  const newestReading = history[history.length - 1];
  const minutesElapsed =
    (newestReading.timestamp - oldestReading.timestamp) / 60000;
  const valueChange = newestReading.value - oldestReading.value;

  const rateOfChange = minutesElapsed > 0 ? valueChange / minutesElapsed : 0;

  return {
    ...input,
    data: {
      ...input.data,
      pattern: {
        ...patterns,
        history_size: history.length,
        std_deviation: stdDev,
        mean: mean,
        rate_of_change: rateOfChange,
      },
    },
  };
}
```

**When to use:**

- To detect trends in sensor data
- For predictive maintenance applications
- When implementing alerts based on changing patterns

## Function Composition

You can combine multiple functions by creating a composite function that applies each transformation in sequence:

```javascript
function process(input) {
  // First transform: Convert temperature
  let result = input;

  if (result.data && result.data.temperature !== undefined) {
    const celsius = result.data.temperature;
    result.data.temperature_f = (celsius * 9) / 5 + 32;
  }

  // Second transform: Add timestamp
  const now = new Date();
  result.data = {
    ...result.data,
    timestamp: now.toISOString(),
    unix_time: Math.floor(now.getTime() / 1000),
  };

  // Third transform: Add alert flags
  if (result.data && result.data.temperature !== undefined) {
    // Fixed alert threshold
    const alertThreshold = 30;
    result.data.is_alert = result.data.temperature > alertThreshold;
  }

  return result;
}
```

## Best Practices for Functions

1. **Input Validation** - Always check that input data exists and has the expected structure
2. **Error Handling** - Use try/catch blocks when dealing with potentially problematic operations
3. **Default Parameters** - Provide sensible defaults for all function parameters
4. **Immutability** - Create new objects rather than modifying input directly
5. **Documentation** - Add comments to explain what the function does and how to use it
6. **Testing** - Test functions with various input scenarios before deploying
7. **Simplicity** - Keep functions focused on one main task rather than mixing concerns

With these examples, you can quickly implement common processing patterns and build upon them for your specific IoT use cases.
