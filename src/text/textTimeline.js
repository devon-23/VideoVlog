const { getRandomPosition } = require("./textPosition");

function buildTextTimeline(date, quoteSections, duration, endingStart) {

    const timeline = [];


    timeline.push({

    text: date,   // <-- was date.toLocaleDateString()

    type: "date",

    start: 1,

    end: 3,

    position: "top"

});


    const quoteStart = 3;

    const endingTime = endingStart;

    const available =
        endingTime - quoteStart;


    const sectionDuration =
        available / quoteSections.length;


    quoteSections.forEach((section,index)=>{

        timeline.push({

            text: section,

            type:"quote",

            start:
                Number(
                    (
                    quoteStart +
                    index * sectionDuration
                    )
                    .toFixed(2)
                ),

            end:
                index === quoteSections.length - 1

                    ? endingTime

                    : Number(
                        (
                        quoteStart +
                        (index + 1) * sectionDuration
                        )
                        .toFixed(2)
                    ),

            position: getRandomPosition()

        });

    });


    return timeline;

}


module.exports = buildTextTimeline;