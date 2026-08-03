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


module.exports = getPosition;