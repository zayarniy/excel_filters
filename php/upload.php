<?php
if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];

    // Проверка ограничения на размер файла (1 МБ)
    $maxFileSize = 1024 * 1024; // 1 МБ
    if ($fileSize > $maxFileSize) {
        echo "Размер файла превышает допустимый лимит (1 МБ)";
        exit;
    }

    // Проверка формата файла (XLS или XLSX)
    $allowedExtensions = array('xls', 'xlsx');
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    if (!in_array($fileExtension, $allowedExtensions)) {
        echo "Недопустимый формат файла. Разрешены только XLS и XLSX";
        exit;
    }

    // Перемещение загруженного файла в заданную директорию
    $uploadDir = 'uploads/';
    $uploadFile = $uploadDir . basename($fileName);
    if (move_uploaded_file($fileTmpName, $uploadFile)) {
        echo "Файл успешно загружен";
    } else {
        echo "Ошибка при загрузке файла";
    }
}
?>