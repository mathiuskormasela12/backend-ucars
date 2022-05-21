// ========== Upload
// import all modules
import path from 'path';

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
  // const ext = logo.name.split('.')[1].toLowerCase();
  file += '-';
  file += Date.now();
  file += '.';
  // file += ext && ext.length > 0 ? ext : 'jpg';
  file += 'jpg';

  logo.mv(path.join(__dirname, `../../public/uploads/${file}`));

  return {
    message: 'Your photo has been uploaded',
    status: 200,
    success: true,
    logo: file,
  };
};
