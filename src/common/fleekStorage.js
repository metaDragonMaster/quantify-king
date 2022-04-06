// import fleekStorage from '@fleekhq/fleek-storage-js'
import { upload } from '@fleekhq/fleek-storage-js';
// import { hex_md5 } from '@/utils/md5';

const options = {
	apiKey: `+uwU5iLeP1tp0Xe+qiIY9g==`,
	apiSecret: `UARFO6RVgMDHOsHuKm2uJWQ7SLkCmKXhROkhIuKWHa4=`,
};

/*
	userAddress.json
	https://storageapi2.fleek.co/0fdd4305-c758-4bda-97be-de16e5307de4-bucket/test/
*/
const bucketTest = '0fdd4305-c758-4bda-97be-de16e5307de4-bucket/test';
const bucketUser = '0fdd4305-c758-4bda-97be-de16e5307de4-bucket/user';
const BaseBucket =
	process.env.NODE_ENV == 'development' ? bucketTest : bucketUser;
const BaseUrl = `https://storageapi2.fleek.co/${BaseBucket}/`;

export function getFileUrl(userAddress) {
	return BaseUrl + userAddress + '.json';
}

async function uploadFile(option) {
	const uploadedFile = await upload({
		apiKey: options.apiKey,
		apiSecret: options.apiSecret,
		bucket: BaseBucket,
		key: option.fileKey,
		ContentType: option.fileType,
		data: option.fileData,
	});
	return uploadedFile;
}

export async function uploadUserBind(userAddress, bindAddress) {
	let option = {
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
