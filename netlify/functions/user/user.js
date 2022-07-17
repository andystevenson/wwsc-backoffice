// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event, context) => {
  try {
    const { clientContext } = context
    console.log({ clientContext }, clientContext.user)

    const user = clientContext?.user?.email
    return {
      statusCode: 200,
      body: JSON.stringify({ user }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
