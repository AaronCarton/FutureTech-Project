export default () => {
  const writeNFC = async (message: string) => {
    console.log('User clicked write button')

    try {
      const ndef = new NDEFReader()
      await ndef.write('Hello world!')
      console.log('> Message written')
    } catch (error) {
      console.log('Argh! ' + error)
    }
  }

  const scanNFC = async () => {
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
        console.log(`> Records: (${message.records.length})`)
        return { message, serialNumber }
      })
    } catch (error) {
      console.log('Argh! ' + error)
    }
  }

  return {
    writeNFC,
    scanNFC,
  }
}
