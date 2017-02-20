import * as React from 'react';
import * as ReactDOM from 'react-dom';
declare const require: any;
require('../css/styles.css');

interface ILogs {
    timeStamp: number,
    data: string
}

export interface IObservableToFill {
    observableName: string,
    logsStamps: ILogs[]
}

interface IStreamComponent {
    observables: IObservableToFill;
    totalSeconds: number
}

export class Drawer {
    private container: HTMLElement;
    private initialTime = new Date().getTime();
    private contentStream: IStreamComponent [] = [];

    constructor(container: HTMLElement) {
        this.container = container;
        this.render();
    }

    private render() {
        const stream = this.contentStream.map((content, index) => {
            let logs = content.observables.logsStamps;
            const marbles = logs.map((log, marbleKey) => {
                let position = Math.floor((log.timeStamp - this.initialTime)/1000 * 10);
                // let relativeTime = Math.floor(position / content.totalSeconds * CONST_TOTAL_TIME);
                let relativeTime = Math.floor(position / content.totalSeconds * 100);
                const finalStyle = {left:`${relativeTime}px`};
                return (
                    <a className="stream_line__marble" title={log.data} style={finalStyle} key={marbleKey}></a>
                )
            });

            return (
                <li className="stream" key={index}>
                    <div className="stream_name">{content.observables.observableName}</div>
                    <div className="stream_line">
                        {marbles}
                    </div>
                </li>
            );
        });

        const element = (
            <ul className="streams">
                {stream}
            </ul>
        );
        ReactDOM.render(
            element,
            this.container)
    }

    public draw(observersToFill: IObservableToFill[]): void {
        let currentTime = new Date().getTime();
        let totalSeconds = (currentTime - this.initialTime) / 1000;
        observersToFill.forEach(observables => {
            this.contentStream.push({observables, totalSeconds});
            this.render();
        });
    }
}
