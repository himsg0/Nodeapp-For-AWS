const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const smsKey = process.env.SMS_SECRET_KEY;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const messagingServiceSID= process.env.messagingServiceSid;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const jwt = require('jsonwebtoken');
const client = require('twilio')(accountSid, authToken);
const crypto = require('crypto');
let refreshTokens = [];

//sends OTP
exports.sendOTP = (req, res) => {
    try {
        const phone = req.body.phone;
        const otp = Math.floor(100000 + Math.random() * 900000)
        const ttl = 2 * 60 * 1000
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`
        const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')
        const fullhash = `${hash}.${expires}`
        client.messages.create({
            body: `Your OTP for Kube is ${otp}`,
            messagingServiceSid: messagingServiceSID,
            to: phone
        }).then((messages) => console.log(messages)).catch((err) => console.error(err))
        return res.status(200).json({ phone, hash: fullhash, OTP: otp });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//verifies OTP
exports.verifyOTP = (req, res) => {
    try {
        const phone = req.body.phone;
        const hash = req.body.hash;
        const otp = req.body.otp;
        let [hashValue, expires] = hash.split('.')
        let now = Date.now();
        if (now > parseInt(expires)) {
            return res.status(504).send({ msg: `Timeout please try again` })
        }
        const data = `${phone}.${otp}.${expires}`
        const newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')
        if (newCalculatedHash == hashValue) {
            const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, { expiresIn: '30s' })
            const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, { expiresIn: '30s' })
            refreshTokens.push(refreshToken);
            res.status(202)
                .cookie('accessToken', accessToken, {
                    expires: new Date(new Date().getTime() + 30 * 1000),
                    sameSite: 'strict',
                    httpOnly: true
                }).cookie('authSession', true,
                    {
                        expires: new Date(new Date().getTime() + 30 * 1000),
                    })
                .cookie('refreshToken', refreshToken,
                    {
                        expires: new Date(new Date().getTime() + 3557600000),
                        sameSite: 'strict',
                        httpOnly: true
                    })
                .cookie('refreshTokenID', true,
                    {
                        expires: new Date(new Date().getTime() + 3557600000),
                    }).send({ msg: 'Device Verified' })

        } else {
            return res.status(400).send({ verification: false, msg: 'Incorrect OTP' })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


//check authentication
exports.homeFn = (req, res) => {
    res.status(202).send('Private Protected Route - Home');
}

exports.refreshTokens = (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(403).send({ msg: 'refresh token not found, Please login again' })
        if (!refreshTokens.includes(refreshToken)) return res.status(403).send({ msg: 'Refresh Token Blocked, login again' })
        jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phone) => {
            if (!err) {
                const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, { expiresIn: '30s' });
                res.status(202)
                    .cookie('accessToken', accessToken, {
                        expires: new Date(new Date().getTime() + 30 * 1000),
                        sameSite: 'strict',
                        httpOnly: true
                    }).cookie('authSession', true,
                        {
                            expires: new Date(new Date().getTime() + 30 * 1000),
                        }).send({ previousSessionExpiry: true, success: true })
            } else {
                return res.status(403).send({ success: false, msg: 'Invalid Refresh Token' })
            }
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

exports.logout = (req, res) => {
    try {
        res.clearCookie('refreshToken')
            .clearCookie('accessToken')
            .clearCookie('authSession')
            .clearCookie('refreshTokenID')
            .send('logout');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}