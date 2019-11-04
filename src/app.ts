import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as mongoose from 'mongoose';
import { MainRoutes } from './routes/mainRoutes';
import { CategoryController } from "./controllers/categoryController";
import {config} from './_config/config'
import * as path from "path";

class App{
    app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.mongoSetup();
        this.useRoutes();
        this.initializeCategories();
    }

    config(){
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended: false}));
        this.app.use("/images", express.static("src/data/images"));
    }

    mongoSetup(){
        let mongoUrl = <string>config.DB_CONNECT;
        mongoose.Promise = global.Promise;
        mongoose.connect(mongoUrl , {useNewUrlParser : true} , () => {
            console.log('Mongo is ready (' + mongoUrl + ')');
        })
    }

    useRoutes(){
        const mainRoutes = new MainRoutes();
        mainRoutes.routes(this.app);
    }

    initializeCategories(){
        const categoryController = new CategoryController();
        categoryController.createCategories();
    }

}

export default new App().app;
