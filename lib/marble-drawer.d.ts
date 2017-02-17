export interface ILogs {
    timeStamp: number,
    data: string
}

export interface IObservableToFill {
    observableName: string,
    logsStamps: ILogs[]
}

export declare class Drawer {
    constructor($container: JQuery);
    public draw(observersToFill: IObservableToFill[]): () => void;
    private drawStream(params: IObservableToFill, totalSeconds: number): () => void;
    public drawMarbles(observer: IObservableToFill, totalSeconds: number): () => void;
}
