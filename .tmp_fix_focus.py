from pathlib import Path
root = Path(r'E:\school-library-management-system\school-library-management-system\src')
replacements = {
    root / 'pages' / 'Returns.jsx': [
        ('.returns-search:focus-within { border-color: #dfe7ef; box-shadow: none; }', '.returns-search:focus-within { border-color: #60a5fa; box-shadow: 0 0 0 3px rgba(96,165,250,.16); }'),
    ],
    root / 'pages' / 'Borrowing.jsx': [
        ('.borrowing-modal-search:focus, .borrowing-date-grid input:focus { outline: 2px solid rgba(51,78,104,.18); border-color: #b9c8d8; background: #fff; }', '.borrowing-modal-search:focus, .borrowing-date-grid input:focus { outline: none; border-color: #60a5fa; box-shadow: 0 0 0 3px rgba(96,165,250,.16); background: #fff; }'),
    ],
    root / 'pages' / 'BookCatalog.jsx': [
        (
            """        .catalog-field input:focus,\n        .catalog-field select:focus,\n        .modal-form input:focus,\n        .modal-form select:focus,\n        .modal-form textarea:focus {\n          outline: none;\n          box-shadow: none;\n          border-color: #b9c8d8;\n          background: #ffffff;\n        }\n""",
            """        .catalog-field input:focus,\n        .catalog-field select:focus,\n        .modal-form input:focus,\n        .modal-form select:focus,\n        .modal-form textarea:focus {\n          outline: none;\n          border-color: #60a5fa;\n          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.16);\n          background: #ffffff;\n        }\n""",
        ),
    ],
    root / 'theme.css': [
        (
            """.app-theme--dark\n  :is(.book-catalog-page, .students-page, .borrowing-page, .returns-page)\n  :is(input, textarea, select):focus {\n  border-color: #4c98ff;\n  box-shadow: 0 0 0 3px rgba(76, 152, 255, 0.18);\n}\n""",
            """.app-theme--dark\n  :is(.book-catalog-page, .students-page, .borrowing-page, .returns-page)\n  :is(input, textarea, select):focus {\n  outline: none;\n  border-color: #60a5fa;\n  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.16);\n}\n""",
        ),
    ],
}
for file_path, pairs in replacements.items():
    text = file_path.read_text(encoding='utf-8')
    for old, new in pairs:
        if old not in text:
            print(f'Pattern missing in {file_path.name}: {old[:80]}')
        else:
            text = text.replace(old, new)
    file_path.write_text(text, encoding='utf-8')
    print(f'Updated {file_path.name}')
