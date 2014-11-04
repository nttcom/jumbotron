/**
 * Created by Pan on 7th October 2014.
 */

/* URLs */
var URL_CAMERA = 'jumbotron-camera.html';
var URL_VIEWER = 'jumbotron-viewer.html';

/* Start of Email Content */
var EMAIL_SUBJECT = 'HTML5 JUMBOTRON';

/* Body */
var EMAIL_BODY_EN = 'Participate on the big screen.\n\n Just click the URL below!\n\n';
var EMAIL_BODY_JP = 'みんなの顔をスクリーンに写そう！\n\n 以下のURLをクリックするだけで参加できます。\n\n';

function zeroPadding(number, length) {
    number = number - 0 + '';
    return (Array(length).join('0') + number).slice(-length);
}

function updateURLs(channel) {
    if (typeof channel !== 'string') {
        channel = $('#channel').val();
    }
    channel = zeroPadding(channel, 4);

    var cameraURLaddress = URL_HOST + URL_PATH + '#' + channel;
    $('#cameraUrl').val(cameraURLaddress);

    var displayAndNumber = URL_VIEWER +'#'+ channel;
    var cameraAndNumber = URL_CAMERA +'#'+ channel;

    $('#startDispUrl').attr('href', displayAndNumber);
    $('#startCamUrl').attr('href', cameraAndNumber);

    var emailCameraURLEN = 'mailto:?subject=' + encodeURIComponent(EMAIL_SUBJECT)
        + '&body=' + encodeURIComponent(EMAIL_BODY_EN + URL_SCHEME + URL_HOST + URL_PATH + '#' + channel);
    var emailCameraURLJP = 'mailto:?subject=' + encodeURIComponent(EMAIL_SUBJECT)
        + '&body=' + encodeURIComponent(EMAIL_BODY_JP + URL_SCHEME + URL_HOST + URL_PATH + '#' + channel);

    $('#emailLinkButtonEN').attr('href', emailCameraURLEN);
    $('#emailLinkButtonJP').attr('href', emailCameraURLJP);
}

function updateTextbox(channel) {
    if (typeof channel !== 'string') {
        channel = $('#channel').val();
    }
    channel = zeroPadding(channel, 4);
    $('#channel').val(channel);
}

function genChannel() {
    var channel = Math.floor(Math.random() * (9999 - 1 + 1 ) + 1) + '';
    updateURLs(channel);
    updateTextbox(channel);
}

var ALLOWED_KEYS = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // 0~9
    96, 97, 98, 99, 100, 101, 102, 103, 104, 105, // ten keys
    37, 38, 39, 40, // arrow keys
    8, 46, 16 // BackSpace, Delete, Shift
];

function preventExceptNumber(event) {
    var keyCode = event.keyCode;
    if (ALLOWED_KEYS.indexOf(keyCode) === -1) {
//        console.log(keyCode);
        event.preventDefault();
        return false;
    }
}

function prepareClipboard() {
    $('#cameraUrl').on('copy', function(/* ClipboardEvent */ e) {
        var textToCopy = URL_SCHEME + $('#cameraUrl').val();

        if (!textToCopy) {
            return;
        }
        e.clipboardData.clearData();
        e.clipboardData.setData('text/plain', textToCopy);
        //e.clipboardData.setData('text/html', '<b>' + textToCopy + '</b>');
        //e.clipboardData.setData('application/rtf', '{\\rtf1\\ansi\n{\\b ' + textToCopy + '}}');
        e.preventDefault();
    });
}

function preparePopover() {
    $('#cameraUrl').popover({
        trigger: 'aftercopy',
        delay: {
            show: 0,
            hide: 1000
        }
    });
}

$(document).on('ready', function() {
    genChannel();
    prepareClipboard();
    preparePopover();
});
$('#numGen').on('click', genChannel);
$('#channel')
    .on('keydown', preventExceptNumber)
    .on('keyup', updateURLs)
    .on('blur', updateTextbox);

$('#cameraUrl').on('mouseup', function() {
    $(this).select();
});
