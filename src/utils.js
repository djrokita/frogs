
export const setReproduceFields = (row, col) => {
    let rowMaxReproduce = row + 1 < 6 ? row + 1 : 6;
    let rowMinReproduce = row - 1 < 1 ? 1 : row - 1;
    let colMaxReproduce = col + 1 < 10 ? col + 1 : 10;
    let colMinReproduce = col - 1 < 1 ? 1 : col - 1;
    let reproduceFields = [];
    for (let i = rowMinReproduce; i <= rowMaxReproduce; i++) {
        let obj = {row: i};
        for (let j = colMinReproduce; j <= colMaxReproduce; j++) {
        obj = {...obj, col: j }
        reproduceFields = [...reproduceFields, obj];
        }
    }
    return reproduceFields.filter(field => {
        return field.row !== row || field.col !== col;
    });
}

export const checkParentsGender = (frog1, frog2) => {
    return frog1.sex !== frog2.sex ? true : false;
}

export const checkReproduceRange = (frog1, frog2) => {
    let frogInRange = [];
    if (frog1.reproduceFields.length) {
      frogInRange = frog1.reproduceFields.filter(field => {
        return field.row === frog2.row && field.col === frog2.col;
      });
    }
    else {
      frogInRange = frog2.reproduceFields.filter(field => {
        return field.row === frog1.row && field.col === frog1.col;
      });
    }
    return frogInRange.length;
}

export const setFrogeMoveRange = (range, row, col) => {
    let rowMaxMove = row + range < 6 ? row + range : 6;
    let rowMinMove = row - range < 1 ? 1 : row - range;
    let colMaxMove = col + range < 10 ? col + range : 10;
    let colMinMove = col - range < 1 ? 1 : col - range;
    let rowMoveRange = [];
    let colMoveRange = [];
    for (let i = rowMinMove; i <= rowMaxMove; i++) {
    rowMoveRange = [...rowMoveRange, i];
    }
    for (let i = colMinMove; i <= colMaxMove; i++) {
    colMoveRange = [...colMoveRange, i]
    }
    return { rowMoveRange, colMoveRange };
};

export const setBabyFrogGender = () => {
    let num = setRandomNumber(2);
    return num ? 'male' : 'female';
};

export const setBabyFrogId = frogs => {
    return frogs.length + 1;
};

export const setBabyFrogField = fieldsArray => {
    return Math.floor(Math.random(0, 1) * (fieldsArray.length - 1));
};

export const setRandomNumber = limit => {
    return Math.floor(Math.random() * limit);
};

export const setBabyFrogCharacteristics = (height, weight) => {
    return [height[setRandomNumber(2)], weight[setRandomNumber(2)]];
};
