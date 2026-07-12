function splitQuote(quote, duration){


    let maxWords;


    if(duration < 10){

        maxWords = 4;

    }

    else if(duration < 20){

        maxWords = 7;

    }

    else if(duration < 40){

        maxWords = 10;

    }

    else {

        maxWords = 14;

    }



    const words =
        quote.split(" ");



    let sections=[];


    let current=[];


    words.forEach(word=>{


        current.push(word);


        if(current.length >= maxWords){

            sections.push(
                current.join(" ")
            );

            current=[];

        }


    });



    if(current.length){

        sections.push(
            current.join(" ")
        );

    }


    return sections;

}


module.exports = splitQuote;