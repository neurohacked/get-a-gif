// VARIABLES ===========================================================

// General variables -----------------------------------------------
$gifsView = $('#gifsView');
gif = 'super+nintendo';

// Initial array of gifs
var gifs = ['Super Mario World', 'TMNT IV Turtles in Time', 'A Link to the Past', 'Kirby Super Star', 'Super Punch Out',];

// FUNCTIONS ============================================================

// Generic function for displaying gif data ------------------------
function renderButtons() {
    $('#buttonsView').empty();
    // Loops through the array of gifs
    for (var i = 0; i < gifs.length; i++) {
        // Then dynamicaly generate buttons for each gif in the array
        var a = $('<button>');
        a.addClass('btn btn-sm btn-default btn-gif');
        a.attr('data-name', gifs[i]);
        a.text(gifs[i]);
        $('#buttonsView').append(a);
    }
}

// Re-renders the HTML to display the appropriate content. ---------
function displayGifs() {
    $('#gifsView').empty();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=30";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        var results = response.data;
        gifsView = $('#gifsView');

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class="gif hoverable">')
                var slug = results[i].slug;
                var span = $('<span class="slug">').text("slug: " + slug);
            var gifImage = $('<img>');
            gifImage.attr('src', results[i].images.fixed_height.url);

            gifDiv.append(span)
            gifDiv.append(gifImage)

            $('#gifsView').append(gifDiv);
        }
    });
}

// PROCESSES ============================================================

// Display the GIFs ------------------------------------------------
$(document).on('click', '.btn-gif', function() {
    gif = $(this).attr('data-name');
    displayGifs();
});

// Search for new gifs ---------------------------------------------
// Button click
$(document).on('click', '.btn-search', function() {
    gif = $('.form-control').val();
    displayGifs();
    return false;
});
// Enter in input field
$('#txt-search').keypress(function(e) {
    if (e.which == 13) {
        gif = $('.form-control').val();
        displayGifs();
        return false;
    }
});

renderButtons();
displayGifs();
