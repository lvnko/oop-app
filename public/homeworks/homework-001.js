/**
 * 媽媽請小強去買東西：「
 *      請買 2 個蘋果回來，如果難蛋特價的話，就買1打。
 * 」
 * 
 * 背景：
 *     雞蛋一個 5元，特價3元•！
 *     蘋果一個 68 元•
 * 
 * 題目：
 *     請將「請買2個蘋果，如果雞蛋特價的話，就買 1 打•」這段語句，以O0P實現。
 * 
 * 提示：
 *     你應該會需要「小明」的物件，並且具有「購買東西」的方法•
 *     你應該會需要「雞蛋」、「蘋果」的物件，並且能夠知道是否特價。
 */

(function main() {
    
    /** 以下為我對課堂練習的回答 */

    function Person({
        name
    }) {
        this.name = name;
        this.buyThings = (orders) => {
            let commandString = `請買`;
            if (Array.isArray(orders)) {
                orders.forEach((order, index)=>{
                    commandString += (index > 0? '，' : '') + (
                        order.discount < 1 ?
                            `如果${order.name}特價的話，就買${order.amountExpression}` :
                            `${order.amountExpression}${order.name}`
                    );
                });
            }
            commandString += `。`;
            console.log(commandString);
        };
    }

    function Thing({
        name, price, discount = 1
    }) {
        this.name = name;
        this.price = price;
        this.discount = discount;
    }

    // 這裡我額外打包了一個物件 (OrderItem) 去處理物件購買的邏輯
    // 原來的想法是想讓這個物件先繼承物品 (Thing) 的屬性
    // 但關於 Extends 的用法似乎在教程較後面才會講到
    // 固在這我用了比較像 FP 的邏輯去寫
    function OrderItem({
        item: { name, price: unitPrice, discount },
        quantity, unit = "個",
        budget // <- 這裡我以「預算」的概念，額外引入了一個條件判斷參數 (budget)
        
    }) {
        this.name = name;
        this.unit = unit;
        this.unitPrice = unitPrice;
        this.discount = discount;
        // 預算 (budget) 在這裡的作用是讓一筆「物品採購」多了一個總價限制的固定值
        // 並以此值為基數來應對物價浮動，當物價因折扣而降低，便會增加採購的數量 (quantity)
        this.quantity = budget !== undefined ?
            Math.floor(budget / (unitPrice * discount)) :
            quantity ? quantity : 1;
        this.totalPrice = this.quantity * this.unitPrice * this.discount;
        // 這裡我加入了 amountExpression 的屬性，
        // 因應民間對「數量」有不一樣的修辭表達方式，
        // 固於此加入邏輯去做應對，例：
        // - 當數量為 12 時會用 1打 去表達
        // - 當數量為 6 時會用 半打 去表達
        this.amountExpression = this.quantity % 6 === 0 ?
            this.quantity % 12 === 0 ?
                `${this.quantity / 12}打` :
                this.quantity > 6 ?
                    `${(this.quantity - 6) / 12}打半` :
                    `半打` :
            `${this.quantity}${this.unit}`;
    }

    const qiangSan = new Person({
        name: "小強"
    });

    const apple = new Thing({
        name: "蘋果",
        price: 68
    });

    const egg = new Thing({
        name: "雞蛋",
        price: 5,
        discount: 0.6 // <- 六折
    });

    qiangSan.buyThings([
        new OrderItem({ item: apple, quantity: 2 }),
        new OrderItem({ item: egg, budget: 36 })
    ]);

    console.log('***********************************');
    console.log('* 假設第二天雞蛋的價格變了，沒有折扣了！');
    console.log('* 雞蛋的購買數量就會變少了。');
    egg.discount = 1; // <- 現在雞蛋沒有折扣了
    qiangSan.buyThings([
        new OrderItem({ item: apple, quantity: 2 }),
        new OrderItem({ item: egg, budget: 36 })
    ]);

    /** 以上為我對課堂練習的回答 */
    
})();