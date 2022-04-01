const addressPro = {//正式
    AbiAddressQK: '0x86Bc32E5460f7bC6744468247895a593076B4c06',
    AbiAddressUSDT: '0x55d398326f99059fF775485246999027B3197955',
    addedValue:"115792089237316195423570985008687907853269984665640564039457584007913129639935",
    type: 'pro'
}
const addressTest = {//测试
    AbiAddressQK: '0x83e66C6F4CED837197436D9A233F7B9bE002C8d9',
    AbiAddressUSDT: '0x326D24fb3BbBB7EE2bFB1C7059FAdea99691BED3',
    // addedValue:'115792089237316195423570985008687907853269984665640564039457584007913129639935',
    addedValue:'11579208923731695423570985008687907853269984665640564039457584007913129639936',
    type: 'test'
}
const baseAddress = process.env.NODE_ENV == 'development' ? addressTest : addressPro;
export default baseAddress;
