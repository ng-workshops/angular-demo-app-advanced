import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Customer } from '../../customer.model';

export const loadCustomers = createAction('[UI] Load Customers');

export const loadCustomersSuccess = createAction(
  '[API] Load Customers Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFail = createAction(
  '[Customer] Load Customers Fail',
  props<{ err: any }>()
);

export const selectCustomer = createAction(
  '[UI] Select customer',
  props<{ id: number }>()
);

export const addCustomer = createAction(
  '[UI] Add new customer',
  props<{ customer: Customer }>()
);

export const addCustomerSuccess = createAction(
  '[API] Add new customer success',
  props<{ customer: Customer }>()
);

export const addCustomerFail = createAction(
  '[API] Add new customer fail',
  props<{ err: any }>()
);

export const updateCustomer = createAction(
  '[UI] Update customer',
  props<{ customer: Customer }>()
);

export const updateCustomerSuccess = createAction(
  '[API] Update customer success',
  props<{ customer: Update<Customer> }>()
);

export const updateCustomerFail = createAction(
  '[API] Update customer fail',
  props<{ err: any }>()
);

export const deleteCustomer = createAction(
  '[UI] Delete customer',
  props<{ id: number }>()
);

export const deleteCustomerSuccess = createAction(
  '[API] Delete customer success',
  props<{ id: number }>()
);

export const deleteCustomerFail = createAction(
  '[API] Delete customer fail',
  props<{ err: any }>()
);

export const searchCustomer = createAction(
  '[UI] Search for customer',
  props<{ criteria: string }>()
);
