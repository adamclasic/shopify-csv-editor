const fs = require('fs');
const { parse: parse2json } = require('csv-parse/sync');
const { parse: parse2csv } = require('json2csv');

// Path configurations
const INPUT_FILE = './shopify_without_collections.csv';
const OUTPUT_FILE = './shopify_with_collections.csv';

function processShopifyData() {
    try {
        console.log('Reading input file...');
        const rawData = fs.readFileSync(INPUT_FILE, { encoding: 'utf8' });
        console.log('Input file read successfully.');

        // Parse CSV to JSON
        const products = parse2json(rawData, {
            columns: true,
            skip_empty_lines: true,
        });

        console.log(`Processing ${products.length} rows...`);

        const processedData = products.map((row) => {
            
            const title = row.Title || "";
            if (!title) {
                console.warn('Warning: Missing title for a row, skipping collection assignment.');
                return row; // Skip processing if title is missing
            }

            // Logic: Split title by spaces and take the first two words
            // Example: "MC CHELS extra info" -> "MC CHELS"
            const titleParts = title.trim().split(/\s+/); 
            
            if (titleParts.length >= 2 && titleParts[0].toUpperCase() === 'MC') {
                row['Collection'] = `${titleParts[0]} ${titleParts[1]}`.toUpperCase();
            } else {
                // Optional: Fallback if title doesn't start with MC
                row['Collection'] = 'General'; 
            }
            console.log(`Processed row: Title="${title}", Collection="${row['Collection']}"`);
            return row;
        });

        // Convert JSON back to CSV
        console.log('Converting back to CSV...');
        const csv = parse2csv(processedData);

        // Save file (using writeFileSync to ensure a fresh file every time)
        fs.writeFileSync(OUTPUT_FILE, csv);
        
        console.log(`Success! File saved as: ${OUTPUT_FILE}`);

    } catch (err) {
        console.error('Error processing the CSV:', err.message);
    }
}

processShopifyData();