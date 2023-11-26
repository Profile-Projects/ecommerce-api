
const validateCategoryPath = ({ path }) => {
    const regex = /^(?:\.[a-z]+)*$/;
    return regex.test(path);
}

module.exports = {
    validateCategoryPath
}