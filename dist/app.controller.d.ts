import { AppService } from "./app.service";
export declare class AppController {
    private appService;
    constructor(appService: AppService);
    findAll(): Promise<{
        data: any;
    }>;
}
