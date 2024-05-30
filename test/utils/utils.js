const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

function saveData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function loadData() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    return {};
}

module.exports = { saveData, loadData };
