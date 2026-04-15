# Shopify Collection Auto-Generator

This script automates the creation of a "Collection" column based on the product titles in a Shopify CSV export. It is specifically tuned for titles following the format `MC [WORD]`.

## How it works

1. **Extraction**: The script looks at the `Title` column of every row.
2. **Parsing**: It splits the title by spaces and identifies the first two words.
3. **Logic**: If the first word is "MC", it combines the first and second word (e.g., "MC CHELS") and places it into a new column named `Collection`.
4. **Safety**: It uses `writeFileSync`, meaning every time you run the script, the output file is overwritten. This prevents the "Multiple Header" error found in previous versions of the script.

## Setup Instructions

### 1. Requirements

Ensure you have the necessary Node.js packages installed:

```bash
npm install csv-parse json2csv
```

### 2. File Placement

- Place your Shopify export file in a folder named `/collection-editor`.
- Rename your export file to `shopify_without_collections.csv` (or update the `INPUT_FILE` variable in the script).

### 3. Update the title condition

If your product titles use a different pattern than `MC [WORD]`, update the script logic to match the title prefix or format you want. This lets the script extract the collection value from any title format you choose.

### 4. Run the script

Execute the script using Node.js:

```bash
node collection-generator.js
```

## Data Transformation Example

| Title                        | Extracted Collection |
| :--------------------------- | :------------------- |
| **MC CHELS** - Brown Leather | MC CHELS             |
| **MC GOLF** Shoe v2          | MC GOLF              |
| **MC DRESS** Edition         | MC DRESS             |

## Note on Shopify Imports

Standard Shopify CSV imports do not recognize a column named "Collection." To use this data for actual Shopify collections:

1. Use this script to generate the CSV.
2. Use a third-party app (like **Matrixify** or **EZ Import**) that supports mapping a CSV column directly to a Shopify Collection.
3. Alternatively, you can modify the script to add these words to the `Tags` column instead.
