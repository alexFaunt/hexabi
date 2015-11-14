export default function fetchComponentData(dispatch, components, params) {
    const required = [];

// TODO make this recursive
    for (let i = 0; i < components.length; i += 1) {
        const current = components[i];

        let currentRequired = [];
        if (current) {
            currentRequired = current.required || [];
        }
        else {
            continue;
        }

        let wrappedRequired = [];
        if (current.WrappedComponent) {
            wrappedRequired = current.WrappedComponent.required || [];
        }

        //  I modified the original to only return unique things - it might fuck it up but i hope not.
        for (let k = 0; k < currentRequired.length; k += 1) {
            if (required.indexOf(currentRequired[k]) === -1) {
                required.push(currentRequired[k]);
            }
        }

        for (let j = 0; j < wrappedRequired.length; j += 1) {
            if (required.indexOf(wrappedRequired[j]) === -1) {
                required.push(wrappedRequired[j]);
            }
        }
    }
    
    const promises = required.map(need => dispatch(need(params)));
    return Promise.all(promises);
}
