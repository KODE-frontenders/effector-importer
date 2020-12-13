# Effector importer

Создан для автоматического импорта файлов моделей effector js.

## Принцип работы

1. Отслеживает создание и удаление файлов в директории отслеживания.
2. Формирует список импортов и обновляет их в файле назнычения, вставляя их между комментариями маркерами.

## Конфигурация

### Конфигурацию можно задавайть

- в package.json

```json
"effector-importer": {
    "source_path": "./features",
    "file_filter": "^init.ts",
    "target_path": "./index.ts",
    "target_mark_comment": "// init effector graph. Do not change it manual!!!"
  }
```

- в файле effector-importer.config.json (в корне проекта)

- в файлах

`./configs/effector-importer.config.json`

`./config/effector-importer.config.json`

### Параметры

| Имя параметра             | Описание                                        | Опционально | Значение по умолчанию | Пример                                                      |
| ------------------------- | ----------------------------------------------- | ----------- | --------------------- | ----------------------------------------------------------- | --- |
| source_path               | путь до отслеживаемых файлов                    | -           | -                     | ./src                                                       |
| target_path               | путь до файла в который будут добавлены импорты |             |                       |                                                             |
| begin_target_mark_comment | открываюший комментарий-маркер                  |             |                       | `// effector graph init place. Do not change it manual !!!` |
| end_target_mark_comment   | закрывающий комментарий-маркер                  |             |                       | `// end of effector graph`                                  |
| file_filter               | регулярное выражение для фильтрации файлов      | +           | `^init.ts`            | -                                                           |
| depth                     | глубина сканирования дирректорий                | +           | 30                    | -                                                           |
| quotes_style              | тип кавычек для импортов: `double               | single`     | +                     | `double`                                                    | -   |

### Пример конфигурации

```json
{
  "source_path": "./src",
  "target_path": "./src/index.tsx",
  "begin_target_mark_comment": "//  effector graph init  place. Do not change it manual !!!",
  "end_target_mark_comment": "// end of effector graph",
  "file_filter": "^init.ts",
  "quotes_style": "single",
  "depth": 10
}
```

## Использование

Добавьте пакет в проект
`npm install effector-importer`

Добавьте в `package.json` скрипт
`"effector-importer": "effector-importer"`

Добавьте скрипт к скрипту start
`"start": "effector-importer & react-scripts start"`

### Проблеммы

Не отслеживаются удаление дирректории содержащую импортируемый файл

````bash
 $ rm -rf ./src/some-directory/init.ts ```

````
