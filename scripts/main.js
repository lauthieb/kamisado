var currentPawn = null;
var currentPlayer = null;
var finish = false;
var winner = null;

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
        var td = $('#a' + i);
        var whitePawn = $('<div></div>');
        whitePawn.attr('id', "w-" + colors[0][i]);
        whitePawn.addClass(colors[0][i]);
        whitePawn.addClass('white-pawn');
        whitePawn.css('cursor', 'pointer');
        whitePawn.click(function() {
            if (currentPawn == null) {
                currentPawn = $(this);
                updatePointers();
                showAllowedPlacesWhite(getPosition($(this)));
            } else {
                if (currentPawn.attr('id') == $(this).attr('id')) {
                    currentPawn = null;
                    updatePointers();
                    cleanDispos();
                }
            }
        });
        td.append(whitePawn);
    }

    for (var i=0; i<8; i++) {
        var td = $('#h' + i);
        var blackPawn = $('<div></div>');
        blackPawn.attr('id', "b-" + colors[7][i]);
        blackPawn.addClass(colors[7][i]);
        blackPawn.addClass('black-pawn');
        blackPawn.css('cursor', 'pointer');
        blackPawn.click(function() {
            if (currentPawn == null) {
                currentPawn = $(this);
                updatePointers();
                showAllowedPlacesBlack(getPosition($(this)));
            } else {
                if (currentPawn.attr('id') == $(this).attr('id')) {
                    currentPawn = null;
                    updatePointers();
                    cleanDispos();
                }
            }
        });
        td.append(blackPawn);
    }
}

function getPosition(pawn) {
    return pawn.parent().attr('id');
}

function createDispo(td) {
    var rect = $('<div></div>');
    rect.addClass('dispo');
    rect.click(function() {
        moveTo($(this).parent().attr('id'));
        cleanDispos();
        checkFinish();
    });
    td.append(rect);
}

function moveTo(id) {
    $('#' + id).append(currentPawn);
    currentPawn = null;
    updatePointers();
}

function cleanDispos() {
    $('.dispo').remove();
}

function updatePointers() {
    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            var td = $('#board tr:nth-child(' + (i+1) + ') ' + 'td:nth-child(' + (j+1) + ')');
            if(currentPawn == null) {
                td.children().first().css('cursor', 'pointer');
            } else {
                if (td.children().first().attr('id') != currentPawn.attr('id')) {
                    td.children().first().css('cursor', 'default');
                }
            }
        }
    }
}

function checkFinish() {
    for (var i=0; i<8; i++) {
        var td = $('#a' + i);
        if(td.children().first().hasClass('black-pawn')) {
            finish = true;
            winner = 'black';
        }
        var td2 = $('#h' + i);
        if(td2.children().first().hasClass('white-pawn')) {
            finish = true;
            winner = 'white';
        }
    }
    return false;
}

function showAllowedPlacesWhite(id) {
    var ligne = parseInt(id.substring(0,1).charCodeAt(0)-97);
    var col = parseInt(id.substring(1,2));
    var foundCol = false;
    var foundLDiag = false;
    var foundRDiag = false;

    for (var i=0; i<8; i++) {
        for (var j=0; j<8; j++) {
            var td = $('#board tr:nth-child(' + (i+1) + ') ' + 'td:nth-child(' + (j+1) + ')');
            if (i > ligne) {
                if (j == col) {
                    if (td.children().first().hasClass('black-pawn') || td.children().first().hasClass('black-pawn')) {
                        foundCol = true;
                    }
                    if (!foundCol) {
                        createDispo(td);
                    }
                }
                if ((i+j) == (col+ligne)) {
                    if (td.children().first().hasClass('black-pawn') || td.children().first().hasClass('black-pawn')) {
                        foundLDiag = true;
                    }
                    if (!foundLDiag) {
                        createDispo(td);
                    }
                }
                if ((j-i) == (col-ligne)) {
                    if (td.children().first().hasClass('black-pawn') || td.children().first().hasClass('white-pawn')) {
                        foundRDiag = true;
                    }
                    if (!foundRDiag) {
                        createDispo(td);
                    }
                }
            }
        }
    }
}

function showAllowedPlacesBlack(id) {
    var ligne = parseInt(id.substring(0,1).charCodeAt(0)-97);
    var col = parseInt(id.substring(1,2));
    var foundCol = false;
    var foundLDiag = false;
    var foundRDiag = false;

    for (var i=7; i>=0; i--) {
        for (var j=7; j>=0; j--) {
            var td = $('#board tr:nth-child(' + (i+1) + ') ' + 'td:nth-child(' + (j+1) + ')');
            if (i < ligne) {
                if (j == col) {
                    if (td.children().first().hasClass('black-pawn') || td.children().first().hasClass('white-pawn')) {
                        foundCol = true;
                    }
                    if (!foundCol) {
                        createDispo(td);
                    }
                }
                if ((i+j) == (col+ligne)) {
                    if (td.children().first().hasClass('black-pawn') || td.children().first().hasClass('white-pawn')) {
                        foundLDiag = true;
                    }
                    if (!foundLDiag) {
                        createDispo(td);
                    }
                }
                if ((j-i) == (col-ligne)) {
                    if (td.children().first().hasClass('black-pawn') || td.children().first().hasClass('white-pawn')) {
                        foundRDiag = true;
                    }
                    if (!foundRDiag) {
                        createDispo(td);
                    }
                }
            }
        }
    }
}

function main() {
    initBoard();
    placePawns();
    currentPlayer = 'black';
    finish = false;
    updatePointers();
}

main();
