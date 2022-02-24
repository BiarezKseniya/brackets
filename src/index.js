module.exports = function check(str, bracketsConfig) {
    const stack = [];

    for (const symbol of str) {
        if (stack.length > 0) {
            const last = stack[stack.length - 1];
            if (getCloseTag(last, bracketsConfig) === symbol) {
                stack.pop();
            } else if (isTagOpening(symbol, bracketsConfig)) {
                stack.push(symbol);
            } else {
                return false;
            }
        } else if (isTagOpening(symbol, bracketsConfig)) {
            stack.push(symbol);
        } else {
            return false;
        }
    }

    return stack.length === 0;
}

function getCloseTag(openTag, bracketsConfig) {
    const pair = bracketsConfig.find((pair) => {
        return pair[0] === openTag;
    });
    return pair ? pair[1] : null;
}

function isTagOpening(tag, bracketsConfig) {
    const pair = bracketsConfig.find((pair) => {
        return pair[0] === tag;
    });
    return !!pair;
}

