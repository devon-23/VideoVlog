function buildTextTimeline(duration) {

    return [
        {
            type: "date",
            text: new Date().toLocaleDateString(),
            start: 1,
            end: 3
        }
    ];

}


module.exports = buildTextTimeline;