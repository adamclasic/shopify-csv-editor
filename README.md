# CSV Editor Documentation

## Installation

1. Ensure Node.js is installed.
2. Install dependencies:
   ```bash
   npm install
   ```

## How to Run

Run the tool from the root directory:

```bash
node index.js
```

## Available Actions

### 1. Generate Collections

- **Logic:** Reads the `Title` column. If it starts with "MC", it takes the first two words (e.g., "MC CHELS") and adds them to a new `Collection` column.
- **Use case:** Organizing products into collections based on their primary model name.
  [View the setup guide](collection-editor/README.md)

### 2. Expand Product Images

- **Logic:** Matches the ID from the Shopify Handle (e.g., `gi-2405` -> `2405`) against a secondary sneaker data file.
- **Result:** It creates additional rows in the CSV for every extra image found in the sneaker data, allowing Shopify to import multiple images for a single product handle.
  [View the setup guide](product-images-editor/README.md)

## Troubleshooting

- **File Not Found:** Ensure your file paths are correct. The script defaults to a `./src/` folder.
- **Headers:** This tool overwrites the output file every time, so you won't get duplicate headers if you run it multiple times.
