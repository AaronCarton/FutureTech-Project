export default () => {
  let recievedMessage = ''

  const writeNFC = async (message: string) => {
    console.log('User clicked write button')

    try {
      const ndef = new NDEFReader()
      await ndef.write(message)
      console.log('> Message written')
    } catch (error) {
      console.log('Argh! ' + error)
    }
  }

  const scanNFC = async (cb: (response: string) => void) => {
    console.log('User clicked scan button')

    try {
      const ndef = new NDEFReader()
      await ndef.scan()
      console.log('> Scan started')

      ndef.addEventListener('readingerror', () => {
        console.log('Argh! Cannot read data from the NFC tag. Try another one?')
      })

      ndef.addEventListener('reading', ({ message, serialNumber }) => {
        console.log(`> Serial Number: ${serialNumber}`)
        const decoder = new TextDecoder(message.records[0].encoding)
        let text = decoder.decode(message.records[0].data)
        console.log('> Records:', text)
        recievedMessage = text
        cb(text)
      })
    } catch (error) {
      console.log('Argh! ' + error)
    }
  }

  return {
    recievedMessage,
    writeNFC,
    scanNFC,
  }
}
