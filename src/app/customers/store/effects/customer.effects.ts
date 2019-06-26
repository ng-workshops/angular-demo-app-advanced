import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { navigate } from '../../../core/router/router.actions';
import { ModalService } from '../../../shared/modal/modal.service';
import { CustomerService } from '../../customer.service';
import * as CustomerActions from '../actions/customer.actions';

@Injectable({
  providedIn: 'root'
})
export class CustomerEffects {
  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers, CustomerActions.searchCustomer),
      switchMap((action: any) => {
        return this.customerService.getAll(action.criteria).pipe(
          map(customers => CustomerActions.loadCustomersSuccess({ customers })),
          catchError(err => of(CustomerActions.loadCustomersFail(err)))
        );
      })
    )
  );

  addCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomer),
      concatMap(({ customer }) => {
        return this.customerService.create(customer).pipe(
          map(result =>
            CustomerActions.addCustomerSuccess({ customer: result })
          ),
          catchError(err => of(CustomerActions.addCustomerFail(err)))
        );
      })
    )
  );

  updateCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomer),
      concatMap(({ customer }) => {
        return this.customerService.update(customer).pipe(
          map(result =>
            CustomerActions.updateCustomerSuccess({
              customer: { id: customer.id, changes: result }
            })
          ),
          catchError(err => of(CustomerActions.updateCustomerFail(err)))
        );
      })
    )
  );

  deleteCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      concatMap(({ id }) => {
        return this.customerService.delete(id).pipe(
          map(() => CustomerActions.deleteCustomerSuccess({ id })),
          catchError(err => of(CustomerActions.deleteCustomerFail(err)))
        );
      })
    )
  );

  saveCustomersSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CustomerActions.addCustomerSuccess,
        CustomerActions.updateCustomerSuccess
      ),
      tap(({ customer }: any) => {
        this.snackBar.open(
          `Customer ${customer.name ||
            customer.changes.name} saved successfully.`,
          '',
          {
            duration: 2000
          }
        );
      }),
      map(() => navigate({ path: ['customers'] }))
    )
  );

  errors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CustomerActions.loadCustomersFail,
          CustomerActions.addCustomerFail,
          CustomerActions.updateCustomerFail,
          CustomerActions.deleteCustomerFail
        ),
        switchMap(({ err }) => {
          console.log('error', err);
          return this.modalService.openGlobal({
            title: 'App error',
            message: (err && err.message) || 'The error message',
            type: 'warn'
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}
}
