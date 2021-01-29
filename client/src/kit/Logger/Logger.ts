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
    public message: string = "";
    public data: any[] = [];
}

export interface ILogDriver {
    log(level: Level, message: string, ...data: any[]): void
}

export interface ILogger {
    getName(): string;
    info(message: string, ...data: any[]): void
    log(message: string, ...data: any[]): void
    debug(message: string, ...data: any[]): void
    warn(message: string, ...data: any[]): void
    error(message: string, ...data: any[]): void
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
    public log(level: Level, message: string, ...data: any[]): void {
        // Does nothing
    }
}

export class ConsoleLogger implements ILogDriver {
    public log(level: Level, message: string, ...data: any[]): void {
        switch (level) {
            case Level.INFO: {
                console.info(message, ...data)
            } break;
            case Level.LOG: {
                console.log(message, ...data);
            } break;
            case Level.DEBUG: {
                console.debug(message, ...data);
            } break;
            case Level.WARN: {
                console.warn(message, ...data);
            } break;
            case Level.ERROR: {
                console.error(message, ...data);
            } break;
        }
    }
}

export class MultiLogger implements ILogDriver {
    constructor(private targets: LogTarget[]) { }

    public log(level: Level, message: string, ...data: any[]): void {
        for (let target of this.targets) {
            if (target.matches(level)) {
                target.logger.log(level, message, ...data);
            }
        }
    }
}

export class Logger implements ILogger {
    private static logger?: ILogDriver;
    private static loggerFactory?: LoggerFactory;

    constructor(private target: ILogDriver, private name = "") { }

    public getName(): string {
        return this.name;
    }

    public info(message: string, ...data: any[]): void {
        this.target.log(Level.INFO, message, ...data);
    }

    public log(message: string, ...data: any[]): void {
        this.target.log(Level.LOG, message, ...data);
    }

    public debug(message: string, ...data: any[]): void {
        this.target.log(Level.DEBUG, message, ...data);
    }

    public warn(message: string, ...data: any[]): void {
        this.target.log(Level.WARN, message, ...data);
    }

    public error(message: string, ...data: any[]): void {
        this.target.log(Level.ERROR, message, ...data);
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

    // static setLogger(logger: Logger | null ) {
    //     Logger.logger = logger;
    // }

    // static info(message: string, ...data: any[]): void {
    //     Logger.logger?.info(message, ...data);
    // }

    // static log(message: string, ...data: any[]): void {
    //     Logger.logger?.log(message, ...data);
    // }

    // static debug(message: string, ...data: any[]): void {
    //     Logger.logger?.debug(message, ...data);
    // }

    // static warn(message: string, ...data: any[]): void {
    //     Logger.logger?.warn(message, ...data);
    // }

    // static error(message: string, ...data: any[]): void {
    //     Logger.logger?.error(message, ...data);
    // }
}

