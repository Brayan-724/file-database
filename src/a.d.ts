import { NextFunction, Request, Response, Router, Express } from "express";

namespace Routes {
    interface Route {
        (Auth: AuthFunction, AdminAuth: AdminAuthFunction): void;
        r: Router;
        thisRoute: string;
    }

    type AuthFunction = (req: Request<Document, any, any, qs.ParsedQs, Record<String, any>>, res: Response<any, Record<String, any>>, next: NextFunction) => {};
    type AdminAuthFunction = (req: Request<Document, any, any, qs.ParsedQs, Record<String, any>>, res: Response<any, Record<String, any>>, next: NextFunction) => {};

    type _exports_callback = (router: Router, Auth: AuthFunction, AdminAuth: AdminAuthFunction) => {}

    declare function _exports(route: string, callback: _exports_callback): Route;
    declare function pFunc(v: Route): void;

    declare function relFunc(v: Route): string[];
    
    type _Routes = (App: Express, Auth: Routes.AuthFunction, AdminAuth: Routes.AdminAuthFunction) => void;
}