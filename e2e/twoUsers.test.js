const puppeteer = require('puppeteer')

jest.setTimeout(30 * 1000)

  describe('Scytale', () => {
    beforeAll(async () => {

    })

    it('should verify that two users send messages to each other', async (done) => {
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


      const browser2 = await puppeteer.launch({
        headless: true, 
        devtools: false
      })
      const page2 = await browser2.newPage()

      await page2.goto('http://localhost:3000', {waitUntil: 'networkidle2'})
      await page2.waitFor('input[name=uname]')
      await page2.type('input[name=uname]', 'Alice')

      await page2.waitFor('input[name=chatroom]')
      await page2.type('input[name=chatroom]', 'test1234')

      // await page1.evaluate(() => {debugger})

      await page2.click('button[type="submit"]')

      await page2.waitForSelector('#username')
      const unameEl2 = await page2.$("#username")
      const username2 = await page2.evaluate(el => el.innerText, unameEl2)
      expect(username2).toEqual('Alice')

      await page2.waitForSelector('#chatRoomName')
      const chatRoomNameEl2 = await page2.$("#chatRoomName")
      const chatRoomName2 = await page2.evaluate(el => el.innerText, chatRoomNameEl2)
      expect(chatRoomName2).toEqual('#test1234')

      // Check that Alice is in Bob's member list
      await page1.waitFor('#chatMembers')
      const bobChatMembersList = await page1.$("#chatMembers")
      const bobChatMembersListText = await page1.evaluate(el => el.innerText, bobChatMembersList)
      expect(bobChatMembersListText).toEqual(expect.stringContaining('Alice'))

      // Bob sends a message to Alice
      await page1.waitFor('#messageinput')
      await page1.type('#messageinput', 'Hi Alice')
      await page1.keyboard.press( 'Enter' )
      
      const aliceMessageList = await page2.$("#messageslist")
      const aliceMessageListText = await page2.evaluate(el => el.innerText, aliceMessageList)
      expect(aliceMessageListText).toEqual(expect.stringContaining('Hi Alice'))
      
      // Check that Bob is in Alice's member list
      await page2.waitFor('#chatMembers')
      const aliceChatMembersList = await page2.$("#chatMembers")
      const aliceChatMembersListText = await page2.evaluate(el => el.innerText, aliceChatMembersList)
      expect(aliceChatMembersListText).toEqual(expect.stringContaining('Bob'))

      // Alice sends a message to Bob
      await page2.waitFor('#messageinput')
      await page2.type('#messageinput', 'Hi Bob')
      await page2.keyboard.press( 'Enter' )
      
      const bobMessageList = await page1.$("#messageslist")
      const bobMessageListText = await page1.evaluate(el => el.innerText, bobMessageList)
      expect(bobMessageListText).toEqual(expect.stringContaining('Hi Bob'))

      await page1.close()
      await browser1.close()

      await page2.close()
      await browser2.close()
      done()
    })
  })
