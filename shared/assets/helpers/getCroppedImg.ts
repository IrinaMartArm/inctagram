type getCroppedImgProps = {
  flip?: {
    horizontal: boolean
    vertical: boolean
  }
  imageSrc: any
  pixelCrop: any
  rotation?: number
}
type rotateSizeProps = {
  height: number
  rotation: number
  width: number
}
export const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })
export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}
export function rotateSize({ height, rotation, width }: rotateSizeProps) {
  const rotRad = getRadianAngle(rotation)

  return {
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
  }
}

export async function getCroppedImg({
  flip = { horizontal: false, vertical: false },
  imageSrc,
  pixelCrop,
  rotation = 0,
}: getCroppedImgProps) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  // calculate bounding box of the rotated image
  const { height: bBoxHeight, width: bBoxWidth } = rotateSize({
    height: (image as HTMLImageElement).height,
    rotation,
    width: (image as HTMLImageElement).width,
  })

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  if (image instanceof HTMLImageElement) {
    ctx.translate(-image.width / 2, -image.height / 2)
    ctx.drawImage(image, 0, 0)
  } else {
    console.error('Image is not an instance of HTMLImageElement')

    return null
  }

  const croppedCanvas = document.createElement('canvas')

  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    return null
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob(file => {
      if (file) {
        resolve(URL.createObjectURL(file))
      } else {
        reject(new Error('Failed to create cropped image blob'))
      }
    }, 'image/jpeg')
  })
}
