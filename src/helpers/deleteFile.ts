// ========== Delete File
import { unlink, existsSync } from 'fs';
import path from 'path';

export const deletFile = (filePath: string): Promise<any> => new Promise(
  (resolve: any, reject: any) => {
    const link = path.join(__dirname, `../../public${filePath}`);

    if (existsSync(link)) {
      unlink(link, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      });
    }
  },
);
