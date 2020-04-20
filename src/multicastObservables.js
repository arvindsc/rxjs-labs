import { Subject, interval } from "rxjs";
import { tap, multicast, refCount } from "rxjs/operators";
export const multicastClass = (function () {
  const observer = {
    next: (value) => console.log("next:", value), //?
    error: (error) => console.log("error:", error),
    complete: () => console.log("complete"),
  };

  const interval$ = interval(1000).pipe(
    tap((i) => console.log(`Interval  ${i}`))
  );
  const multicastedInterval$ = interval$.pipe(
    multicast(() => new Subject()),
    refCount()
  );

  // You don't need to unsubscribe manually because refCount is internally doing this for you.
  //const multicastedSub$ = multicastedInterval$.connect();

  const subOne = multicastedInterval$.subscribe(observer);
  const subTwo = multicastedInterval$.subscribe(observer);

  setTimeout(() => {
    /* You don't need to unsubscribe manually because refCount is internally doing this for you.
        multicastedSub$.unsubscribe();
        Instead we can unsubscribe individual subscription.
    */
    subOne.unsubscribe();
    subTwo.unsubscribe();
  }, 3000);
})();
