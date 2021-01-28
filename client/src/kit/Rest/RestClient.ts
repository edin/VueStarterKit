export interface IClientSettings {
    getUrl(path: string): string;
    getHeaders(): any;
    startLoading(): void;
    stopLoading(): void;
}

export class JsonResponse {
    public constructor(
        public readonly data: any,
        public readonly ok: boolean,
        public readonly status: number,
        public readonly statusText: string,
        public readonly headers: Headers
    ) {
    }

    public static async fromResponse(response: Response): Promise<JsonResponse> {
        let data: any = null;
        try {
            data = await response.json();
        } catch (e) {
            data = null;
        }
        return new JsonResponse(data, response.ok, response.status, response.statusText, response.headers);
    }
}

export class RestClient {
    public constructor(private clientSettings: IClientSettings) {
    }

    private async execute(method: string, path: string, data: any): Promise<JsonResponse> {

        this.clientSettings.startLoading();

        let url: string = this.clientSettings.getUrl(path);
        let headers: any = this.clientSettings.getHeaders();
        let body: any = null;

        if (method !== "GET") {
            body = JSON.stringify(data);
        }

        const response: any = await fetch(url, {
            method: method,
            headers: headers,
            body: body
        });

        this.clientSettings.stopLoading();

        return JsonResponse.fromResponse(response);
    }

    public async get(path: string, data: any = null): Promise<JsonResponse> {
        return await this.execute("GET", path, data);
    }

    public async post(path: string, data: any): Promise<JsonResponse> {
        return await this.execute("POST", path, data);
    }

    public async put(path: string, data: any): Promise<JsonResponse> {
        return await this.execute("PUT", path, data);
    }

    public async delete(path: string, data: any): Promise<JsonResponse> {
        return await this.execute("DELETE", path, data);
    }
}
