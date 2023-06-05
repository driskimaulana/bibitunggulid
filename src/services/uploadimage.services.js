const { format } = require('util');
const { Storage } = require('@google-cloud/storage');

const uuidv4 = require('uuid').v4;
const { once } = require('events');

require('dotenv').config();

const base64EncodedKey = process.env.GSTORAGE_SERVICE_KEY;
const key = Buffer.from(base64EncodedKey, 'base64').toString('utf8');

const storage = new Storage({ projectId: 'bibitunggulid', credentials: JSON.parse(key) });
const bucket = storage.bucket('bibitunggulid-public');

const uploadImageToBucket = async (file) => {
  // create new blob in the bucket and upload the file data
  const blob = bucket.file(`supplier-logo-images/${uuidv4()}.${file.originalname.split('.')[1]}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err) => {
    console.log(err.message);
    return {
      status: 'failed',
      message: 'Upload image failed',
    };
  });

  let publicUrl = '';

  // eslint-disable-next-line consistent-return
  blobStream.on('finish', () => {
    // Create public URL for the file
    publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
    );
  });

  blobStream.end(file.buffer);

  // wait until the upload is finish
  await once(blobStream, 'finish');
  return {
    status: 'success',
    message: 'Upload success.',
    publicUrl,
  };
};

module.exports = uploadImageToBucket;
