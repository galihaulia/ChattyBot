const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')

const authenticator = new IamAuthenticator({
  apikey: process.env.WATSON_ASSISTANT_APIKEY,
})

const assistant = new AssistantV2({
  version: '2019-02-28',
  authenticator: authenticator,
  url: process.env.WATSON_ASSISTANT_URL,
})

exports.getSession = async (req, res, next) => {
  try {
    const session = await assistant.createSession({
      assistantId: process.env.WATSON_ASSISTANT_ID,
    })

    return res.json(session['result'])
  } catch (error) {
    return res.send(error)
  }
}

exports.postMssg = async (req, res, next) => {
  payload = {
    assistantId: process.env.WATSON_ASSISTANT_ID,
    sessionId: req.headers.session_id,
    input: {
      message_type: 'text',
      text: req.body.input,
    },
  }

  try {
    const message = await assistant.message(payload)

    return res.json(message['result'])
  } catch (error) {
    return res.send(error)
  }
}
