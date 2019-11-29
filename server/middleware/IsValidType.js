export default (req, res, next) => {
    const { type } = req.params;
    const condition = type === 'red-flags' || type === 'interventions';
    if (!condition) {
        return res.status(404).json({
            status: 404,
            error: `${type} type is unknown, use only red-flags or interventions as type`
        });
    }
    return next();
};