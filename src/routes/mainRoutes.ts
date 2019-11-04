import { RegisterRoutes } from "./registerRoutes";
import { ChangeInfoRoutes } from "./changeInfoRoutes";
import { LoginRoutes } from "./loginRoutes";
import { CommentRoutes } from "./commentRoutes";
import { CategoryRoutes } from "./categoryRoutes";
import { ProductRoutes } from "./productRoutes";


export class MainRoutes{
    registerRoutes: RegisterRoutes;
    changeInfoRoutes: ChangeInfoRoutes;
    loginRoutes: LoginRoutes;
    commentRoutes: CommentRoutes;
    categoryRoutes: CategoryRoutes;
    productRoutes: ProductRoutes;

    constructor(){
        this.registerRoutes = new RegisterRoutes();
        this.changeInfoRoutes = new ChangeInfoRoutes();
        this.loginRoutes = new LoginRoutes();
        this.commentRoutes = new CommentRoutes();
        this.categoryRoutes = new CategoryRoutes();
        this.productRoutes = new ProductRoutes();
    }

    async routes(app){
        this.registerRoutes.routes(app);
        this.loginRoutes.routes(app);
        this.changeInfoRoutes.routes(app);
        this.commentRoutes.routes(app);
        this.categoryRoutes.routes(app);
        this.productRoutes.routes(app);
    }
}
