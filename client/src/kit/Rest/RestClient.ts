export interface IRestClientSettings {
    getUrl(path: string): string;
    getHeaders(): Record<string, string>;
    onStartLoading(): void;
    onStopLoading(): void;
}

export interface IRestOptions {
    bodySerializer?: (data: any) => string;
    responseMapper?: <T>(data: any) => T
}

export class JsonResponse<T = any> {
    public constructor(
        public readonly data: T | null,
        public readonly ok: boolean,
        public readonly status: number,
        public readonly statusText: string,
        public readonly headers: Headers
    ) {
    }

    // public asType<T>(): JsonResponse<T> {
    //     const data: any = this.data;
    //     if (data) {
    //         return new JsonResponse<T>(data as T, this.ok, this.status, this.statusText, this.headers);
    //     }
    //     throw new Error("Data is null");
    // }
}

export class RestClient {
    public constructor(private clientSettings: IRestClientSettings) { }

    private serializeBody(data: any) {
        return JSON.stringify(data);
    }

    private addDefaultHeaders(headers: Record<string, string>, defaultHeaders: Record<string, string>) {
        const headerKeys = Object.keys(headers).map(key => key.toLowerCase());

        const result = { ...headers };

        for (let key in Object.keys(defaultHeaders)) {
            const lowerKey = key.toLowerCase();
            if (headerKeys.indexOf(lowerKey) === -1) {
                result[key] = defaultHeaders[key];
            }
        }

        return result;
    }

    private async execute(method: string, path: string, data: any): Promise<JsonResponse> {

        this.clientSettings.onStartLoading();

        let url: string = this.clientSettings.getUrl(path);
        let headers: any = this.clientSettings.getHeaders();
        let body: any = null;

        headers = this.addDefaultHeaders(headers, {
            "Accept": "application/json"
        });

        if (method !== "GET") {
            body = this.serializeBody(data);
        }

        const response: any = await fetch(url, {
            method: method,
            headers: headers,
            body: body
        });

        let jsonData: any = null;

        try {
            jsonData = await response.json();
        } catch (e) {
            jsonData = null;
        }

        this.clientSettings.onStopLoading();

        return new JsonResponse(jsonData, response.ok, response.status, response.statusText, response.headers);
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

