function addRequired (required, component) {
    if (!component) {
        return required;
    }

    if (component.WrappedComponent) {
        return addRequired(required, component.WrappedComponent);
    }

    if (!component.required) {
        return required;
    }

    // only return unique things.
    for (let i = 0; i < component.required.length; i += 1) {
        if (required.indexOf(component.required[i]) === -1) {
            required.push(component.required[i]);
        }
    }

    return required;
}

export default function fetchComponentData(dispatch, components, params) {
    let required = [];

    for (let i = 0; i < components.length; i += 1) {
        addRequired(required, components[i]);
    }

    const promises = required.map(need => dispatch(need(params)));
    return Promise.all(promises);
}
