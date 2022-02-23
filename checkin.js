const axios = require("axios");

const SCKEY = process.env.SCKEY;
axios.defaults.headers.common.cookie = process.env.COOKIE;

const checkIn = async () => {
    return axios({
        method: 'post',
        url: 'https://ggme.xyz/user',
        data: {
            token: "glados_network"
        }
    })
}

const status = async () => {
    return axios({
        method: 'get',
        url: 'https://ggme.xyz/user'
    })
}

const server = (checkInMessage, leftDays) => {
    return axios({
        method: 'get',
        url: `https://sctapi.ftqq.com/${SCKEY}.send`,
        params: {
            title: `${leftDays}天后到期，${checkInMessage}`
        }
    })
}

const GLaDOSCheckIn = async () => {
    const checkInMessage = (await checkIn())?.data?.message;
    const leftDays = parseInt((await status())?.data?.data?.leftDays);
    console.log(leftDays, checkInMessage);
    if (SCKEY) {
        server(checkInMessage, leftDays);
    }
}

GLaDOSCheckIn();
