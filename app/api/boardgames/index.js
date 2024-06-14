import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), '_data/boardgames.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, image, price, currency } = req.body;

      const rawData = fs.readFileSync(filePath);
      const data = JSON.parse(rawData);

      data.boardgames.push({ name, image, price, currency });

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      return res
        .status(201)
        .json({ message: 'Added boardgame to the collection!' });
    } catch (error) {
      console.error('Error while adding data', error);
      return res.status(500).json({ message: 'Error while adding data.' });
    }
  } else {
    res.status(405).end();
  }
}
