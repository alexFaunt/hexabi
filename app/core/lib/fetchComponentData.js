export default function fetchComponentData(dispatch, components, params) {
    const required = components.reduce( function (prev, current) {
        const newRequired = [];
        newRequired.concat(prev);

        const currentRequired = current.required || [];

        let wrappedRequired = [];
        if (current.WrappedComponent) {
            wrappedRequired = current.WrappedComponent.required || [];
        }

        //  I modified the original to only return unique things - it might fuck it up but i hope not.
        for (let i = 0; i < currentRequired.length; i += 1) {
            if (newRequired.indexOf(currentRequired[i]) === -1) {
                newRequired.push(currentRequired[i]);
            }
        }
        for (let j = 0; j < wrappedRequired.length; j += 1) {
            if (newRequired.indexOf(wrappedRequired[j]) === -1) {
                newRequired.push(wrappedRequired[j]);
            }
        }
        return newRequired;
    }, []);

    const promises = required.map(need => dispatch(need(params)));
    return Promise.all(promises);
}
