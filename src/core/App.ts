// ========== App
// import all modules
import express, { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';

// import all interfaces
import { appConfig } from '../config';

// import all routes
import authRoutes from '../routes/Auth';

namespace AppModule {
	export class App {
	  private app: Application;

	  private port: number;

	  constructor(port: number) {
	    this.port = port;
	    this.app = express();

	    this.setup();
	  }

	  private setup(): void {
	    // setup several middlewares
	    this.app.use(morgan('dev'));
	    this.app.use(compression());
	    this.app.use(helmet());

	    // setuo url-encoded
	    this.app.use(express.urlencoded({ extended: false }));
	    this.app.use(express.json());

	    // setup for static files
	    this.app.use(express.static(path.join(__dirname, '../../public/uploads')));

	    // setup cors
	    const corsOptions = {
	      origin(origin: any, callback: any) {
	        if (appConfig.whileList.indexOf(origin) !== -1 || !origin) {
	          callback(null, true);
	        } else {
	          callback(new Error('Blocked by Cors'));
	        }
	      },
	    };

	    this.app.use(cors(corsOptions));

	    // setup mongoose
	    mongoose.connect(appConfig.dbUri, (err: any) => {
	      if (err) {
	        console.log(err);
	      } else {
	        console.log('Database has been connected');
	      }
	    });

	    // routes
	    this.app.use('/api/v1/auth', authRoutes.authRoutes);
	  }

	  public listen(): void {
	    this.app.listen(this.port, () => {
	      // eslint-disable-next-line no-console
	      console.log(`The RESTful API is running at ${appConfig.appUrl}`);
	    });
	  }
	}
}

export default AppModule;
