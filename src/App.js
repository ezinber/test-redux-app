import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { addCashAction, getCashAction } from './store/cashReducer';
import { fetchCustomers } from './utils/customersApi';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);

  const addCash = (cash) => {
    dispatch(addCashAction(cash));
  };

  const getCash = (cash) => {
    dispatch(getCashAction(cash));
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };

    dispatch(addCustomerAction(customer));
  };

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  };

  return (
    <div className="App">
      <div>{cash}</div>
      <div>
        <button
          type="button"
          onClick={() => addCash(Number(prompt()))}
        >
          Пополнить
        </button>
        <button
          type="button"
          onClick={() => getCash(Number(prompt()))}
        >
          Снять
        </button>
        <button
          type="button"
          onClick={() => addCustomer(prompt())}
        >
          Добавить клиента
        </button>
        <button
          type="button"
          onClick={() => dispatch(fetchCustomers())}
        >
          Получить базу клиентов
        </button>
      </div>
      {customers.length > 0 ? (
        <div>
          {customers.map(customer =>
            <div
              key={customer.id}
              onClick={() => removeCustomer(customer)}
            >
              {customer.name}
            </div>
          )}
        </div>
      ) : (
        <div>
          Клиенты отсутствуют
        </div>
      )}
    </div>
  );
}

export default App;
