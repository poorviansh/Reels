let fn = async () => {
    return new Promise((resolve, reject) => {
        console.log("Hello1");
        let p1 = new Promise((r1, r2) => {
            r1(1);
        })
        p1.then((val) => {
            console.log(val);
        })
        resolve(5);
        console.log(p1);
    })
}
fn().then((val) => {
    console.log(val);
})
console.log("hello2");

// let a = true;

// setInterval(() => {
//     if(a) console.log("hello");
// }, 2000);

// setTimeout(() => {
//     a = false;
// }, 10010);