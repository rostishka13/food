<?php
$_POST = json_decode(file_get_contents("php//input"), true);
echo var_dump($_POST);



// та команда бере дані які нам прийшли з клієнта, перетворює їх в рядок response від сервера