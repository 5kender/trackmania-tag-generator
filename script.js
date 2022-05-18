import Gradient from "./gradient.js"

const result = document.getElementById('result')
const code = document.getElementById('code')
const tag = document.getElementById('tag')
const username = document.getElementById('username')
const colorStart = document.getElementById('colorStart')
const colorEnd = document.getElementById('colorEnd')
const swapColors = document.getElementById('swapColors')
const inputs = document.getElementsByTagName('input')

const generate = () => {
    let codeTag = ''
    let resultTag = ''
    let nChar = tag.value.length;

    let gradient = [colorStart.value, ...(new Gradient()
        .setColorGradient(colorStart.value, colorEnd.value)
        .setMidpoint(Math.abs(nChar - 1))
        .getColors())]

    for (let i = 0; i < nChar; i++) {
        let hex = gradient[i]
        let tmColor = '$'
        tmColor += hex[1] + hex[3] + hex[5]
        codeTag += tmColor + tag.value[i]
        resultTag += '<span style="color: ' + hex + '">' + tag.value[i] + '</span>'
    }
    
    if (0 == nChar) {
        result.innerHTML = '<br>'
    } else {
        result.innerHTML = '[' + resultTag.toUpperCase() + '] ' + username.value.toUpperCase()
    }

    code.innerText = 'Code : ' + codeTag
}

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