"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
require('../css/styles.css');
var Drawer = (function () {
    function Drawer(container) {
        this.initialTime = new Date().getTime();
        this.contentStream = [];
        this.container = container;
        this.render();
    }
    Drawer.prototype.render = function () {
        var _this = this;
        var stream = this.contentStream.map(function (content, index) {
            var logs = content.observables.logsStamps;
            var marbles = logs.map(function (log, marbleKey) {
                var position = Math.floor((log.timeStamp - _this.initialTime) / 1000 * 10);
                // let relativeTime = Math.floor(position / content.totalSeconds * CONST_TOTAL_TIME);
                var relativeTime = Math.floor(position / content.totalSeconds);
                var finalStyle = { left: relativeTime + "px" };
                return (React.createElement("a", { className: "stream_line__marble", title: log.data, style: finalStyle, key: marbleKey }));
            });
            return (React.createElement("li", { className: "stream", key: index },
                React.createElement("div", { className: "stream_name" }, content.observables.observableName),
                React.createElement("div", { className: "stream_line" }, marbles)));
        });
        var element = (React.createElement("ul", { className: "streams" }, stream));
        ReactDOM.render(element, this.container);
    };
    Drawer.prototype.draw = function (observersToFill) {
        var _this = this;
        var currentTime = new Date().getTime();
        var totalSeconds = (currentTime - this.initialTime) / 1000;
        observersToFill.forEach(function (observables) {
            _this.contentStream.push({ observables: observables, totalSeconds: totalSeconds });
            _this.render();
        });
    };
    return Drawer;
}());
exports.Drawer = Drawer;
//# sourceMappingURL=stream-drawer.js.map