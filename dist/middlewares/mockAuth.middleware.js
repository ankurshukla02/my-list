"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAuth = mockAuth;
function mockAuth(req, res, next) {
    const userId = req.header('x-user-id');
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // attach to request
    req.user = { id: userId };
    next();
}
