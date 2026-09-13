function getPosition(position){


    switch(position){


        case "left":

            return {

                x:"100",

                y:"(h-text_h)/2"

            };


        case "right":

            return {

                x:"w-text_w-100",

                y:"(h-text_h)/2"

            };


        case "top":

            return {

                x:"(w-text_w)/2",

                y:"150"

            };


        case "bottom":

            return {

                x:"(w-text_w)/2",

                y:"h-text_h-150"

            };


        default:

            return {

                x:"(w-text_w)/2",

                y:"(h-text_h)/2"

            };

    }

}


// Picks a random spot for the text, keeping the whole text box (whatever
// its rendered width/height turns out to be, via drawtext's text_w/text_h)
// at least marginX/marginY away from every edge, so it never gets cut off
// and doesn't land in the same place twice.
function getRandomPosition(marginX = 100, marginY = 150){

    const randX = Math.random().toFixed(4);
    const randY = Math.random().toFixed(4);

    // clip() keeps the box on-screen even if a future quote is long
    // enough that (w - text_w - marginX*2) would otherwise go negative.
    // Commas inside are backslash-escaped since these values are dropped
    // into the filtergraph unquoted, where "," normally separates filters.
    return {

        x: `clip(${marginX}+(${randX})*(w-text_w-${marginX * 2})\\,0\\,w-text_w)`,

        y: `clip(${marginY}+(${randY})*(h-text_h-${marginY * 2})\\,0\\,h-text_h)`

    };

}


module.exports = getPosition;
module.exports.getRandomPosition = getRandomPosition;