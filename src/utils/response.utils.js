function successResponse(res, message = 'Success', data = null) {
    return res.status(200).json({
        status: 200,
        message,
        data
    });
}

function createdResponse(res, message = 'Data berhasil ditambahkan', data = null) {
    return res.status(201).json({
        status: 201,
        message,
        data
    });
}

function unauthorizedResponse(res, message = 'Token tidak sah') {
    return res.status(401).json({
        status: 401,
        message,
        data: null
    });
}

function forbiddenResponse(res, message = 'Akses terlarang') {
    return res.status(403).json({
        status: 403,
        message,
        data: null
    });
}

function notFoundResponse(res, message = 'Data tidak ditemukan') {
    return res.status(404).json({
        status: 404,
        message,
        data: null
    });
}

function errorResponse(res, message = 'Terjadi kesalahan server') {
    return res.status(500).json({
        status: 500,
        message,
        data: null
    });
}

module.exports = {
    successResponse,
    createdResponse,
    unauthorizedResponse,
    notFoundResponse,
    errorResponse,
    forbiddenResponse
};
