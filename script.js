const result = document.getElementById('result')
const code = document.getElementById('code')
const tag = document.getElementById('tag')
const username = document.getElementById('username')
const colorStart = document.getElementById('colorStart')
const colorEnd = document.getElementById('colorEnd')
const inputs = document.getElementsByTagName('input')

const generate = () => {
    let codeTag = ''
    let resultTag = ''
    let nChar = tag.value.length;

    for (let i = 0; i < nChar; i++) {
        let hex = colorStart.value
        let tmColor = '$'
        tmColor += hex[1] + hex[3] + hex[5]
        codeTag += tmColor + tag.value[i]
        resultTag += '<span style="color: ' + hex + '">' + tag.value[i] + '</span>'
    }
    
    result.innerHTML = '[' + resultTag.toUpperCase() + '] ' + username.value.toUpperCase()
    code.innerText = codeTag
}

generate()

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', generate)
}