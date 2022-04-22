// import fleekStorage from '@fleekhq/fleek-storage-js'
import { upload, deleteFile, listFiles } from '@fleekhq/fleek-storage-js';
// import { hex_md5 } from '@/utils/md5';

const options = {
	apiKey: `3aeUoeyQffL8v0jNNQv60g==`,
	apiSecret: `F+yU8/8gR35QLdJ4Ek+waC/z1v5xN8Wthx9a6pI2BBM=`,
};
function getNewTimetamps() {
	return Math.floor(new Date().valueOf() / 1000)
}

async function uploadFile(option) {
	const uploadedFile = await upload({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		bucket: getUploadBucket(option.bucket),
		key: option.fileKey,
		ContentType: option.fileType,
		data: option.fileData,
	});
	return uploadedFile;
}
function getBucketUrl(bucket) {
	return `https://storageapi2.fleek.co/${BaseBucket}/${bucket}/`;
}
function getUploadBucket(bucket) {
	return `${BaseBucket}/${bucket}/`;
}
export async function getListFiles(prefix) {
	const files = await listFiles({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		prefix: `${BaseVersion}/${prefix}`,
		getOptions: [ 'key', 'publicUrl'],
	});
	return files;
}

export async function _deleteFile(key, bucket) {
	const res = await deleteFile({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		key,
		bucket,
	});
	return res;
}
const BaseVersion = 'version-11';
const BaseBucket = `0fdd4305-c758-4bda-97be-de16e5307de4-bucket/${BaseVersion}`;


// 用户认证时间
const bucketAllowanceTest = `AllowanceTimeTest`;
const bucketAllowance = `AllowanceTime`;
const BaseBucketAllowance =
	process.env.NODE_ENV == 'development' ? bucketAllowanceTest : bucketAllowance;
export function getAllowanceFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketAllowance);
	return BaseUrl + userAddress + '.json'; // userAddress.toLocaleLowerCase()
}
export async function uploadUserAllowance(userAddress) {
	let option = {
		bucket: BaseBucketAllowance,
		fileKey: userAddress + '.json',
		fileType: 'json',
		fileData: JSON.stringify({
			time: getNewTimetamps()
		}),
	};
	const res = await uploadFile(option);
	console.log(res);
	return res;
}
export async function deleteAllowanceFile(userAddress) {
	const key = `${userAddress}.json`;
	const bucket = `${BaseBucket}/${BaseBucketAllowance}`;
	const res = await _deleteFile(key, bucket);
	console.log("deleteAllowanceFile -->", res);
	return res;
}

// 所有用户首次进入的时间
const bucketAllUsersTest = `AllUsersTest`;
const bucketAllUsers = `AllUsers`;

const BaseBucketAllUsers =
	process.env.NODE_ENV == 'development' ? bucketAllUsersTest : bucketAllUsers;
export function getAllUsersFileUrl(userAddress) {
	console.log('BaseBucketAllUsers', BaseBucketAllUsers);
	const BaseUrl = getBucketUrl(BaseBucketAllUsers);
	return BaseUrl + userAddress + '.json';
}
export async function uploadAllUsers(userAddress) {
	let option = {
		bucket: BaseBucketAllUsers,
		fileKey: userAddress + '.json',
		fileType: 'json',
		fileData: JSON.stringify({
			time: getNewTimetamps()
		}),
	};
	const res = await uploadFile(option);
	console.log('uploadUserAllUsers', res);
	return res;
}


// 用户绑定上级地址
const bucketUserTest = `UserTest`;
const bucketUser = `User`;
const BaseBucketRE =
	process.env.NODE_ENV == 'development' ? bucketUserTest : bucketUser;
export function getFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketRE);
	return BaseUrl + userAddress + '.json';
}
export async function uploadUserBind(userAddress, bindAddress) {
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

// 用户绑定上级的时间
const bucketReUsersTest = `ReUsersTest`;
const bucketReUsers = `ReUsers`;
const BaseBucketReUsers =
	process.env.NODE_ENV == 'development' ? bucketReUsersTest : bucketReUsers;
export function getReUsersFileUrl(userAddress, reAddress) {
	const BaseUrl = getBucketUrl(`${BaseBucketReUsers}/${reAddress}`);
	return BaseUrl + userAddress + '.json';
}
export async function uploadReUsers(userAddress, reAddress) {
	let option = {
		bucket: `${BaseBucketReUsers}/${reAddress}`,
		fileKey: userAddress + '.json',
		fileType: 'json',
		fileData: JSON.stringify({
			time: getNewTimetamps(),
		}),
	};
	const res = await uploadFile(option);
	console.log('uploadReUsers', res);
	return res;
}

// 上级关系
const bucketRelationReTest = "RelationReTest"
const bucketRelationRe = "RelationRe"
const BaseBucketRelationRe =
	process.env.NODE_ENV == 'development' ? bucketRelationReTest : bucketRelationRe;
export function getRelationReFileUrl(userAddress) {
	const BaseUrl = getBucketUrl(BaseBucketRelationRe);
	return `${BaseUrl}${userAddress}.json`;
}
export async function uploadRelationRe(userAddress, baseData) {
	let option = {
		bucket: BaseBucketRelationRe,
		fileKey: `${userAddress}.json`,
		fileType: 'json',
		fileData: JSON.stringify(baseData),
	};
	const res = await uploadFile(option);
	console.log('uploadRelationRe-->', res);
	return res;
}

// 子集关系
const bucketRelationChildTest = "RelationChildTest"
const bucketRelationChild = "RelationChild"
const BaseBucketRelationChild =
	process.env.NODE_ENV == 'development' ? bucketRelationChildTest : bucketRelationChild;
const lvs = ['re1','re2','re3'];
export function getRelationChildFileUrl(userAddress,reAddress,lv) {
	const bucket = `${BaseBucketRelationChild}/${reAddress}/${lv}`;
	const url = getBucketUrl(bucket)
	return `${url}${userAddress}.json`
}

function getFileNameByFileKey(packageName, key) {
	return key.slice(
		`${BaseVersion}/${packageName}/`.length,
		key.length - '.json'.length
	)
}
export async function getRelationChildLvListFileUrl(reAddress,lv) {
	const bucket = `${BaseBucketRelationChild}/${reAddress}/${lv}`;
	const files = await getListFiles(bucket)
	const addressList = files.map(item=>getFileNameByFileKey(bucket,item.key))
	return addressList
}


export async function uploadRelationChild(userAddress,reAddress,lv) {
	if(!lvs.includes(lv)) return false;
	let option = {
		bucket: `${BaseBucketRelationChild}/${reAddress}/${lv}`,
		fileKey: `${userAddress}.json`,
		fileType: 'json',
		fileData: JSON.stringify({
			time: getNewTimetamps(),
		}),
	};
	const res = await uploadFile(option);
	console.log('uploadRelationChild-->', res);
	return res;
}
