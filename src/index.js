import { Subject, interval } from "rxjs";
import { tap, multicast } from "rxjs/operators";

const observer = {
  next: (value) => console.log("next:", value), //?
  error: (error) => console.log("error:", error),
  complete: () => console.log("complete"),
};

const interval$ = interval(1000).pipe(
  tap((i) => console.log(`Interval  ${i}`))
);
const multicastedInterval$ = interval$.pipe(multicast(() => new Subject()));

multicastedInterval$.connect();

const subOne = multicastedInterval$.subscribe(observer);
const subTwo = multicastedInterval$.subscribe(observer);

setTimeout(() => {
  subOne.unsubscribe();
  subTwo.unsubscribe();
}, 3000);
setTimeout(() => {
  const subThree = multicastedInterval$.subscribe(observer);
}, 4000);
