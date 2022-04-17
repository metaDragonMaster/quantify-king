// import fleekStorage from '@fleekhq/fleek-storage-js'
import { upload } from '@fleekhq/fleek-storage-js';
// import { hex_md5 } from '@/utils/md5';

const options = {
	apiKey: `3aeUoeyQffL8v0jNNQv60g==`,
	apiSecret: `F+yU8/8gR35QLdJ4Ek+waC/z1v5xN8Wthx9a6pI2BBM=`,
};

async function uploadFile(option) {
	const uploadedFile = await upload({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		bucket: option.bucket,
		key: option.fileKey,
		ContentType: option.fileType,
		data: option.fileData,
	});
	return uploadedFile;
}
function getBucketUrl(bucket) {
	return `https://storageapi2.fleek.co/${bucket}/`;
}
async function getListFiles(prefix) {
	const files = await listFiles({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		prefix: prefix,
		getOptions: ['key'],
	});
	return files;
}

const BaseBucket = '0fdd4305-c758-4bda-97be-de16e5307de4-bucket'

const bucketUserTest = `${BaseBucket}/UserTest`;
const bucketUser = `${BaseBucket}/User`;
const BaseBucketRE =
	process.env.NODE_ENV == 'development' ? bucketUserTest : bucketUser;
export function getFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketRE)
	return BaseUrl + userAddress + '.json';
}
export async function uploadUserBind(userAddress,bindAddress) {
	let option = {
		bucket: BaseBucketRE,
		fileKey: userAddress + '.json',
		fileType: 'json',
		fileData: JSON.stringify({
			re: bindAddress,
		}),
	};
	const res = await uploadFile(option);
	console.log(res);
	return res;
}

const bucketAllowanceTest = `${BaseBucket}/AllowanceTimeTest`;
const bucketAllowance = `${BaseBucket}/AllowanceTime`;
const BaseBucketAllowance = process.env.NODE_ENV == 'development' ? bucketAllowanceTest : bucketAllowance;
export function getAllowanceFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketAllowance)
	return BaseUrl + userAddress + '.json';// userAddress.toLocaleLowerCase()
}
export async function uploadUserAllowance(userAddress) {
	let option = {
		bucket: BaseBucketAllowance,
		fileKey: userAddress + '.json',
		fileType: 'json',
		fileData: JSON.stringify({
			time: Math.floor(new Date().valueOf() / 1000),
		}),
	};
	const res = await uploadFile(option);
	console.log(res);
	return res;
}

const bucketAllUsersTest = `${BaseBucket}/AllUsersTest`;
const bucketAllUsers = `${BaseBucket}/AllUsers`;

const BaseBucketAllUsers = process.env.NODE_ENV == 'development' ? bucketAllUsersTest : bucketAllUsers;
export function getAllUsersFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketAllUsers)
	return BaseUrl + userAddress + '.json';
}
export async function uploadAllUsers(userAddress) {
	let option = {
		bucket: BaseBucketAllUsers,
		fileKey: userAddress + '.json',
		fileType: 'json',
		fileData: JSON.stringify({
			time: Math.floor(new Date().valueOf() / 1000),
		}),
	};
	const res = await uploadFile(option);
	console.log("uploadUserAllUsers",res);
	return res;
}


const bucketReUsersTest = `${BaseBucket}/ReUsersTest`;
const bucketReUsers = `${BaseBucket}/ReUsers`;
const BaseBucketReUsers =  process.env.NODE_ENV == 'development' ? bucketReUsersTest : bucketReUsers;
export function getReUsersFileUrl(userAddress,reAddress) {
	const BaseUrl = getBucketUrl(`${BaseBucketReUsers}/${reAddress}`)
	return BaseUrl + userAddress + '.json';
}

export async function uploadReUsers(userAddress,reAddress) {
	let option = {
		bucket: `${BaseBucketReUsers}/${reAddress}`,
		fileKey: userAddress + '.json',
		fileType: 'json',
		fileData: JSON.stringify({
			time: Math.floor(new Date().valueOf() / 1000),
		}),
	};
	const res = await uploadFile(option);
	console.log("uploadReUsers",res);
	return res;
}
