export default () => {
  const ndef = new NDEFReader()

  const writeNFC = async (message: string) => {
    ndef
      .write('Hello World')
      .then(() => {
        console.log('Message written.')
      })
      .catch((error) => {
        console.log(`Write failed :-( try again: ${error}.`)
      })
  }

  return {
    writeNFC,
  }
}
