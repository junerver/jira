module.exports = (req, res, next) => {
    if (req.method == 'POST' && req.path === '/login') {
        if (req.body.username === 'admin' && req.body.password === 'admin') {
            
            return res.status(200).json({
                user: {
                    token: 'admin'
                }
            });
        }
    } else {
        return res.status(400).json({
            error: 'Invalid username or password'
        });
    }
    next();
}