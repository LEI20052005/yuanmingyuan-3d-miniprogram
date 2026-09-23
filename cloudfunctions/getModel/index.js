const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  const modelUrl = event.modelUrl

  try {
    const res = await cloud.httpRequest({
      url: modelUrl,
      method: 'GET',
      dataType: 'arraybuffer'
    })

    return {
      code: 200,
      data: res.data.toString('base64'),
      mimeType: 'model/gltf-binary'
    }
  } catch (error) {
    console.error("模型加载失败：", error)
    return { code: 500, data: "" }
  }
}