const fsPromises = require('fs').promises;

const cleanFile = async filePath => {
  try {
    // Read the file asynchronously using promises.
    const data = await fsPromises.readFile(filePath, 'utf8');

    // Remove extra spaces by replacing multiple spaces with a single space.
    const cleanedContent = data.replace(/\s+/g, ' ').trim();

    // Write the cleaned content back to the same file asynchronously using promises.
    await fsPromises.writeFile(filePath, cleanedContent);

    console.log('File cleaned and updated successfully.');
  } catch (error) {
    console.error(error);
  }
};


// Provide the path to the file you want to clean.
const filePath = './medium/file.txt';
cleanFile(filePath);