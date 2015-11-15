// Just converts an array to an object indexed by the prop passed, or 'id'
export default function (arr, prop = 'id') {
    const obj = {};

    for (let i = 0; i < arr.length; i += 1) {
        const current = arr[i]
        obj[current[prop]] = current;
    }

    return obj;
}
