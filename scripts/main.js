function initBoard() {
    var board = $('#board');
    for (var i=0; i<8; i++) {
        var tr = $('<tr></tr>');
        tr.attr('id', String.fromCharCode(i+97));
        board.append(tr);
        for (var j=0; j<8; j++) {
            var td = $('<td></td>');
            td.attr('id', String.fromCharCode(i+97) + j);
            td.addClass(colors[i][j]);
            td.addClass('color');
            tr.append(td);
        }
    }
}

function placePawns() {
    for (var i=0; i<8; i++) {
        var td = $('#a td:nth-child(' + (i+1) + ')');
        var whitePawn = $('<div></div>');
        whitePawn.attr('id', "w-" + colors[0][i]);
        whitePawn.addClass(colors[0][i]);
        whitePawn.addClass('white-pawn');
        whitePawn.click(function() {
            showAllowedPlaces(getPosition($(this)));
        });
        td.append(whitePawn);
    }

    for (var i=0; i<8; i++) {
        var td = $('#h td:nth-child(' + (i+1) + ')');
        var blackPawn = $('<div></div>');
        blackPawn.attr('id', "b-" + colors[7][i]);
        blackPawn.addClass(colors[7][i]);
        blackPawn.addClass('black-pawn');
        td.append(blackPawn);
    }
}

function getPosition(pawn) {
    return pawn.parent().attr('id');
}

function showAllowedPlaces(id) {
    var ligne = id.substring(0,1).charCodeAt(0)-97;
    var col = id.substring(1,2);

    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            if (j == col) {
                var td = $('#board tr:nth-child(' + (i+1) + ') ' + 'td:nth-child(' + (j+1) + ')');
                if (i!= ligne && !td.children().first().hasClass('black-pawn')) {
                    td.append('<p>OK</p>');
                }
            }

        }
    }
}

function main() {
    initBoard();
    placePawns();
}

main();
