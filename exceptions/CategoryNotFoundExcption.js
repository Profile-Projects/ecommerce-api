class CategoryNotFoundException extends Error {

    constructor(category_sid) {
        super(`Category not found for ${category_sid}`);
        this.category_sid = category_sid;
    }
};

module.exports = CategoryNotFoundException;