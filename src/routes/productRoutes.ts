import { ProductController } from "../controllers/productController";
import {TokenService} from "../services/token/tokenService";
import {Request, Response} from "express";

export class ProductRoutes {

    private productController: ProductController = new ProductController();
    private tokenService: TokenService = new TokenService();

    public routes(app) {
        app.route('/api/product/add')
            .post(this.tokenService.checkToken,(req: Request, res: Response) => {
                this.productController.addProduct(req, res)
            });

        app.route('/api/product/edit/:imageCase')
            .put(this.tokenService.checkToken,(req: Request, res: Response) => {
                this.productController.updateProduct(req, res)
            });

        app.route('/api/product/delete/:productId/:userId')
            .delete(this.tokenService.checkToken,(req: Request, res: Response) => {
                this.productController.deleteProduct(req, res)
            });

        app.route('/api/product/get/:productId')
            .get((req: Request, res: Response) => {
                this.productController.getProductById(req, res)
            });

        app.route('/api/product/user/:userId')
            .get((req: Request, res: Response) => {
                this.productController.getProductsByUserId(req, res)
            });
    }
}
