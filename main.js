const baseUrl = 'https://http.dog';
const form = document.getElementById('controls');
const field = document.getElementById('http-status-code');
const imgContainer = document.getElementById('imgContainer');
const imageHistory = [];
const historyContainer = document.getElementById('history');

form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
    evt.preventDefault();
    let id = field.value;
    try {
        let image = await getImage(id);
        show(image);
        history(image);
    } catch (error) {
        alert(error)
    }
}

async function getImage(id){
    let response = await fetch(`${baseUrl}/${id}.jpg`);
    if(response.status == 200){
        let img = await response.blob();
        return img;
    } else {
        throw("Failed")
    }
}

function show(image){

    let reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = function() {
        imgContainer.src = `data:${reader.result}`
    };

}

function history(image) {
    imageHistory.push(image);
    
    let img = document.createElement('img');

    let reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = function() {
        
        img.src = `data:${reader.result}`
        img.addEventListener('click',()=>{show(image)});

        let paragraf = document.querySelector('#history > p');
        if(paragraf !== null){
            paragraf.remove();
        }

        historyContainer.appendChild(img);

    };

}

field.focus();