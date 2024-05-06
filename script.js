
function check(element) {
    let id = parseInt(element.id);
    console.log(parseInt(id))
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

function load() {
    // Добавляем обработчик события на кнопку
    const createCsvBtn = document.getElementById('createCsvBtn');
    createCsvBtn.addEventListener('click', createCsvFile)
    getAnswers();
}