import { BehaviorSubject, Subject } from "rxjs";
import { scan, distinctUntilChanged } from "rxjs/operators";
export class ObservableStore {
  constructor(initialState) {
    this._store = new BehaviorSubject(initialState);
    this._stateUpdate = new Subject();

    //accumulate state
    this._stateUpdate
      .pipe(
        scan((acc, curr) => {
          return { ...acc, ...curr };
        }, initialState)
      )
      .subscribe(this._store);
  }

  updateState(stateUpdate) {
    this._stateUpdate.next(stateUpdate);
  }

  selectState(stateKey) {
    return this._store.pipe(distinctUntilChanged(stateKey), puck(stateKey));
  }

  stateChanges() {
    return this._store.asObservable();
  }
}

/** Usages */

const store = new ObservableStore({
  name: "Arvind",
  isAuthenticated: false,
});

store.selectState("name").subscribe((value) => console.log(value));

store.updateState({ user: "Joe" });
