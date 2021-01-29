import { IRestClientSettings, RestClient } from "@/kit/Rest/RestClient";
import { AuthService } from "@/kit/Services/AuthService";
import { IAuthService } from "@/kit/Services/AuthServiceTypes";
import { ILogger, Logger } from "./kit/Logger/Logger";

export class Application {
    public readonly client: RestClient = new RestClient(this.restClientSettings);
    public readonly auth: IAuthService = new AuthService(this.client);
    public readonly logger: ILogger = Logger.getLogger("");

    public get restClientSettings(): IRestClientSettings {
        const app = this;
        return new class {
            getUrl(path: string): string {
                return  [process.env.VUE_BASE_URL, path].join("/").replace(/\/{1,}/g, "/");
            }
            getHeaders(): Record<string, string> {
                const user = app.auth.getCurrentUser();
                if (user) {
                    return {
                        Authorization: `Bearer ${user.token}`
                    }
                }
                return {};
            }
            onStartLoading(): void { }
            onStopLoading(): void {  }
        }
    }
}

export const App = new Application();
