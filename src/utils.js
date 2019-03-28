export const setBabyFrogGender = () => {
    let num = Math.floor(Math.random(0, 1) * 2);
    return num ? 'male' : 'female';
};

export const setBabyFrogId = (frogs) => {
    return frogs.length + 1;
};