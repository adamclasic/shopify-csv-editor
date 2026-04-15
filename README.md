This documentation provides a guide on how to use the CSV processing script to merge general sneaker data with Shopify product exports.

---

# Shopify Product Image & Collection Merger

This script is designed to enrich a Shopify product CSV file with additional data from a general sneaker database. It specifically handles assigning products to collections and expanding a single comma-separated image list into multiple Shopify-compatible image rows.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Required File Structure](#required-file-structure)
4. [CSV Requirements](#csv-requirements)
5. [How to Use](#how-to-use)
6. [Logic Overview](#logic-overview)
7. [Important Warnings](#important-warnings)

---

## Prerequisites

- **Node.js** installed on your machine.
- A terminal or command prompt.

## Installation

Before running the script, you must install the required dependencies:

```bash
npm install csv-parse json2csv
```

## Required File Structure

The script expects a specific folder structure to locate the input files and generate the output. Ensure your project directory looks like this:

```text
project-root/
│
├── src/
│   ├── general{name}.csv   # The source of extra data/images
│   ├── generalAllTrue.csv    # (Optional) Secondary source
│   └── shopifyAll.csv        # Your existing Shopify product export
│
├── main.js                   # The script file
└── output/                   # Where the output will be saved
```

## CSV Requirements

### 1. `shopifyAll.csv`

- Must contain a **Handle** column.
- The script expects the ID to be the second part of the handle (e.g., if the handle is `mens-12345`, the ID extracted is `12345`).

### 2. `generalSneakers.csv`

- Must contain an **id** column (to match the Shopify handle).
- Must contain a **model** column.
- Must contain an **images** column (comma-separated URLs).

## How to Use

1. **Prepare your CSVs:** Place your source files in the `./src/` folder as named above.
2. **Set the Collection Name:** If you want a different collection name, open the script and change line 40:
   ```javascript
   initSho["Collection"] = "YOUR NEW COLLECTION NAME";
   ```
3. **Run the script:**
   ```bash
   node main.js
   ```
4. **Check Output:** The processed data will be saved to `./output.MensDressGolf.3.csv`.

---

## Logic Overview

1. **Parsing:** The script reads the Shopify export and the General Sneakers file.
2. **Matching:** it loops through every product in the Shopify file. It looks for a match in the General Sneakers file where `geneElm.id` equals the numeric part of the Shopify `Handle`.
3. **Collection Assignment:** Once matched, it assigns the product to the "MC GOLF SHOES" collection.
4. **Image Expansion:**
   - It checks the `images` column in the sneaker data.
   - If multiple image URLs exist (separated by commas), it creates a new row for each additional image.
   - These new rows only contain the `Handle` and the `Image Src`, which is the format required by Shopify to import multiple images for one product.

---

## Important Warnings

### 1. Append Mode

The script uses `fs.appendFileSync`.

- **Warning:** If you run the script multiple times, it will keep adding data to the same file without clearing it.
- **Header Issue:** Every time the script runs, it writes a new set of header columns. If you are running this multiple times, it is recommended to delete the existing `output.MensDressGolf.3.csv` before running, or change the script to use `writeFileSync`.

### 2. File Pathing

The script currently saves the output to the root directory (`./output.MensDressGolf.3.csv`). Ensure you have write permissions for that folder.

### 3. Handle Format

The script assumes your Shopify Handle follows a specific format: `prefix-id`. If your handles do not contain a dash followed by the matching ID, the merge will fail.

- _Example:_ Handle `nike-999` matches ID `999`.
