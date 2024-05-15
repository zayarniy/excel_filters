const MAX_LENGTH = 6;
const targetPassword = 'qqwwee';
let password = '';
let si = null;

let taskInfo =
{
    testName: 'ExcelFilter',
    percents: 0,
    scores: 0,
    timeStart: '',
    timeFinish: '',
    lastName: '',
    firstName: '',
    countAttempts: 0,
    maxBall: 20,
    permissibleError: 5,
    errorAttempts: 0,
    maxErrors: 3,
    calculatePercent: function () {
        if (this.errorAttempts <= this.maxErrors)
            return ((this.countAttempts - this.errorAttempts) / this.maxBall * 100).toFixed(2)
        else
            return (((this.countAttempts - (this.errorAttempts)) / this.maxBall) * 100).toFixed(2);
    },
    ball: function () {
        let ball = parseFloat(this.calculatePercent());
        if (ball >= 90) this.ball = 5;
        if (ball < 90 && ball >= 75) this.ball = 4;
        if (ball < 75 && ball >= 50) this.ball = 3;
        if (ball < 50) this.ball = 2;
        return this.ball;
    }

}

function initTaskInfo() {

    taskInfo.testName = 'ExcelFilter'
    taskInfo.percents = 0
    taskInfo.scores = 0
    taskInfo.timeStart = ''
    taskInfo.timeFinish = ''
    taskInfo.lastName = ''
    taskInfo.firstName = ''
    taskInfo.countAttempts = 0
    taskInfo.maxBall = 20
    taskInfo.errorAttempts = 0
    taskInfo.maxErrors = 3
    taskInfo.maxCountAttempts = 28
}


function timerStart() {
    si = setInterval(tick, 1000);
}

function tick() {
    document.getElementById('timeDuration').innerHTML = getDurationTime();
}

