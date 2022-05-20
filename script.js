import Gradient from "./gradient.js"

const result = document.getElementById('result')
const code = document.getElementById('code')
const tag = document.getElementById('tag')
const username = document.getElementById('username')
const colorStart = document.getElementById('colorStart')
const colorEnd = document.getElementById('colorEnd')
const swapColors = document.getElementById('swapColors')
const inputs = document.getElementsByTagName('input')
const copyCode = document.getElementById('copyCode')

const wide = document.getElementById('wide')
const narrow = document.getElementById('narrow')
const bold = document.getElementById('bold')
const shadow = document.getElementById('shadow')

let codeToCopy

generate()

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', generate)
}

swapColors.addEventListener('click', () => {
    let startColor = colorStart.value
    let endColor = colorEnd.value
    colorStart.value = endColor
    colorEnd.value = startColor
    generate()
})

copyCode.addEventListener('click', () => {
    console.log('copy')
    navigator.clipboard.writeText(codeToCopy);
})

function generate () {
    let codeTag = ''
    let resultTag = ''
    let nChar = tag.value.length;

    if (wide.checked) {
        codeTag += '$w'
        result.classList.add('wide')
    } else {
        result.classList.remove('wide')
    }

    if (narrow.checked) {
        codeTag += '$n'
        result.classList.add('narrow')
    } else {
        result.classList.remove('narrow')
    }

    if (bold.checked) {
        codeTag += '$o'
        result.classList.add('bold')
    } else {
        result.classList.remove('bold')
    }

    if (shadow.checked) {
        codeTag += '$s'
        result.classList.add('shadow')
    } else {
        result.classList.remove('shadow')
    }

    let gradient = [colorStart.value, ...(new Gradient()
        .setColorGradient(colorStart.value, colorEnd.value)
        .setMidpoint(Math.abs(nChar - 1))
        .getColors())]

    for (let i = 0; i < nChar; i++) {
        let hex = gradient[i]
        codeTag += '$' + hex[1] + hex[3] + hex[5] + tag.value[i]
        resultTag += '<span style="color: ' + hex + '">' + tag.value[i] + '</span>'
    }

    // TODO : transform $ to $$
    
    if (0 == nChar) {
        result.innerHTML = '<br>'
        code.innerHTML = '<br>'
        copyCode.hidden = true
    } else {
        result.innerHTML = '[<span class="result-tag">' + resultTag.toUpperCase() + '</span>] ' + username.value.toUpperCase()
        code.innerText = 'Code : ' + codeTag
        copyCode.hidden = false
    }

    codeToCopy = codeTag
}