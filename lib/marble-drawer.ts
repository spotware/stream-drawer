declare const require: any;
require('../css/styles.css');
import * as $ from "jquery";

interface ILogs {
    timeStamp: number,
    data: string
}

export interface IObservableToFill {
    observableName: string,
    logsStamps: ILogs[]
}

export class Drawer {
    private $streams: JQuery;
    private initialTime = new Date().getTime();
    private formattedObservers: IObservableToFill [] = [];

    constructor(private $container: JQuery){
        this.initDom();
    }

    private initDom(){
        this.$streams = $(`<ul class="streams"></ul>`);
        this.$container.append(this.$streams);
    }

    private getContent(): JQuery {
        return $(`<li class="stream">
                    <div class="stream_name"></div>
                    <div class="stream_line"></div>
                </li>`)
    }

    public draw(observersToFill: IObservableToFill[]): void{
        let currentTime = new Date().getTime();
        let totalSeconds = (currentTime - this.initialTime)/1000;
        observersToFill.forEach(observerToFill => {
            this.drawStream(observerToFill, totalSeconds);
        });
    }

    private drawStream(params: IObservableToFill, totalSeconds: number) {
        this.drawMarbles(params, totalSeconds);
    }

    private getPositionsInSeconds(params: IObservableToFill): number[]{
        let logs = params.logsStamps;
        let positions = [];
        for (let i=0; i<logs.length; i++) {
            positions.push(Math.floor((logs[i].timeStamp - this.initialTime)/1000 * 10));
        }
        return positions
    }

    public drawMarbles(observer: IObservableToFill, totalSeconds: number){
        let $content = this.getContent();
        let $name = $content.find('.stream_name');
        $name.text(`${observer.observableName}`);

        let $line = $content.find('.stream_line');
        let logs = observer.logsStamps;
        logs.forEach(log => {
            let position = Math.floor((log.timeStamp - this.initialTime)/1000 * 10)
            let relativeTime = Math.floor(position / totalSeconds * 100);
            let $marble = $(`<a class="stream_line__marble" title="${log.data}"></a>`);
            $marble.css('left', `${relativeTime}px`);
            $line.append($marble);
        });

        this.$streams.append($content);
    }
}
