// src/pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';

// Configure multer to store files with their original names and extensions
const storage = multer.diskStorage({
  destination: 'uploads/', // Path where files are saved
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract the original file extension
    const storyID = req.query.storyID as string;
    const pageID = req.query.pageID as string;
    const index = req.query.index as string; // Retrieve the index from the request query params

    if (!storyID || !pageID || !index) {
      return cb(new Error('Missing StoryID, PageID, or Index in query parameters'), '');
    }

    const newFilename = `mirage_${storyID}_${pageID}_${index}${ext}`; // Format: mirage_storyID_pageID_index.ext
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

// Extend NextApiRequest to include the 'file' property from multer
interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File;
}

// Helper function to allow `multer` to work with Next.js API routes
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in body parser, multer will handle it
  },
};

export default async function handler(req: NextApiRequestWithFile, res: NextApiResponse) {
  const uploadDir = path.join(process.cwd(), 'uploads');
  await fs.mkdir(uploadDir, { recursive: true }); // Ensure the upload directory exists

  // Run the multer middleware
  await runMiddleware(req, res, upload.single('mirage'));

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // The file has been uploaded successfully, and `req.file` contains the file details
  const fileUrl = `${req.headers.host}/uploads/${req.file.filename}`;

  return res.status(200).json({ url: fileUrl });
}