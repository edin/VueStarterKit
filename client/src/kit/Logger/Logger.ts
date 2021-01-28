export enum Level {
    INFO,
    LOG,
    DEBUG,
    WARN,
    ERROR
}

export class LogMessage {
    public level: Level = Level.INFO;
    public message: string = "";
    public data: any[] = [];
}

export interface ILogDriver {
    log(level: Level, message: string, ...data: any[]): void
}

export interface ILogger {
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
    log(level: Level, message: string, ...data: any[]): void {
        // Does nothing
    }
}

export class ConsoleLogger implements ILogDriver {
    log(level: Level, message: string, ...data: any[]): void {
        switch(level) {
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

    log(level: Level, message: string, ...data: any[]): void {
        for(let target of this.targets) {
           if (target.matches(level)) {
                target.logger.log(level, message, ...data);
           }
        }
    }
}

export class Logger {
    constructor(private target: ILogDriver) {}

    debug(message: string, ...data: any[]): void {
        this.target.log(Level.DEBUG, message, ...data);
    }
}
