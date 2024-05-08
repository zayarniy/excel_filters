
function check(element) {
    let id = parseInt(element.id);
    let answer = document.getElementById('answer' + id)
    if (answers[id] == answer.value) {
        answer.style.backgroundColor = 'green'
    }
    else {
        answer.style.backgroundColor = 'red'
    }


}


// Функция для преобразования JSON в CSV
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

// Функция для создания файла и помещения его на страницу
function createCsvFile() {
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
    randomData();
    getAnswers();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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