function getDurationTime() {
    let diffInMilliseconds = new Date() - timeStart;
    // Преобразуем миллисекунды в часы, минуты и секунды
    let hours = String(Math.floor(diffInMilliseconds / (1000 * 60 * 60))).padStart(2, '0');
    let minutes = String(Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    let seconds = String(Math.floor((diffInMilliseconds % (1000 * 60)) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;

}

function inputText(title, html, inputPlaceholder) {
    return Swal.fire({
        title: title,
        html: html,
        input: 'text',
        showCancelButton: true,
        animation: "slide-from-top",
        inputPlaceholder: inputPlaceholder
    });
}

function infoUpdate(score = 0, errors = 0, scoreMax = 0) {
    document.getElementById('errorAttempts').textContent = taskInfo.errorAttempts;
    document.getElementById('countAttempts').textContent = taskInfo.countAttempts;
    document.getElementById('scores').textContent = taskInfo.countAttempts - taskInfo.errorAttempts;
    document.getElementById('percent').textContent = taskInfo.calculatePercent() //calculatePercent();

}




function checkTimeStart() {
    taskInfo.timeStart = new Date();
    // var n = timeBegin.toLocaleTimeString();
    //document.getElementById("time_begin").innerHTML=n;
}

function checkTimeFinish() {
    taskInfo.timeFinish = new Date();
    //var n = timeEnd.toLocaleTimeString();
    //document.getElementById("time_end").innerHTML=n;
}



function check(element) {
    if (taskInfo.countAttempts >= taskInfo.maxCountAttempts - 1) {
        alert("Попытки закончились. Обновите страницу, чтобы начать с начала");
        disableAllButtons();
    }
    let id = parseInt(element.id);
    let answer = document.getElementById('answer' + id)
    taskInfo.countAttempts++;
    if (answers[id] == answer.value) {
        answer.style.backgroundColor = 'green'
    }
    else {
        answer.style.backgroundColor = 'red'
        taskInfo.errorAttempts++;
    }
    infoUpdate();


}

function timerStart() {
    si = setInterval(tick, 1000);
}

function tick() {
    document.getElementById('timeDuration').innerHTML = getDurationTime();
}

function getDurationTime() {
    let diffInMilliseconds = new Date() - taskInfo.timeStart;
    // Преобразуем миллисекунды в часы, минуты и секунды
    let hours = String(Math.floor(diffInMilliseconds / (1000 * 60 * 60))).padStart(2, '0');
    let minutes = String(Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    let seconds = String(Math.floor((diffInMilliseconds % (1000 * 60)) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;

}

function randomData() {

    for (let i = 0; i < 10; i++) {
        data[getRandomInt(0, data.length)].Age = getRandomInt(16, 26);
        data[getRandomInt(0, data.length)].Course = getRandomInt(1, 6);
        data[getRandomInt(0, data.length)].Group = getRandomInt(1, 4);
        data[getRandomInt(0, data.length)].City = data[getRandomInt(0, data.length)].City;
        data[getRandomInt(0, data.length)].Department = data[getRandomInt(0, data.length)].Department;
        data[getRandomInt(0, data.length)].Faculity = data[getRandomInt(0, data.length)].Faculity;
        data[getRandomInt(0, data.length)].University = data[getRandomInt(0, data.length)].University;
    }
}

function load() {
    // Добавляем обработчик события на кнопку
    //const createCsvBtn = document.getElementById('createCsvBtn');
    //createCsvBtn.addEventListener('click', createCsvFile)
    //initUpload();
    //randomData();
    disableAllButtons(true);
    document.getElementById('createCsvBtn').disabled = false;
    document.addEventListener('keydown', handlePasswordInput);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// function checkTimeStart() {
//     taskInfo.timeStart = new Date();

//     // var n = timeBegin.toLocaleTimeString();
//     document.getElementById("timeStart").innerHTML = taskInfo.timeStart;
// }


function checkTimeStart() {
    taskInfo.timeStart = new Date();

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const formattedTime = taskInfo.timeStart.toLocaleString('ru-RU', options).replace(',', '');
    document.getElementById("timeStart").innerHTML = formattedTime;
}

function checkTimeFinish() {
    timeFinish = new Date();
    //var n = timeEnd.toLocaleTimeString();
    //document.getElementById("time_end").innerHTML=n;
}

// // Функция для преобразования JSON в CSV
function jsonToCsv(data) {
    const csvRows = [];

    // Получаем заголовки столбцов из первого объекта
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(';'));

    // Строим строки данных
    for (const row of data) {
        const values = headers.map(header => {
            const escaped = `"${row[header].toString().replace(/"/g, '""')}"`;
            return escaped;
        });
        csvRows.push(values.join(';'));
    }

    return csvRows.join('\n');
}

// // Функция для создания файла и помещения его на страницу
function createCsvFile() {
    randomData();
    getAnswers();
    clearAllInputs();
    initTaskInfo();
    disableAllButtons(false);

    console.log(answers);
    document.getElementById('buttonFinish').disabled = false;
    const csvData = jsonToCsv(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    checkTimeStart();
    timerStart();
    infoUpdate();

}

function inputText(title, html, inputPlaceholder) {
    return Swal.fire({
        title: title,
        html: html,
        input: 'text',
        showCancelButton: true,
        animation: "slide-from-top",
        inputPlaceholder: inputPlaceholder
    });
}

function disableAllButtons(disabled = true) {
    // Найти все кнопки на странице
    var buttons = document.querySelectorAll('button');

    // Отключить каждую кнопку
    buttons.forEach(function (button) {
        button.disabled = disabled;
    });
}



function clearAllInputs() {
    // Найти все кнопки на странице
    var buttons = document.querySelectorAll('input');

    // Отключить каждую кнопку
    buttons.forEach(function (input) {
        input.value = '';
        input.style.backgroundColor = 'white';
    });
}


function finish() {
    clearInterval(si);
    checkTimeFinish();
    showResult().then((result) => {
        if (result.isConfirmed) {
            inputText("Сохранение", `Введите свое <strong>фамилию</strong> и <strong>имя</strong>:`, "Иванов Иван").then((name) => {
                if (name.isConfirmed && name.value != "") {
                    name = name.value.trim().replace(/\s+/g, " ").split(' ');
                    lastName = name[0];
                    firstName = name[1];
                    showMessage('Внимание', 'Данные сохраняются.<br>Не закрывайте окно', "warning", false);
                    sendJSONToDB();
                    setTimeout(() => window.location.reload(), 5000);
                }
                else window.location.reload();

            })

        }
        else window.location.reload();
    });



}
function sendJSONToDB() {
    // формируем данные в виде объекта
    let infoResult = {
        lastName: lastName,
        firstName: firstName,
        startTime: timeStart,
        finishTime: timeFinish,
        ball: ball,
        errors: getErrorTotal(),
        scoreMaxTotal: getScoreTotal(),
        percent: percents,
        testName: testName
    };
    // отправляем данные на сервер с помощью fetch
    fetch("https://inform.xn--80ahlrjqm6azc.xn--p1ai/excel_filters/php/db_insert.php",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoResult)
        }).then((response) => {
            //console.log(response)
            if (response.ok) {
                // если всё прошло успешно, выводим сообщение
                //console.log("Submit to DB");
                //console.log(response.text());
                //result.style.color = "green";
                return response.text();
            } else {
                // если возникла ошибка, выводим сообщение об ошибке
                console.log("Error saved to DB!");
                console.log(response.statusText)
                console.log(response);

                //result.style.color = "red";
            }
        }).then(data => {
            console.log(data);
        })

        .catch(error => {
            // если произошла ошибка при отправке, выводим сообщение об ошибке
            console.log("Error send data to DB");
            console.log(error)
            console.log(error.name)
            console.log(error.message)
            //result.innerHTML = "Error to DB";
            //result.style.color = "red";
        });

}

function showResult() {
    return Swal.fire({
        title: "<strong>Результаты</strong>",
        icon: "info",
        html: `
        <div>
            <span>Качество:</span><span>${(taskInfo.percents)}%</span>
        </div>
        <div>
            <span>Оценка:</span><span>${(taskInfo.ball())}</span>
        </div>
        <div>
            <span>Ошибок всего:</span><span style="color: red;">${taskInfo.errorAttempts}</span>
        </div>
        <div>
            <span>Попыток:</span><span>${taskInfo.countAttempts}</span>
        </div>
        <div>
        <span>Продолжительность:</span><span>${(getDurationTime())}</span>
        </div>

        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
           Сохранить
        `,
        cancelButtonText: 'Отлично!'
    });

}


function showMessage(captionHTML = 'info', messageHTML, icon = 'info', showCloseButton = true, confirmButtonText = `Понял`) {
    return Swal.fire({
        title: captionHTML,
        icon: icon,
        html: messageHTML,
        showCloseButton: showCloseButton,
        focusConfirm: false,
        confirmButtonText: confirmButtonText
    });

}

///////////////////
/*
var maxFileSize = 1024 * 1024; // 1 МБ
var uploadButton;
function initUpload() {
    var uploadForm = document.getElementById('upload-form');
    var fileInput = document.getElementById('file-input');
    uploadButton = document.getElementById('upload-button');
    var progressBar = document.getElementById('progress-bar');



    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = new FormData(uploadForm);
        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'https://inform.xn--80ahlrjqm6azc.xn--p1ai/excel_filters/php/upload.php', true);

        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                var percentComplete = (event.loaded / event.total) * 100;
                progressBar.style.width = percentComplete + '%';
            }
        };

        xhr.onload = function () {
            if (xhr.status === 200) {
                alert(xhr.responseText);
                progressBar.style.width = '0%';
            } else {
                alert('Ошибка при загрузке файла');
                progressBar.style.width = '0%';
            }
        };

        xhr.send(formData);
    });
}

function checkFileSize(input) {
    if (input.files && input.files[0]) {
        var file = input.files[0];
        if (file.size > maxFileSize) {
            alert('Размер файла превышает допустимый лимит (1 МБ)');
            input.value = ''; // Очистка поля ввода файла
            uploadButton.disabled = true;
        } else {
            uploadButton.disabled = false;
        }
    }
}
*/


function handlePasswordInput(event) {
    const eventKey = event.key;
    const key = eventKey.toLowerCase();
    // Добавляем новую букву к строке пароля
    if (key.length == 1)
        password += key;
    console.log(password)

    // Ограничиваем длину строки пароля до MAX_LENGTH
    if (password.length > MAX_LENGTH) {
        password = password.slice(1);
    }

    // Если строка пароля совпадает с целевым паролем, вызываем функцию
    if (password === targetPassword) {
        executeFunction();
        password = ''; // Сбрасываем строку пароля после выполнения функции
    }
}

function executeFunction() {
    // Здесь можно разместить любой код, который нужно выполнить при вводе пароля
    console.log('Пароль введен успешно!');
    disableAllButtons(false);
}
