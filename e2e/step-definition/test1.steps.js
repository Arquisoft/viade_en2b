const {defineFeature,loadFeature}=require('jest-cucumber');
const feature = loadFeature('e2e/features/test.feature');

defineFeature(feature,test=>{



    test('Testing cucumber integration. This test just prints',({given,when,then})=>
    {


        given('Given condition',()=>{
            console.log("Executing given condition of the test.")

    })


        when('When condition',()=>{
            console.log("Executing when condition of the test");

    });

        then('Then sentence',()=>{
            console.log("Executing the then sentence");
        })
    })
})