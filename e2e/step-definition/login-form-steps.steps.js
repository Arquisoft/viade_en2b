const {defineFeature,loadFeature}=require('jest-cucumber');
const feature = loadFeature('e2e/features/test.feature');

defineFeature(feature,test=>{

    beforeEach(async () =>{
        await page.goto('/')
    });

    test('The user is not logged in the application',({given,when,then})=>
    {


        given('Given a logout user',()=>{
            page.goto('/login')     

    })


        when('When the user has reach the page',async ()=>{
            await expect(page).toClick('Login',{text : 'Log In'})

    });

        then('User is logged',()=>{
            console.log("User logged");
        })
    })
})