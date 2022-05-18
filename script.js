const result = document.getElementById('result')
const exemple = document.getElementById('exemple')
const tag = document.getElementById('tag')
const colorStart = document.getElementById('colorStart')
const colorEnd = document.getElementById('colorEnd')
const inputs = document.getElementsByTagName('input')

const generate = () => {
    let generatedTag = ''
    let exempleTag = ''
    let nChar = tag.value.length;

    for (let i = 0; i < nChar; i++) {
        let hex = colorStart.value
        let tmColor = '$'
        tmColor += hex[1] + hex[3] + hex[5]
        generatedTag += tmColor + tag.value[i]
        exempleTag += '<span style="color: ' + hex + '">' + tag.value[i] + '</span>'
    }
    
    result.innerText = generatedTag
    exemple.innerHTML = exempleTag
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', generate)
    
}