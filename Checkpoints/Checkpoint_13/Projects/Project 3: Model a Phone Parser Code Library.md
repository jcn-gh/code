# Project Three: Model a Phone Parser Code Library

We’re going to design a code library by reverse engineering a Ruby gem that I’ve built.

## Package Diagram Requirements

- Phone parser
- Country codes

These are going to list out some of the different getters, setters, and methods that are needed in order to allow these to work properly.

## Sequence Diagram Requirements

- Participants: Parser, Digit length validator, and Country code validator
- Start point: receives data
- Endpoint: returns parsed phone number
- Key messages: Parsing and Validations

This entire code library is focused on validating these phone numbers, parsing them, and then returning cleaned up versions.

## Key

To create the two diagrams based on the provided markdown code snippet, you’ll need to understand the components and processes described. Here’s a breakdown to help you with the Package and Sequence Diagrams.

### Package Diagram

For the Package Diagram, you’ll be focusing on structuring the library into packages (or modules). Based on the snippet, you have two main components:

1. Phone Parser: This is likely the core component of your library. It will handle the logic of parsing phone numbers. Within this package, you might have several classes or functions dedicated to different aspects of parsing, such as extracting the country code, area code, and the local number.
2. Country Codes: This package will contain data or methods related to country codes. It might include mappings from country codes to country names, validation rules for the length of phone numbers based on the country, and possibly formatting rules.
For both packages, you’ll need getters (methods to retrieve data), setters (methods to set or update data), and other methods necessary for the functionality described.

### Sequence Diagram

The Sequence Diagram will illustrate how the components interact over time to achieve the goal of parsing and validating a phone number. Here’s a step-by-step guide based on your requirements:

1. Start Point: The process begins when the system receives data, which in this context is likely a raw phone number input.
2. Participants:
    - Parser: This component is responsible for the initial parsing of the phone number. It might break down the phone number into components (country code, area code, local number).
    - Digit Length Validator: After parsing, this validator checks if the phone number has the correct length according to predefined rules (which might vary by country).
    - Country Code Validator: This validator checks if the country code is valid and corresponds to a known country.
3. Key Messages:
    - Parsing: The parser sends a message to start the parsing process. This involves breaking down the phone number and possibly identifying the country code.
    - Validations: After parsing, validation messages are sent to the Digit Length Validator and Country Code Validator. These validators check the phone number’s validity and return the results.
4. Endpoint: The process ends when a parsed and validated phone number is returned. This might involve reassembling the phone number components into a standardized format.

To create these diagrams, you’ll use UML (Unified Modeling Language) tools or any diagramming tool that supports UML. For the Package Diagram, focus on the structure and relationships between packages. For the Sequence Diagram, illustrate the flow of messages over time between the different participants to achieve the goal of parsing and validating a phone number.
