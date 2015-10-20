export default function fetchComponentData(dispatch, components, params) {

    const required = components.reduce( (prev, current) => {
        return (current.required || [])
            .concat((current.WrappedComponent ? current.WrappedComponent.required : []) || [])
            .concat(prev);
    }, []);

    const promises = required.map(need => dispatch(need(params)));
    return Promise.all(promises);
}
