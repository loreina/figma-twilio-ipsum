# Figma Twilio Ipsum

Generate realistic placeholder data into text layers in Figma. 

## Supported data types

- SID

## Usage

1. Select one or more text layers
2. Run the plugin: Menu > Plugins > Twilio Ipsum or `Command + P` and typing `Twilio Ipsum`
3. Select the data type to populate
4. Input parameters (if any) for the selected data type
5. Text layers will be replaced with the data type of your choice

## Development

1. Install Typescript globally: `npm install -g typescript`
2. Install project dependencies: `npm run install`
3. Import plugin into Figma: Plugins > Development > Import plugin from manifest...
4. Build plugin: `npm run build`