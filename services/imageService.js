import aws from "aws-sdk"
import { Config } from "../config/index.js"
import { addImage, getAllImages, removeImage } from "../Dao/imageDao.js"

const spacesEndpoint = new aws.Endpoint(Config.endpoint)

const s3 = new aws.S3({
    endpoint: spacesEndpoint
})

/* aws.config.update({
    region: "us-east-1",
    aws_access_key_id: process.env.aws_access_key_id,
    aws_secret_access_key: process.env.aws_secret_access_key,
    aws_session_token: process.env.aws_session_token
}); */

export const add = async (file, idEstacion) => {

    const name = file.name.split(' ').join('')
    const uploadObject = await s3.putObject({
        ACL: "public-read",
        Bucket: Config.bucketName,
        Body: file.data,
        Key: `Estaciones/${name}`

    }).promise()
    const urlImage = `https://${Config.bucketName}.${Config.cdn}/Estaciones/${name}`

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
        Key: `Estaciones/${name}`,
    }).promise();
    return await removeImage(idImagen)

}