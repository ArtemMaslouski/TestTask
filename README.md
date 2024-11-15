# TestTask

Для запуска сервера использовать команду:

    npm run dev

Для переустановки зависимостей:

    npm install

    Примечание: Если возникла необходимость переустановить зависимость,то проследить что бы @prisma/client и prisma находились в dependencies(!!!Не в devDependencies!!! Сборщик Heroku не видит devDependencies)

Для запуска тестов:

    npm test

Для запуска swagger:

    1 способ
    1.Запустить сервер (npm run dev)
    2. В браузере перейти по адресу http://localhost:3000/api-docs

    2 способ
    1. Перейти по адресу: https://run-app-d26d687b0735.herokuapp.com/api-docs/
