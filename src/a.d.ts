import { NextFunction, Request, Response, Router, Express } from "express";

namespace Routes {
    interface Route {
        (Auth: AuthFunction, AdminAuth: AdminAuthFunction): void;
        r: Router;
        allRoutes: string[];
        thisRoute: string;
    }

    type Routes = {
        indexR: Route,
        uploadR: Route,
        filesR: Route,
        viewFileR: Route,
        removeR: Route,
        downloadR: Route,
        tmpR: Route,
        testsR: Route,

        allRoutes: string[],
    }

    type AuthFunction = (req: Request, res: Response, next: NextFunction) => {};
    type AdminAuthFunction = (req: Request, res: Response, next: NextFunction) => {};

    type _exports_callback = (router: Router, Auth: AuthFunction, AdminAuth: AdminAuthFunction) => {}

    declare function _exports(route: string, callback: _exports_callback): Route;
    declare function pFunc(v: Route): void;

    declare function relFunc(v: Route): string[];
    
    declare function _Routes(App: Express, Auth: Routes.AuthFunction, AdminAuth: AdminAuthFunction): Routes.Routes;
}