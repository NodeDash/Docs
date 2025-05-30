---
sidebar_position: 1
---

# Functions Overview

Functions in Helium Device Manager allow you to create custom JavaScript code to transform, filter, and enrich device data as it flows through your system.

## What Are Functions?

Functions are reusable code blocks that process data from your IoT devices before passing it to integrations or other devices. They are written in JavaScript and run in a sandboxed environment to ensure security and stability.

## Benefits of Using Functions

- **Data Transformation**: Convert between units, restructure payloads, or format data
- **Data Enrichment**: Add contextual information, timestamps, or calculated values
- **Data Filtering**: Remove unnecessary information or filter out irrelevant messages
- **Business Logic**: Implement conditional routing or alerting logic
- **Reusability**: Create once, use in multiple flows

## Function Structure

Each function in Helium Device Manager follows a standard structure:

```javascript
/**
 * @param {Object} input - The input data from the previous node in the flow
 * @returns {Object} - The transformed output data
 */
function process(input) {
  // Your custom logic here
  return transformedData;
}
```

The function accepts one parameter:

1. `input`: The data object from the previous node in the flow

### Example: Temperature Conversion Function

```javascript
function process(input) {
  // Check if temperature exists in the input data
  if (input.data && input.data.temperature) {
    const celsius = input.data.temperature;
    const fahrenheit = (celsius * 9) / 5 + 32;

    // Return the original input with added Fahrenheit value
    return {
      ...input,
      data: {
        ...input.data,
        temperature_c: celsius,
        temperature_f: fahrenheit,
      },
    };
  }

  // If no temperature data, return input unchanged
  return input;
}
```

## Function Testing in the Editor

The Function Editor provides a testing environment where you can:

1. Write your function code
2. Provide sample input data
3. Execute the function to see the output
4. Debug any issues before deploying

## Using Functions in Flows

Once created, functions can be added to flows by dragging them from the sidebar into the flow editor canvas. You can then:

1. Connect the function to data sources (devices or labels)
2. Connect the function output to destinations (integrations or other functions)

## Function Execution Lifecycle

When a function is triggered in a flow:

1. The function receives data from the previous node
2. The JavaScript code is executed in a sandboxed environment
3. The function transforms the data according to its logic
4. The transformed data is passed to the next node in the flow
5. Execution details are recorded in the function history

## Best Practices

- **Keep Functions Focused**: Each function should do one thing well
- **Handle Edge Cases**: Include error checking for missing or invalid data
- **Use Descriptive Names**: Name functions based on what they do
- **Optimize Performance**: Keep functions efficient for handling large data volumes
- **Test Thoroughly**: Use the function testing tool with various sample inputs

## Next Steps

- Learn how to [Create a Function](./creating-functions)
- See [Function Examples](./examples) for common use cases
- Explore [Advanced Function Techniques](./advanced-techniques)
