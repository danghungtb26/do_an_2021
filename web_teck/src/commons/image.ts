import Compress from 'compress.js'

const compress = new Compress()

export const resizeImage = async (file) => {
  const resizedImage = await compress.compress([file], {
    size: 1, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
    maxWidth: 1000,
    maxHeight: 1000,
    resize: true, // defaults to true, set false if you do not want to resize the image width and height
  })
  const img = resizedImage[0]
  const base64str = img.data
  const imgExt = img.ext
  const resizedFile = Compress.convertBase64ToFile(base64str, imgExt)

  if ((file && file.type !== 'image/png' && file.type !== 'image/jpeg') || file.size > 10000000) {
    const textErrorImage = 'validateImage'

    return { errorImage: textErrorImage }
  }

  // eslint-disable-next-line no-undef
  const fileBlob = new File([resizedFile], file.name, { type: resizedFile.type })

  return { errorImage: null, imageUpload: fileBlob, image: URL.createObjectURL(fileBlob) }
}

export const convertImage = () => {}
