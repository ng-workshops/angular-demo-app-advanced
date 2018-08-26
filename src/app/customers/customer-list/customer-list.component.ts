import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  withLatestFrom,
  takeUntil
} from 'rxjs/operators';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { Store } from '@ngrx/store';
import { CustomerState } from '../store/reducers/customer.reducer';
import {
  LoadCustomers,
  DeleteCustomer,
  SearchCustomer
} from '../store/actions/customer.actions';
import {
  getLoading,
  getCustomers
} from '../store/selectors/customer.selectors';
import { Go } from '../../core/router/router.actions';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers$: Observable<Customer[]>;
  loading$: Observable<boolean>;
  searchTerm = new FormControl();

  private destroy$ = new Subject();
  private search$: Observable<string>;
  private reload$ = new Subject();

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private store: Store<CustomerState>
  ) {}

  ngOnInit() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(search => this.store.dispatch(new SearchCustomer(search)));

    // set up selectors
    this.loading$ = this.store.select(getLoading);
    this.customers$ = this.store.select(getCustomers);

    this.store.dispatch(new LoadCustomers());
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  addNewCustomer() {
    this.store.dispatch(new Go({ path: ['customers', 'new'] }));
  }

  deleteCustomer(id: number) {
    this.store.dispatch(new DeleteCustomer(id));
  }
}
