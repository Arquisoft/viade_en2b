const {defineFeature,loadFeature}=require('jest-cucumber');
const feature = loadFeature('./feature/login.feature');

defineFeature(feature,test=>{

    beforeEach(async()=>{
        await page.goto('http://localhost:3000');
    })

    test('Logged in user access their routes list',({given,when,then})=>
    {
        let webId;

        given('The user with webid',()=>{
            webId='https://violetaruizm.inrupt.net/profile/card#me';
        })


        when('I go to the login and fill the form',()=>{

    });
    })
})