export const setBabyFrogGender = () => {
    let num = setRandomNumber(2);
    return num ? 'male' : 'female';
};

export const setBabyFrogId = frogs => {
    return frogs.length + 1;
};

export const setBabyField = fieldsArray => {
    return Math.floor(Math.random(0, 1) * (fieldsArray.length - 1));
};

export const setRandomNumber = limit => {
    return Math.floor(Math.random() * limit);
};

export const setBabyFrogCharacteristics = (height, weight) => {
    return [height[setRandomNumber(2)], weight[setRandomNumber(2)]];
};
