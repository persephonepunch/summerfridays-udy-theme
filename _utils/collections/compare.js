const get = require('lodash.get');

const operators = {
    "exists": (itemValue, value) => {
        if (value === "yes") {
            return !!itemValue;
        } else {
            return !(!!itemValue);
        }
    },
    "eq": (itemValue, value) => itemValue == value,
    "ne": (itemValue, value) => itemValue != value,
    "gt": (itemValue, value) => {
        if (value.startsWith("date:")) {
            const oldDate = new Date(itemValue).getTime();
            const newDate = new Date().getTime() + (Number(value.split(":")[1]))
            return oldDate > newDate
        } else {
            return itemValue > value;
        }
    },
    "lt": (itemValue, value) => {
        if (value.startsWith("date:")) {
            const oldDate = new Date(itemValue).getTime();
            const newDate = new Date().getTime() + (Number(value.split(":")[1]))
            return oldDate < newDate
        } else {
            return itemValue < value;
        }
    },
    "gte": (itemValue, value) => {
        if (value.startsWith("date:")) {
            const oldDate = new Date(itemValue).getTime();
            const newDate = new Date().getTime() + (Number(value.split(":")[1]))
            return oldDate >= newDate
        } else {
            return itemValue >= value;
        }
    },
    "lte": (itemValue, value) => {
        if (value.startsWith("date:")) {
            const oldDate = new Date(itemValue).getTime();
            const newDate = new Date().getTime() + (Number(value.split(":")[1]))
            return oldDate <= newDate
        } else {
            return itemValue <= value;
        }
    },
    "in": (itemValue, value) => {
        return itemValue.includes(value);
    },
    "nin": (itemValue, value) => {
        return !itemValue.includes(value);
    },
    "idin": (itemValue, value) => {
        return itemValue.includes(value);
    },
    "idnin": (itemValue, value) => {
        return !itemValue.includes(value);
    }
}

module.exports = function compareItemByFilter(item, filter) {
    let [fieldPath, operator, value] = filter;
    const itemValue = get(item.data, fieldPath, "");

    if (fieldPath == "slug" && value.startsWith("cms/")) {
        value = value.split('/')
        value = value[value.length-1].replace('.md', '');
    }


    if (value === "true") {
        value = true;
    }

    if (value === "false") {
        value = false;
    }

    if (operators[operator]) {
        try {
            return operators[operator](itemValue, value);
        } catch (e) {
            return true;
        }
    }
    return true;
}