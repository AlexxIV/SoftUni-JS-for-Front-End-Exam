function getAllPunshes(){
    let requestURL = 'https://punsh-master.firebaseio.com/data/punshes.json';

    $
        .get(requestURL)
        .then(renderAllPunshesInHTML)
        .catch((err) => console.log(err))
}

function renderAllPunshesInHTML(punshes) {
    let navBarAllItemsDiv = $('<div class="navbar-items">');

        for (let key in punshes){

        let punsh = punshes[key];

        let navBarSingleItemDiv = $('<div class="navbar-item">')
            .append('<h4>' + punsh['name'] + '</h4>');

        navBarAllItemsDiv
            .append(navBarSingleItemDiv);
    }
    $('.navbar')
        .append(navBarAllItemsDiv);
    attachPunshesEvents(punshes);
}

function attachPunshesEvents(punshes) {


    $('.navbar-item').click(function (e) {

        e.preventDefault();
        let currentName = $(this).text();
        $('.navbar-items').remove();
        getAllPunshesAgain(currentName);
    });

}

function getAllPunshesAgain(currentName){
    let requestURL = 'https://punsh-master.firebaseio.com/data/punshes.json';

    $
        .get(requestURL)
        .then(function(responseData){renderSinglePunshInHTML(responseData,currentName)})
        .catch((err) => console.log(err));

}

function renderSinglePunshInHTML(punshes,punshName) {

    let contentHeaderDiv = $('<div class="content-header">')
        .append('<div class="content-heading">' + punshName + '</div>');

    $('.content')
        .append(contentHeaderDiv);

    $('.content-heading').hover(function () {
        $(this).css('cursor','pointer');
    });

    let punshDataDiv = $('<div class="punsh-data">');

    for(let key in punshes){

        let punsh = punshes[key];

        if(punsh['name'] === punshName){

            let punshTypeDiv = $('<div class="punsh-type">')
                .append('<label>Type: </label>')
                .append('<h6>' + punsh['type'] + '</h6>');

            let punshContentsDiv = $('<div class="punsh-contents">')
                .append('<label>Contents: </label>')
                .append('<p>' + punsh['contents'] + '</p>');

            let punshDescriptionDiv = $('<div class="punsh-description">')
                .append('<label>Description: </label>')
                .append('<p>' + punsh['description'] + '</p>');

            punshDataDiv
                .append(punshTypeDiv)
                .append(punshContentsDiv)
                .append(punshDescriptionDiv);
        }
        $('.content')
            .append(punshDataDiv);
    }
    attachBackEvents();

}

function attachBackEvents(punshes) {
    $('.content-heading').click(function (e) {
        e.preventDefault();

        $('.content').empty();
        getAllPunshes();
    });
}

getAllPunshes();

