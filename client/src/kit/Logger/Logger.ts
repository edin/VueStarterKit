export enum Level {
    INFO,
    LOG,
    DEBUG,
    WARN,
    ERROR
}

export type LoggerFactory = (name: string) => ILogger;

export class LogMessage {
    public level: Level = Level.INFO;
    public name: string = "";
    public data: any[] = [];
}

export interface ILogDriver {
    log(level: Level, name: string, ...data: any[]): void
}

export interface ILogger {
    getName(): string;
    info(...data: any[]): void
    log(...data: any[]): void
    debug(...data: any[]): void
    warn(...data: any[]): void
    error(...data: any[]): void
}

export class LogTarget {
    public constructor(
        public readonly logger: ILogDriver,
        public readonly levels: Level[]) {
    }

    public matches(level: Level): boolean {
        return this.levels.indexOf(level) > -1;
    }
}

export class NullLogger implements ILogDriver {
    public log(level: Level, name: string, ...data: any[]): void {
        // Does nothing
    }
}

export class ConsoleLogger implements ILogDriver {
    public log(level: Level, name: string, ...data: any[]): void {
        let params = [...data];
        if (name && name != "") {
            params = [name, ...data];
        }

        switch (level) {
            case Level.INFO: {
                console.info(...params)
            } break;
            case Level.LOG: {
                console.log(...params);
            } break;
            case Level.DEBUG: {
                console.debug(...params);
            } break;
            case Level.WARN: {
                console.warn(...params);
            } break;
            case Level.ERROR: {
                console.error(...params);
            } break;
        }
    }
}

export class MultiLogger implements ILogDriver {
    constructor(private targets: LogTarget[]) { }

    public log(level: Level, name: string, ...data: any[]): void {
        for (let target of this.targets) {
            if (target.matches(level)) {
                target.logger.log(level, name, ...data);
            }
        }
    }
}

export class Logger implements ILogger {
    private static default?: ILogger | null;
    private static loggerFactory?: LoggerFactory;

    constructor(private target: ILogDriver, private name = "") { }

    public getName(): string {
        return this.name;
    }

    public info(...data: any[]): void {
        this.target.log(Level.INFO, this.name, ...data);
    }

    public log(...data: any[]): void {
        this.target.log(Level.LOG, this.name, ...data);
    }

    public debug(...data: any[]): void {
        this.target.log(Level.DEBUG, this.name, ...data);
    }

    public warn(...data: any[]): void {
        this.target.log(Level.WARN, this.name, ...data);
    }

    public error(...data: any[]): void {
        this.target.log(Level.ERROR, this.name, ...data);
    }

    public static getLogger(name: string): ILogger {
        if (Logger.loggerFactory) {
            return Logger.loggerFactory(name)
        }
        return new Logger(new ConsoleLogger(), name);
    }

    public static setFactory(loggerFactory: LoggerFactory): void {
        Logger.loggerFactory = loggerFactory;
    }

    static setLogger(logger: ILogger | null) {
        Logger.default = logger;
    }

    static getDefault(): ILogger {
        if (Logger.default) {
            return Logger.default;
        }
        Logger.default = Logger.getLogger("");
        return Logger.default;
    }

    static info(...data: any[]): void {
        Logger.getDefault().info(...data);
    }

    static log(...data: any[]): void {
        Logger.getDefault().log(...data);
    }

    static debug(message: string, ...data: any[]): void {
        Logger.getDefault().debug(...data);
    }

    static warn(...data: any[]): void {
        Logger.getDefault().warn(...data);
    }

    static error(...data: any[]): void {
        Logger.getDefault().error(...data);
    }
}

