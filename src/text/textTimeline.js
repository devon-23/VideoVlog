function buildTextTimeline(date, quoteSections, duration) {


    const timeline = [];


    // Date card

    timeline.push({

        text: date,

        type: "date",

        start: 1,

        end: 3,

        position: "top"

    });



    const quoteStart = 3;

    const endingTime = duration - 2;


    const available =
        endingTime - quoteStart;


    const sectionDuration =
        available / quoteSections.length;



    const positions = [

        "center",

        "left",

        "right",

        "bottom",

        "top"

    ];



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

                    ? duration

                    : Number(
                        (
                        quoteStart +
                        (index + 1) * sectionDuration
                        )
                        .toFixed(2)
                    ),


            position:
                positions[index % positions.length]

        });


    });


    return timeline;

}


module.exports = buildTextTimeline;