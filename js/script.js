import Gradient from "./gradient.js"

const result = document.getElementById('result')
const code = document.getElementById('code')
const tag = document.getElementById('tag')
const mapName = document.getElementById('mapName')
const username = document.getElementById('username')

const gradiant = document.getElementById('gradiant')
const oneColor = document.getElementById('oneColor')
const colorStart = document.getElementById('colorStart')
const colorEnd = document.getElementById('colorEnd')
const color1 = document.getElementById('color1')
const swapColors = document.getElementById('swapColors')
const wrapperGradiant = document.getElementById('wrapperGradiant')
const wrapperOneColor = document.getElementById('wrapperOneColor')

const inputs = document.getElementsByTagName('input')
const copyCode = document.getElementById('copyCode')

const wide = document.getElementById('wide')
const narrow = document.getElementById('narrow')
const bold = document.getElementById('bold')
const shadow = document.getElementById('shadow')

let codeToCopy
let textToFormat

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
    if (tag) {
        textToFormat = tag.value
    } else if (mapName) {
        textToFormat = mapName.value
    }
    let codeTag = ''
    let resultTag = ''
    let nChar = textToFormat.length
    
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

    // Background color for map name

    if (bgColor) {
        result.style.backgroundColor = bgColor.value
    }

    if (gradiant.checked) {
        wrapperGradiant.style.display = 'block'
        wrapperOneColor.style.display = 'none'

        let gradient = [colorStart.value, ...(new Gradient()
            .setColorGradient(colorStart.value, colorEnd.value)
            .setMidpoint(Math.abs(nChar - 1))
            .getColors())]
    
        for (let i = 0; i < nChar; i++) {
            let hex = gradient[i]
            codeTag += '$' + hex[1] + hex[3] + hex[5] + textToFormat[i].replace('$', '$$$')
            resultTag += '<span style="color: ' + hex + '">' + textToFormat[i] + '</span>'
        }
    } else if (oneColor.checked) {
        wrapperOneColor.style.display = 'block'
        wrapperGradiant.style.display = 'none'

        let hex = color1.value
        codeTag += '$' + hex[1] + hex[3] + hex[5] + textToFormat.replace('$', '$$$')
        resultTag += '<span style="color: ' + hex + '">' + textToFormat + '</span>'
    }
    
    if (0 == nChar) {
        result.innerHTML = '<br>'
        code.innerHTML = '<br>'
        copyCode.hidden = true
    } else {
        let usernameText = username ? username.value.toUpperCase() : ''
        result.innerHTML = '[<span class="result-tag">' + resultTag.toUpperCase() + '</span>] ' + usernameText
        code.innerText = 'Code : ' + codeTag
        copyCode.hidden = false
    }

    codeToCopy = codeTag
}