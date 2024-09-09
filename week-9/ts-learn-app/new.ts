// const x: number = 1;
// console.log(x);

// // code that gives errors
// // let x: number = 1;
// // x = "harkirat";
// // console.log(x);

// function greet(firstName: string): void {
//     // Implementation goes here
//     console.log(`Hello ${firstName}`)
// }

// greet("Mihir")

// function sum(a: number, b: number): number {
//     // Implementation goes here
//     return a+b;
// }

// console.log(sum(5,6));

// function isLegal(age: number): boolean {
//     // Implementation goes here
//     if(age>=18)
//     {
//     	return true
//     }
//     else
//     {
//     	return false
//     }
// }

// console.log(isLegal(21))

// function delayed(fn:()=>void):void{
// 	setTimeout(fn,1000);
// }

// function torun():void{
// 	console.log("hi")
// }

// delayed(torun)
// Define an interface to specify the structure of a todo object

let name: string | null = null;

// we use the non-null assertion operator to tell the compiler that name will never be null
let nameLength = name!.length;