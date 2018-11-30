function handleRegExpInput(input, event) {
    if (event.keyCode !== 13) {
        return;
    }
    clearLog();
    var textNode = document.getElementById('text-example');
    var textExample = textNode.innerText;

    if (input.value === '') {
        hideErrorWindow();
        textNode.innerHTML = '<p>' + textExample + '</p>';
        return;
    }
    var regExp;
    try {
        regExp = new RegExp(input.value, 'g');
    } catch (error) {
        showErrorWindow(error);
        return;
    }
    hideErrorWindow();
    var tempObj;
    var resultHtml = '<p>';
    var startIndex = 0;
    while ((tempObj = regExp.exec(textExample)) !== null) {
        resultHtml += textExample.substring(startIndex, tempObj.index);
        resultHtml += '<b>' + tempObj[0] + '</b>';
        startIndex = regExp.lastIndex;
        var logMessage = 'Found \'' + tempObj[0] + '\' on position ' + tempObj.index;
        writeLog(logMessage);
        if (startIndex === textExample.length) {
            break;
        }
    }
    if (startIndex < textExample.length) {
        resultHtml += textExample.substring(startIndex);
        resultHtml += '</p>';
    }
    textNode.innerHTML = resultHtml;
}

function showErrorWindow(error) {
    var popup = document.querySelector('.error-popup-modal');
    popup.firstElementChild.innerText = error;
    popup.classList.add('show');
}

function hideErrorWindow() {
    var popup = document.querySelector('.error-popup-modal');
    popup.classList.remove('show');
}

function writeLog(text) {
    var logNode = document.getElementById('log');
    logNode.innerHTML += '<p>' + text + '</p>';
}

function clearLog() {
    var logNode = document.getElementById('log');
    logNode.innerHTML = '';
}
