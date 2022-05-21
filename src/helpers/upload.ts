// ========== Upload
// import all modules
import path from 'path';
import { mkdirSync, existsSync } from 'fs';

export const upload = (req: any) => {
  console.log('ssk =>', req.files);
  if (!req.files) {
    return {
      message: 'You must upload the brand logo',
      status: 400,
      success: false,
    };
  }

  const { logo } = req.files;

  // check file type
  const extValid = /jpg|jpeg|png/gi;
  const checkMimeType = extValid.test(String(logo.mimetype));
  const checkExt = extValid.test(String(logo.name));

  if (!checkMimeType && !checkExt) {
    return {
      message: 'it is not an imahe',
      status: 400,
      success: false,
    };
  }

  if (logo.size > 3000000) {
    return {
      message: 'Your file is too large',
      status: 400,
      success: false,
    };
  }

  let file = logo.name.split('.')[0];
  file += '-';
  file += Date.now();
  file += '.';
  file += 'jpg';

  const link: string = path.join(__dirname, '../../public');

  if (!existsSync(link)) {
    mkdirSync(`${link}`);

    if (!existsSync(`${link}/uploads`)) {
      mkdirSync(`${link}/uploads`);
    }
  }

  if (!existsSync(`${link}/uploads`)) {
    mkdirSync(`${link}/uploads`);
  }

  logo.mv(`${link}/uploads/${file}`);

  return {
    message: 'Your photo has been uploaded',
    status: 200,
    success: true,
    logo: file,
  };
};
