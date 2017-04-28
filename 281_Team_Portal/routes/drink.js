/*jslint node: true */
'use strict';

var drinks =
    [{
        type: "Starbucks Refreshers™ Beverages",
        drinks:
            [{
                name: "Cool Lime Starbucks Refreshers™ Beverage",
                url: "https://globalassets.starbucks.com/assets/8b80b30632874cc4b103f19a79468f3f.jpg"
            }, {
                name: "Pink Drink",
                url: "https://globalassets.starbucks.com/assets/3056aa7849a0477ea4ed137b66910324.jpg"
            }, {
                name: "Strawberry Acai Starbucks Refreshers™ Beverage",
                url: "https://globalassets.starbucks.com/assets/cff93f212cda4cd09e7dfa5a358caeed.jpg"
            }, {
                name: "Very Berry Hibiscus Starbucks Refreshers™ Beverage",
                url: "https://globalassets.starbucks.com/assets/77ddfb3496584fc1ba3a77701cf232a8.jpg"
            }]
        
    }, {
        type: "Iced Coffee",
        drinks:
            [{
                name: "Iced Coffee",
                url: "https://globalassets.starbucks.com/assets/12be45c393e94b0e934535c905d9d44c.jpg"
                
            }, {
                name: "Iced Coffee with Milk",
                url: "https://globalassets.starbucks.com/assets/e0a6575422764c648e04beb50cdb63ee.jpg"
            }]
         
    }, {
        type: "Iced Tea",
        drinks:
            [{
                name: "Shaken Sweet Tea",
                url: "https://globalassets.starbucks.com/assets/c2830c76f23247249710e97d532e3e65.jpg"
            }, {
                name: "Teavana® Shaken Iced Black Tea",
                url: "https://globalassets.starbucks.com/assets/643f4d49246f4c638406a981766fdd6c.jpg"
            }, {
                name: "Teavana® Shaken Iced Black Tea Lemonade",
                url: "https://globalassets.starbucks.com/assets/d848656e427e4d48b5705cf185c32182.jpg"
            }, {
                name: "Teavana® Shaken Iced Green Tea",
                url: "https://globalassets.starbucks.com/assets/4dff73f88b834fdaaa624cd5fcf1e667.jpg"
            }, {
                name: "Teavana® Shaken Iced Green Tea Lemonade",
                url: "https://globalassets.starbucks.com/assets/27855f3777744263ac6d9b4faa455c3f.jpg"
            }, {
                name: "Teavana® Shaken Iced Passion Tango™ Tea",
                url: "https://globalassets.starbucks.com/assets/e66eed85a5cd432b9d55aa33ce7f8406.jpg"
            }, {
                name: "Teavana® Shaken Iced Passion Tango™ Tea Lemonade",
                url: "https://globalassets.starbucks.com/assets/df79b07719f446d29693ae926e3931ad.jpg"
            }, {
                name: "Teavana® Shaken Iced Peach Green Tea",
                url: "https://globalassets.starbucks.com/assets/0aa9b728d0364d2bba0ace00bfb69912.jpg"
            }]
         
    }];

exports.getDrink = function (req, res) {
    res.send({drinks: drinks});
    
};