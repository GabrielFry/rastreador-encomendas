const inputBox = document.getElementById("input-box");
const outputBox = document.getElementById("output");
const outputBox2 = document.getElementById("output2");
const copytext = outputBox.value

inputBox.addEventListener("keyup", function(event){
    if (event.key === "Enter") {
        rastrear();
    }
});


function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (response.status === 429) {
                throw new Error('Too Many Requests');
            }
            return response.json();
        });
 }


function rastrear(){
    outputBox.innerHTML = '';
    if(inputBox.value === ''){
        alert("Insira um código de rastreio...")}
    else{  
        var codigo = inputBox.value
        fetch('https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=' + codigo)
        .then(response => response.json())
        .then(data => {
            delete data.host;
            delete data.time;
            delete data.quantidade;
            delete data.servico;
            delete data.ultimo;

            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key === 'eventos') {
                    data[key].forEach(evento => {
                        delete evento.subStatus;
                        for (let eventKey in evento) {
                            if (evento.hasOwnProperty(eventKey)) {
                                outputBox2.innerHTML = "🚀";
                                outputBox.innerHTML += eventKey + ": " + evento[eventKey] + "<br>";
                            }
                        }
                        outputBox.innerHTML += "<br>";
                    });
                    } else {
                        outputBox.innerHTML += key + ": " + data[key] + "<br>";
                    }
                }
            }
            inputBox.value = "";   
        })
        .catch(error => {
            console.error(error);
            // retry the request after a delay
            setTimeout(rastrear, 1000);
    }
)}};

function copiartexto(){
    var copytext = document.createElement('textarea');
    copytext.textContent = outputBox.innerHTML;
    document.body.appendChild(copytext);
    copytext.select();
    copytext.setSelectionRange(0,99999);
    var textToCopy = copytext.value.replace(/<br>/g, '\n');
    navigator.clipboard.writeText(textToCopy);
    document.body.removeChild(copytext);
    alert("Rastreio Copiado");
}


