import aws from "aws-sdk"
import { Config } from "../config/index.js"
import { addImage, getAllImages, removeImage } from "../Dao/imageDao.js"

const spacesEndpoint = new aws.Endpoint(Config.endpoint)

aws.config.update({
    region: "us-east-1",
    aws_access_key_id: "DO00777QTTJEPLXADY3U",
    aws_secret_access_key: "uUoeKQoy0vy0SzDZdnbA/R2bWGnsLqEr75uAweQ+XrQ",

});
const s3 = new aws.S3({
    endpoint: spacesEndpoint
})


export const add = async (file, idEstacion) => {
    console.log("pruebas para agregar imagen");
    console.log(Config.bucketName);
    const name = file.name.split(' ').join('')
    const uploadObject = await s3.putObject({
        ACL: "public-read",
        Bucket: Config.bucketName,
        Body: file.data,
        Key: name

    }).promise()
    console.log("pruebas para agregar imagen x2");

    const urlImage = `https://${Config.bucketName}.${Config.endpoint}/${name}`

    const image = {
        ID_Estacion: idEstacion,
        etag: uploadObject.ETag,
        name,
        url: urlImage,
    }


    return await addImage(image)
}

export const getAll = async (idEstacion) => {

    return await getAllImages(idEstacion)

}

export const remove = async (idImagen, name) => {
    await s3.deleteObject({
        Bucket: Config.bucketName,
        Key: name,
    }).promise();
    return await removeImage(idImagen)

}