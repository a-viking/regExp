function handleRegExpInput(input) {
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
