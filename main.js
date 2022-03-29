const baseUrl = 'https://http.dog';
const form = document.getElementById('controls');
const field = document.getElementById('http-status-code');
const imgContainer = document.getElementById('imgContainer');
const imageHistory = [];
const historyContainer = document.getElementById('history');

form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
    evt.preventDefault();
    let code = field.value;
    try {
        let statusImage = await getStatusImage(code);
        show(statusImage);
        history(statusImage);
    } catch (error) {
        alert(error)
    }
}

async function getStatusImage(code){
    let response = await fetch(`${baseUrl}/${code}.jpg`);
    if(response.status == 200){
        let img = await response.blob();
        return {code, img};
    } else {
        throw("Failed")
    }
}

function show(statusImage){

    let reader = new FileReader();
    reader.readAsDataURL(statusImage.img);

    reader.onload = function() {
        imgContainer.src = `data:${reader.result}`
        field.value = statusImage.code;
    };

}

function history(statusImage) {
    imageHistory.push(statusImage);
    
    let img = document.createElement('img');

    let reader = new FileReader();
    reader.readAsDataURL(statusImage.img);

    reader.onload = function() {
        
        img.src = `data:${reader.result}`
        img.addEventListener('click',()=>{show(statusImage)});

        let paragraf = document.querySelector('#history > p');
        if(paragraf !== null){
            paragraf.remove();
        }

        historyContainer.appendChild(img);

    };

}

field.focus();