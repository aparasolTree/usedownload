let count = 0;
export const genRandomName = () => {
    count += 1;
    return `${Math.random().toString(36).split('.')[1]}-${count}`;
};
