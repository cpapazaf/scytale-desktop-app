const puppeteer = require('puppeteer')

jest.setTimeout(30 * 1000)

  describe('Scytale', () => {
    beforeAll(async () => {

    })

    it('should verify that user shows properly when logged in', async (done) => {
      const browser1 = await puppeteer.launch({
        headless: true, 
        devtools: false
      })
      const page1 = await browser1.newPage()

      await page1.goto('http://localhost:3000', {waitUntil: 'networkidle2'})
      await page1.waitFor('input[name=uname]')
      await page1.type('input[name=uname]', 'Bob')

      await page1.waitFor('input[name=chatroom]')
      await page1.type('input[name=chatroom]', 'test1234')

      // await page1.evaluate(() => {debugger})

      await page1.click('button[type="submit"]')

      await page1.waitForSelector('#username')
      const unameEl = await page1.$("#username")
      const username = await page1.evaluate(el => el.innerText, unameEl)
      expect(username).toEqual('Bob')

      await page1.waitForSelector('#chatRoomName')
      const chatRoomNameEl = await page1.$("#chatRoomName")
      const chatRoomName = await page1.evaluate(el => el.innerText, chatRoomNameEl)
      expect(chatRoomName).toEqual('#test1234')

      await page1.close()
      await browser1.close()
      done()
    })

    it('should verify that messages are shown properly when the user types a message', async (done) => {
      const browser1 = await puppeteer.launch({
        headless: true, 
        devtools: false
      })
      const page1 = await browser1.newPage()

      await page1.goto('http://localhost:3000', {waitUntil: 'networkidle2'})
      await page1.waitFor('input[name=uname]')
      await page1.type('input[name=uname]', 'Bob')

      await page1.waitFor('input[name=chatroom]')
      await page1.type('input[name=chatroom]', 'test1234')

      await page1.click('button[type="submit"]')

      await page1.waitForSelector('#messageslist')

      await page1.waitFor('#messageinput')
      await page1.type('#messageinput', 'testMessage')
      await page1.keyboard.press( 'Enter' )
      // await page1.waitFor(3000)

      const element = await page1.$("#messageslist")
      const text = await page1.evaluate(el => el.innerText, element)
      expect(text).toEqual(expect.stringContaining('testMessage'))
      
      await page1.close()
      await browser1.close()
      done()
    })

  })
