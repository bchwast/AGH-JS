const compute = (op, x, y) => {
    let result;
    switch(op) {
        case '+':
            result = x + y;
            break;
        case '-':
            result = x - y;
            break;
        case '*':
            result = x * y;
            break;
        case '/':
            result = x / y;
            break;
        default:
            result = NaN;
            break;
    }
    return result;
}

const getHtmlResponse = (json) => {
    let response = '<table>';
    response = response.concat(`
    <tr>
        <th>x</th>
        <th>Operation</th>
        <th>y</th>
        <th>Result</th>
    </tr>
    `);

    for (const obj of json) {
        const {x, y, operation} = obj;
        const result = compute(operation, x, y);
        response = response.concat(`
        <tr>
            <td>${x}</td>
            <td>${operation}</td>
            <td>${y}</td>
            <td>${result}</td>
        </tr>
        `);
    }

    response = response.concat('</table>');
    return response;
}

const computed = (json) => {
    for (const obj of json) {
        const {x, y, operation} = obj;
        obj.result = compute(operation, x, y);
    }
    return json;
}

module.exports = {getHtmlResponse, compute, computed};
