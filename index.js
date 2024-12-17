// const memUsageBefore = process.memoryUsage();
import express from 'express';
import cors from 'cors';
import path from 'path';

import Image from './routes/ImageRoutes.js';
import Tag from './routes/TagRoutes.js';
import User from './routes/UserRoutes.js';
import ImageTag from './models/ImageTagRelation.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(Image);
app.use(Tag);
app.use(User);
app.use(ImageTag);
// app.use(Authorized);
app.use('/view', express.static(path.join('./Uploads')));

app.listen(4000, () => console.log('Server is running on port 4000'));

// const memUsageAfter = process.memoryUsage();
// console.log('Before:', memUsageBefore);
// console.log('After:', memUsageAfter);
