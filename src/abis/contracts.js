const addressPro = {//正式
    AbiAddressQK: '0xc29A1Db47876EB243493C1E771f6Ce6e81A60C5D',
    AbiAddressOther : '0xd9c7E0F9Cb0730B774490B86673cfd5F5726A0DF',
    AbiAddressUSDT: '0x55d398326f99059fF775485246999027B3197955',
    addedValue:"115792089237316195423570985008687907853269984665640564039457584007913129639935",
    type: 'pro'
}
const addressTest = {//测试
    AbiAddressQK: '0xe874F5c1893A896AE2D7E2f02a6629DB40380f56',
    AbiAddressOther : '0xd9c7E0F9Cb0730B774490B86673cfd5F5726A0DF',
    AbiAddressUSDT: '0x326D24fb3BbBB7EE2bFB1C7059FAdea99691BED3',
    // addedValue:'115792089237316195423570985008687907853269984665640564039457584007913129639935',
    addedValue:'11579208923731695423570985008687907853269984665640564039457584007913129639936',
    type: 'test'
}
const baseAddress = process.env.NODE_ENV == 'development' ? addressTest : addressPro;
export default baseAddress;
