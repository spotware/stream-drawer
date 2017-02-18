import {Drawer, IObservableToFill} from "../lib/stream-drawer";

window.onload = () => {
    const container = document.getElementById('container');
    const drawer = new Drawer(container);

    const observersToFill: IObservableToFill[] = [];

    const testObservable = {
        observableName: 'Test Observable',
        logsStamps: [
            {
                timeStamp: Date.now(),
                data: 'Data for stamp'
            },
            {
                timeStamp: Date.now() + 1000,
                data: 'Data for stamp + 1 sec'
            }]
    };

    observersToFill.push(testObservable);

    drawer.draw(observersToFill)
}
