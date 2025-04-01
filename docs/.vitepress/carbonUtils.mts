import path from 'path';
import fs from 'fs';

// Function to get categorized items
export function getCategorized(dir: string): { text: string; items: { text: string; link: string }[] }[] {
  const fullDir = path.resolve(__dirname, dir);
  const categories = fs.readdirSync(fullDir, { withFileTypes: true });

  return categories
    .filter(entry => entry.isDirectory())
    .map(category => { 
      const categoryPath = path.join(fullDir, category.name);
      const files = fs.readdirSync(categoryPath);
      const items = files
        .filter(file => file.endsWith('.md') && file.toLowerCase() !== 'index.md')
        .map(file => {
          const name = file.replace(/\.md$/, '');
          return {
            text: name, 
            link: `/${dir}/${category.name}/${name}`
          };
        });
      return {
        text: category.name + " (" + getFileCount(categoryPath) + ")",
        collapsed: true,
        items
      };  
    });
}

// Function to get a list of files in a directory
export function getFiles(dir: string): { text: string; link: string }[] {
  const fullDir = path.resolve(__dirname, dir);
  const files = fs.readdirSync(fullDir);
  return files
    .filter(file => file.endsWith('.md') && file.toLowerCase() !== 'index.md')
    .map(file => {
      const name = file.replace(/\.md$/, '');
      return {
        text: name.replace(/-/g, ' '),
        link: `/${dir}/${name}`
      };
    });
}

// Function to get the count of .md files in a directory
export function getFileCount(dir: string): number {
  const fullDir = path.resolve(__dirname, dir);
  const files = fs.readdirSync(fullDir);
  return files
    .filter(file => file.endsWith('.md'))
    .length;
}
