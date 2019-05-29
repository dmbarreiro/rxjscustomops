import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum RxJsLoggingLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let globalRxJsLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
    globalRxJsLoggingLevel = level;
}

export const debug = (level: number, message: string) =>
    (source: Observable<any>) => source
        .pipe(
            tap(val => {
                if (level >= globalRxJsLoggingLevel) {
                    console.log(`${message}: `, val);
                }
            })
        );
